"use server";
import { generateId } from "@/core/helpers/generate-id";
import { db } from "@/core/server/db";
import { notes } from "@/core/server/db/schema/notes/notes";
import { revalidatePath } from "next/cache";

export async function createNote(
  userId: string,
  title: string,
  content: string,
) {
  try {
    const newNote = await db
      .insert(notes)
      .values({
        id: generateId("note"),
        userId,
        title,
        content,
      })
      .returning();

    revalidatePath("/dashboard/notes");
    return newNote[0];
  } catch (error) {
    console.error("Error creating note:", error);
    console.error("Attempted to create note with:", { userId, title, content });
    throw error;
  }
}
