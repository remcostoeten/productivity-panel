"use server";
import { Note } from "@/app/(dashboard)/dashboard/notes/notes.types";
import { db } from "@/core/server/db";
import { notes } from "@/core/server/db/schema/notes/notes";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateNote(noteId: string, data: Partial<Note>) {
  const updatedNote = await db
    .update(notes)
    .set({ ...data, updatedAt: new Date().toISOString() })
    .where(eq(notes.id, noteId))
    .returning();

  revalidatePath("/dashboard/notes");
  return updatedNote[0];
}
