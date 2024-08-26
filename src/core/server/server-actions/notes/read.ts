"use server";

import { db } from "@/core/server/db";
import { notes } from "@/core/server/db/schema/notes/notes";
import { eq } from "drizzle-orm";

export async function fetchNotes(userId: string, folderId?: string) {
  let query = db.select().from(notes).where(eq(notes.userId, userId));
  if (folderId) {
    query = query.where(eq(notes.folderId, folderId));
  }
  return await query;
}
