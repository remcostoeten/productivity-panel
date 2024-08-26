'use server'
import { db } from '@/core/server/db';
import { notes } from '@/core/server/db/schema/notes/notes';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function deleteNote(noteId: string) {
  await db.delete(notes).where(eq(notes.id, noteId));
  revalidatePath('/dashboard/notes');
}
