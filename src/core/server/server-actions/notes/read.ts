"use server";
import { db } from "@/core/server/db";
import { notes } from "@/core/server/db/schema/notes/notes";
import { eq } from "drizzle-orm";

export async function getNotes(userId: string) {
  return await db.select().from(notes).where(eq(notes.userId, userId));
}

export async function getNote(noteId: string) {
  const result = await db.select().from(notes).where(eq(notes.id, noteId));
  return result[0];
}
