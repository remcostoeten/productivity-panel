"use server";

import { Note } from "@/app/(dashboard)/dashboard/notes/notes.types";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { notes } from "../../db/schema/notes";

export async function getNotes(userId: string) {
  return (await db
    .select()
    .from(notes)
    .where(eq(notes.userId, userId))) as Note[];
}
