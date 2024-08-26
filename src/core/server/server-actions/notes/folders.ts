"use server";

import { generateId } from "@/core/helpers/generate-id";
import { db } from "@/core/server/db";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { folders, notes } from "../../db/schema/notes";

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

  //   revalidatePath("/dashboard/notes");
  return newFolder[0];
}

export async function deleteFolder(folderId: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.transaction(async (tx) => {
    // Move all notes in this folder to have no folder (or to a default folder if you prefer)
    await tx
      .update(notes)
      .set({ folderId: null })
      .where(eq(notes.folderId, folderId));

    // Recursively delete all sub-folders
    await deleteSubFolders(tx, folderId);

    // Delete the folder itself
    await tx.delete(folders).where(eq(folders.id, folderId));
  });

  //   revalidatePath("/dashboard/notes");
}

export async function updateFolder(folderId: string, name: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.update(folders).set({ name }).where(eq(folders.id, folderId));
  //   revalidatePath("/dashboard/notes");
}

async function deleteSubFolders(tx: any, parentId: string) {
  const subFolders = await tx
    .select({ id: folders.id })
    .from(folders)
    .where(eq(folders.parentId, parentId));

  for (const subFolder of subFolders) {
    // Move notes in sub-folder to have no folder
    await tx
      .update(notes)
      .set({ folderId: null })
      .where(eq(notes.folderId, subFolder.id));

    // Recursively delete sub-sub-folders
    await deleteSubFolders(tx, subFolder.id);

    // Delete the sub-folder
    await tx.delete(folders).where(eq(folders.id, subFolder.id));
  }
}
