"use server";
import { Note } from "@/app/(dashboard)/dashboard/notes/notes.types";
import { generateId } from "@/core/helpers/generate-id";
import { db } from "@/core/server/db";
import { notes } from "@/core/server/db/schema/notes/notes";
import { revalidatePath } from "next/cache";

export async function createNote(
  userId: string,
  title: string,
  content: string,
  folderId: string | null,
) {
  if (!folderId) {
    throw new Error("A folder must be selected to create a note.");
  }

  const newNote = await db
    .insert(notes)
    .values({
      id: generateId("note"),
      userId,
      title,
      content,
      folderId,
    })
    .returning();

  revalidatePath("/dashboard/notes");
  return newNote[0] as Note;
}
