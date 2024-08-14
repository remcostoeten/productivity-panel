"use server";

import { db } from "@/core/server/db";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { v4 as uuidv4 } from "uuid";
import { users, wishlistItems, wishlists } from "../db/schema";

export async function deleteWishlistItem(itemId: string) {
  await db.delete(wishlistItems).where(eq(wishlistItems.id, itemId));
}

export async function deleteEntireWishlist(wishlistId: string) {
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
  description?: string,
  url?: string,
  category?: string,
) {
  try {
    const newItem = {
      id: nanoid(),
      name,
      price,
      description,
      url,
      category,
      wishlistId,
    };

    console.log("Attempting to insert new item:", newItem);
    console.log("Current schema:", db._.schema); // This will log your current schema
    await db.insert(wishlistItems).values(newItem);
    console.log("Item inserted successfully");
    return newItem;
  } catch (error) {
    console.error("Error in createWishlistItem:", error);
    throw error;
  }
}

export async function getWishlistItemsByWishlist(wishlistId: string) {
  return await db
    .select()
    .from(wishlistItems)
    .where(eq(wishlistItems.wishlistId, wishlistId));
}

export async function updateWishlist(
  wishlistId: string,
  updates: Partial<typeof wishlists.$inferInsert>,
) {
  await db.update(wishlists).set(updates).where(eq(wishlists.id, wishlistId));
}

export async function updateWishlistName(wishlistId: string, newName: string) {
  await updateWishlist(wishlistId, { name: newName });
}
