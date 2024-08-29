"use server";

import { eq } from "drizzle-orm";
import { db } from "../../db";
import { notes } from "../../db/schema/notes";

export async function getNotes(userId: string, folderId?: string) {
  let query = db.select().from(notes).where(eq(notes.userId, userId));
  if (folderId) {
    query = query.where(eq(notes.folderId, folderId));
  }
  return await query;
}
