"use server";

import { generateId } from "@/core/helpers/generate-id";
import { db } from "@/core/server/db";
import { folders } from "@/core/server/db/schema/notes/folders";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getFolders() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return await db.select().from(folders).where(eq(folders.userId, userId));
}

export async function createFolder(
  name: string,
  parentId: string | null = null,
) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const newFolder = await db
    .insert(folders)
    .values({
      id: generateId("folder"),
      userId,
      name,
      parentId,
    })
    .returning();

  revalidatePath("/dashboard/notes");
  return newFolder[0];
}

export async function deleteFolder(folderId: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.delete(folders).where(eq(folders.id, folderId));
  revalidatePath("/dashboard/notes");
}
