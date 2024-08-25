"use server";

import { db } from "@/core/server/db";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { folders } from "../db/schema";

export async function createFolder(name: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  return db
    .insert(folders)
    .values({
      name,
      userId: session.user.id,
    })
    .returning();
}

export async function updateFolder(id: number, name: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  return db.update(folders).set({ name }).where(eq(folders.id, id)).returning();
}

export async function deleteFolder(id: number) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  return db.delete(folders).where(eq(folders.id, id));
}

export async function getFolders() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  return db.select().from(folders).where(eq(folders.userId, session.user.id));
}
