import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { notes } from "./notes";
import { tags } from "./tags";

export const noteTags = sqliteTable("note_tags", {
  noteId: text("note_id").notNull().references(() => notes.id),
  tagId: text("tag_id").notNull().references(() => tags.id),
}, (t) => ({
  pk: sql`PRIMARY KEY(${t.noteId}, ${t.tagId})`,
}));
