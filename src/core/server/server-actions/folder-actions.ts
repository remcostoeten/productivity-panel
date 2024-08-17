"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { folders } from "../db/schema";

export async function createFolder(name: string, parentId?: string) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const newFolder = await db
    .insert(folders)
    .values({
      id: crypto.randomUUID(),
      name,
      userId,
      parentId: parentId || null,
    })
    .returning();

  return newFolder[0];
}

export async function updateFolder(id: string, name: string) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const updatedFolder = await db
    .update(folders)
    .set({ name, updatedAt: Math.floor(Date.now() / 1000) })
    .where(eq(folders.id, id))
    .returning();

  return updatedFolder[0];
}

export async function deleteFolder(id: string) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  await db.delete(folders).where(eq(folders.id, id));
}

export async function getFolders() {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  return db.select().from(folders).where(eq(folders.userId, userId));
}
