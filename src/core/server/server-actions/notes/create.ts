"use server";

import { db } from "@/core/server/db";
import { notes } from "@/core/server/db/schema/notes/notes";
import { revalidatePath } from "next/cache";

export async function createNote(
  userId: string,
  title: string,
  content: string,
  folderId?: string,
) {
  const newNote = await db
    .insert(notes)
    .values({
      userId,
      title,
      content,
      folderId: folderId || null,
    })
    .returning();

  revalidatePath("/dashboard/notes");
  return newNote[0];
}
