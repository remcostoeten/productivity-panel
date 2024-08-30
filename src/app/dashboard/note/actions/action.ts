"use server";

import { db } from "@/core/server/db";
import { notes, tags, noteTags } from "@/core/server/db/schema/notes";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createNote(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const folderId = formData.get("folderId") as string;
  const tagString = formData.get("tags") as string;
  const tagNames = tagString
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  try {
    const [newNote] = await db
      .insert(notes)
      .values({
        title,
        content,
        folderId,
      })
      .returning();

    if (tagNames.length > 0) {
      for (const tagName of tagNames) {
        let [tag] = await db.select().from(tags).where(eq(tags.name, tagName));
        if (!tag) {
          [tag] = await db.insert(tags).values({ name: tagName }).returning();
        }
        await db.insert(noteTags).values({
          noteId: newNote.id,
          tagId: tag.id,
        });
      }
    }

    revalidatePath("/folders");
    redirect(`/notes/${newNote.id}`);
  } catch (error) {
    console.error("Error creating note:", error);
    // Handle error (e.g., by returning an error message to display)
  }
}

export async function getNote(id: string) {
  try {
    const note = await db.query.notes.findFirst({
      where: eq(notes.id, id),
      with: {
        folder: true,
        tags: {
          with: {
            tag: true,
          },
        },
      },
    });

    if (!note) return null;

    return {
      ...note,
      tags: note.tags.map((nt) => nt.tag),
    };
  } catch (error) {
    console.error("Error fetching note:", error);
    return null;
  }
}
