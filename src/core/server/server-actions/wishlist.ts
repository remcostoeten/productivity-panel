"use server";

import { eq } from "drizzle-orm";
import { db } from "@/core/server/db";
import { v4 as uuidv4 } from "uuid";
import { wishlists, wishlistItems, users } from "../db/schema";

export async function deleteWishlistItem(itemId: string) {
  await db.delete(wishlistItems).where(eq(wishlistItems.id, itemId));
}

export async function deleteWishlist(wishlistId: string) {
  await db
    .delete(wishlistItems)
    .where(eq(wishlistItems.wishlistId, wishlistId));

  await db.delete(wishlists).where(eq(wishlists.id, wishlistId));
}

export async function createWishlist(
  userId: string,
  name: string,
  budget: number,
) {
  try {
    // First, check if the user exists
    const userResults = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));
    if (userResults.length === 0) {
      throw new Error("User not found");
    }

    // If the user exists, proceed with creating the wishlist
    const id = uuidv4();
    await db.insert(wishlists).values({ id, name, budget, userId });

    return { success: true, id };
  } catch (error) {
    console.error("Error creating wishlist:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create wishlist: ${error.message}`);
    } else {
      throw new Error("Failed to create wishlist: Unknown error");
    }
  }
}

export async function getWishlistsByUser(userId: string) {
  const result = await db
    .select({
      wishlistId: wishlists.id,
      wishlistName: wishlists.name,
      wishlistBudget: wishlists.budget,
      itemId: wishlistItems.id,
      itemName: wishlistItems.name,
      itemPrice: wishlistItems.price,
      itemDescription: wishlistItems.description,
    })
    .from(wishlists)
    .leftJoin(wishlistItems, eq(wishlists.id, wishlistItems.wishlistId))
    .where(eq(wishlists.userId, userId));

  const groupedResult = result.reduce((acc, curr) => {
    const wishlist = acc.find((w) => w.id === curr.wishlistId);
    if (wishlist) {
      wishlist.items.push({
        id: curr.itemId,
        name: curr.itemName,
        price: curr.itemPrice,
        description: curr.itemDescription,
      });
    } else {
      acc.push({
        id: curr.wishlistId,
        name: curr.wishlistName,
        budget: curr.wishlistBudget,
        items: curr.itemId
          ? [
              {
                id: curr.itemId,
                name: curr.itemName,
                price: curr.itemPrice,
                description: curr.itemDescription,
              },
            ]
          : [],
      });
    }
    return acc;
  }, []);

  return groupedResult;
}

export async function createWishlistItem(
  wishlistId: string,
  name: string,
  price: number,
  description: string,
) {
  const id = uuidv4();
  await db
    .insert(wishlistItems)
    .values({ id, name, price, description, wishlistId });
}

export async function getWishlistItemsByWishlist(wishlistId: string) {
  return await db
    .select()
    .from(wishlistItems)
    .where(eq(wishlistItems.wishlistId, wishlistId));
}
