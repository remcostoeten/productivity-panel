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
    const userResults = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));
    if (userResults.length === 0) {
      throw new Error("User not found");
    }

    const id = uuidv4();
    await db.insert(wishlists).values({ id, name, budget, userId });

    return { success: true, id };
  } catch (error) {
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

  return result.reduce((acc, curr) => {
    const wishlist = acc.find((w) => w.id === curr.wishlistId);
    if (wishlist) {
      if (curr.itemId) {
        wishlist.items.push({
          id: curr.itemId,
          name: curr.itemName,
          price: curr.itemPrice,
          description: curr.itemDescription,
        });
      }
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
}

export async function createWishlistItem(
  wishlistId: string,
  name: string,
  price: number,
  description: string,
  category: string,
) {
  const newItem = {
    id: nanoid(),
    name,
    price,
    description,
    category,
    wishlistId,
  };

  await db.insert(wishlistItems).values(newItem);
  return newItem;
}

export async function getWishlistItemsByWishlist(wishlistId: string) {
  return await db
    .select()
    .from(wishlistItems)
    .where(eq(wishlistItems.wishlistId, wishlistId));
}

export async function updateWishlist(
  wishlistId: string,
  updates: Partial<typeof wishlists.$inferInsert> & { updatedAt?: number },
) {
  await db.update(wishlists).set(updates).where(eq(wishlists.id, wishlistId));
}

export async function updateWishlistItem(
  itemId: string,
  updateData: Partial<{
    name: string;
    price: number;
    description: string;
    url: string;
    category: string;
  }>,
) {
  try {
    await db
      .update(wishlistItems)
      .set({ ...updateData, updatedAt: Math.floor(Date.now() / 1000) })
      .where(eq(wishlistItems.id, itemId));

    return { success: true };
  } catch (error) {
    console.error("Error updating wishlist item:", error);
    return { success: false, error: "Failed to update wishlist item" };
  }
}

export async function updateWishlistName(wishlistId: string, newName: string) {
  await updateWishlist(wishlistId, { name: newName });
}
