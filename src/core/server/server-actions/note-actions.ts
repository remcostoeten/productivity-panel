"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { notes } from "../db/schema/notes";

export async function createNote(
  title: string,
  content: string,
  folderId: string,
) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const newNote = await db
    .insert(notes)
    .values({
      id: crypto.randomUUID(),
      title,
      content,
      userId,
      folderId,
    })
    .returning();

  return newNote[0];
}

export async function updateNote(
  id: string,
  title: string,
  content: string,
  isPublic: boolean,
) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const updatedNote = await db
    .update(notes)
    .set({ title, content, isPublic, updatedAt: Math.floor(Date.now() / 1000) })
    .where(eq(notes.id, id))
    .returning();

  return updatedNote[0];
}

export async function deleteNote(id: string) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  await db.delete(notes).where(eq(notes.id, id));
}

export async function getNotes(folderId?: string) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  let query = db.select().from(notes).where(eq(notes.userId, userId));
  if (folderId) {
    query = query.where(eq(notes.folderId, folderId));
  }

  return query;
}
