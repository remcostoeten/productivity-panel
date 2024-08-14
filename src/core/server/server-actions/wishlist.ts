"use server";

import { eq } from "drizzle-orm";
import { db } from "@/core/server/db";
import { v4 as uuidv4 } from "uuid";
import { wishlists, wishlistItems } from "../db/schema";

export async function deleteWishlistItem(itemId: string) {
  await db.delete(wishlistItems).where(eq(wishlistItems.id, itemId));
}
export async function deleteWishlist(wishlistId: string) {
  await db
    .delete(wishlistItems)
    .where(eq(wishlistItems.wishlistId, wishlistId));

  await db
    .delete(wishlists)
    .where(eq(wishlists.id, wishlistId));
}
export async function createWishlist(userId: string, name: string, budget: number) {
  const id = uuidv4();
  await db.insert(wishlists).values({ id, name, budget, userId });
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
      });
    } else {
      acc.push({
        id: curr.wishlistId,
        name: curr.wishlistName,
        budget: curr.wishlistBudget,
        items: curr.itemId ? [{ id: curr.itemId, name: curr.itemName, price: curr.itemPrice }] : [],
      });
    }
    return acc;
  }, []);

  return groupedResult;
}

export async function createWishlistItem(wishlistId: string, name: string, price: number) {
  const id = uuidv4();
  await db.insert(wishlistItems).values({ id, name, price, wishlistId });
}

export async function getWishlistItemsByWishlist(wishlistId: string) {
  return await db.select().from(wishlistItems).where(eq(wishlistItems.wishlistId, wishlistId));
}
