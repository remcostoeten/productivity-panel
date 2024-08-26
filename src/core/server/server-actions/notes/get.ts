"use server";

import { notes } from "@db/schema/notes";
import { eq } from "drizzle-orm";
import { db } from "../../db";

export async function getNotes(userId: string, folderId?: string) {
  let query = db.select().from(notes).where(eq(notes.userId, userId));
  if (folderId) {
    query = query.where(eq(notes.folderId, folderId));
  }
  return await query;
}
