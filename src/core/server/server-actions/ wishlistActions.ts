"use client";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/core/server/db";
import { wishlists, wishlistItems, users } from "@/core/server/db/schema";
import { eq, and } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

// Helper function to check if the user is authorized
const checkAuth = () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  return userId;
};

// Wishlist Actions
export async function getWishlistsByUserId() {
  const userId = checkAuth();
  try {
    return await db
      .select()
      .from(wishlists)
      .where(eq(wishlists.userId, userId));
  } catch (error) {
    console.error("Error fetching wishlists:", error);
    throw new Error("Failed to fetch wishlists");
  }
}

export async function createWishlist(
  title: string,
  description: string,
  budget: number,
) {
  const userId = checkAuth();
  try {
    const newWishlist = await db
      .insert(wishlists)
      .values({
        id: uuidv4(),
        userId,
        title,
        description,
        budget,
      })
      .returning();
    return newWishlist[0];
  } catch (error) {
    console.error("Error creating wishlist:", error);
    throw new Error("Failed to create wishlist");
  }
}

export async function updateWishlist(
  wishlistId: string,
  updates: Partial<typeof wishlists.$inferSelect>,
) {
  const userId = checkAuth();
  try {
    const updatedWishlist = await db
      .update(wishlists)
      .set(updates)
      .where(and(eq(wishlists.id, wishlistId), eq(wishlists.userId, userId)))
      .returning();
    if (updatedWishlist.length === 0)
      throw new Error("Wishlist not found or unauthorized");
    return updatedWishlist[0];
  } catch (error) {
    console.error("Error updating wishlist:", error);
    throw new Error("Failed to update wishlist");
  }
}

export async function deleteWishlist(wishlistId: string) {
  const userId = checkAuth();
  try {
    await db
      .delete(wishlists)
      .where(and(eq(wishlists.id, wishlistId), eq(wishlists.userId, userId)));
  } catch (error) {
    console.error("Error deleting wishlist:", error);
    throw new Error("Failed to delete wishlist");
  }
}

// Wishlist Item Actions
export async function getItemsByWishlistId(wishlistId: string) {
  const userId = checkAuth();
  try {
    const wishlist = await db
      .select()
      .from(wishlists)
      .where(and(eq(wishlists.id, wishlistId), eq(wishlists.userId, userId)));
    if (wishlist.length === 0)
      throw new Error("Wishlist not found or unauthorized");

    return await db
      .select()
      .from(wishlistItems)
      .where(eq(wishlistItems.wishlistId, wishlistId));
  } catch (error) {
    console.error("Error fetching wishlist items:", error);
    throw new Error("Failed to fetch wishlist items");
  }
}

export async function addItemToWishlist(
  wishlistId: string,
  name: string,
  price: number,
  description: string,
  link: string,
  category: string,
  tags: string,
) {
  const userId = checkAuth();
  try {
    const wishlist = await db
      .select()
      .from(wishlists)
      .where(and(eq(wishlists.id, wishlistId), eq(wishlists.userId, userId)));
    if (wishlist.length === 0)
      throw new Error("Wishlist not found or unauthorized");

    const newItem = await db
      .insert(wishlistItems)
      .values({
        id: uuidv4(),
        wishlistId,
        name,
        price,
        description,
        link,
        category,
        tags,
      })
      .returning();
    return newItem[0];
  } catch (error) {
    console.error("Error adding item to wishlist:", error);
    throw new Error("Failed to add item to wishlist");
  }
}

export async function updateWishlistItem(
  itemId: string,
  updates: Partial<typeof wishlistItems.$inferSelect>,
) {
  const userId = checkAuth();
  try {
    const item = await db
      .select()
      .from(wishlistItems)
      .innerJoin(wishlists, eq(wishlistItems.wishlistId, wishlists.id))
      .where(and(eq(wishlistItems.id, itemId), eq(wishlists.userId, userId)));
    if (item.length === 0) throw new Error("Item not found or unauthorized");

    const updatedItem = await db
      .update(wishlistItems)
      .set(updates)
      .where(eq(wishlistItems.id, itemId))
      .returning();
    return updatedItem[0];
  } catch (error) {
    console.error("Error updating wishlist item:", error);
    throw new Error("Failed to update wishlist item");
  }
}

export async function deleteWishlistItem(itemId: string) {
  const userId = checkAuth();
  try {
    const item = await db
      .select()
      .from(wishlistItems)
      .innerJoin(wishlists, eq(wishlistItems.wishlistId, wishlists.id))
      .where(and(eq(wishlistItems.id, itemId), eq(wishlists.userId, userId)));
    if (item.length === 0) throw new Error("Item not found or unauthorized");

    await db.delete(wishlistItems).where(eq(wishlistItems.id, itemId));
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
    throw new Error("Failed to delete wishlist item");
  }
}

// User Profile Action
export async function getUserProfile() {
  const userId = checkAuth();
  try {
    const userProfile = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));
    if (userProfile.length === 0) throw new Error("User not found");
    return userProfile[0];
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch user profile");
  }
}
