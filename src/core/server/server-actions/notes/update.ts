"use server";
import { db } from "@/core/server/db";
import { notes } from "@/core/server/db/schema/notes/notes";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateNote(
  noteId: string,
  title: string,
  content: string,
) {
  const updatedNote = await db
    .update(notes)
    .set({ title, content })
    .where(eq(notes.id, noteId))
    .returning();

  revalidatePath("/dashboard/notes");
  return updatedNote[0];
}
