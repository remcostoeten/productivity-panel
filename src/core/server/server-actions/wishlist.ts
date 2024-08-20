"use server";

import { db } from "@/core/server/db";
import { and, eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { wishlistFolders, wishlistToFolder, wishlists } from "../db/schema";

export async function createWishlistFolder(userId: string, name: string) {
  const id = uuidv4();
  await db.insert(wishlistFolders).values({ id, name, userId });
  return { id, name };
}

export async function updateWishlistFolder(id: string, name: string) {
  await db
    .update(wishlistFolders)
    .set({ name, updatedAt: Math.floor(Date.now() / 1000) })
    .where(eq(wishlistFolders.id, id));
}

export async function deleteWishlistFolder(id: string) {
  await db.delete(wishlistToFolder).where(eq(wishlistToFolder.folderId, id));
  await db.delete(wishlistFolders).where(eq(wishlistFolders.id, id));
}

export async function addWishlistToFolder(
  wishlistId: string,
  folderId: string,
) {
  const id = uuidv4();
  await db.insert(wishlistToFolder).values({ id, wishlistId, folderId });
}

export async function removeWishlistFromFolder(
  wishlistId: string,
  folderId: string,
) {
  await db
    .delete(wishlistToFolder)
    .where(
      and(
        eq(wishlistToFolder.wishlistId, wishlistId),
        eq(wishlistToFolder.folderId, folderId),
      ),
    );
}

export async function getWishlistFolders(userId: string) {
  return db
    .select()
    .from(wishlistFolders)
    .where(eq(wishlistFolders.userId, userId));
}

export async function getWishlistsInFolder(folderId: string) {
  return db
    .select({
      wishlist: wishlists,
      folderAssociation: wishlistToFolder,
    })
    .from(wishlists)
    .innerJoin(wishlistToFolder, eq(wishlists.id, wishlistToFolder.wishlistId))
    .where(eq(wishlistToFolder.folderId, folderId));
}
