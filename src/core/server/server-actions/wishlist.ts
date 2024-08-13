"use server";

import { eq } from "drizzle-orm";
import { db } from "@/core/server/db";
import { v4 as uuidv4 } from "uuid";
import { wishlists, wishlistItems } from "../db/schema";

export async function createWishlist(
  userId: string, 
  name: string, 
  budget: number
) {
  const id = uuidv4();
  await db
    .insert(wishlists)
    .values({ id, name, budget, userId });
}

export async function getWishlistsByUser(userId: string) {
  return await db
    .select()
    .from(wishlists)
    .where(eq(wishlists.userId, userId));
}

export async function createWishlistItem(
  wishlistId: string,
  name: string,
  price: number
) {
  const id = uuidv4();
  await db
    .insert(wishlistItems)
    .values({ id, name, price, wishlistId });
}

export async function getWishlistItemsByWishlist(wishlistId: string) {
  return await db  
    .select()
    .from(wishlistItems)
    .where(eq(wishlistItems.wishlistId, wishlistId));
}
