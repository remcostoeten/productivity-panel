import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { notes } from "./notes";
import { users } from "../relation-remodel/users/users";

export const sharedNotes = sqliteTable("shared_notes", {
  id: text("id").primaryKey(),
  noteId: text("note_id").notNull().references(() => notes.id),
  sharedWithUserId: text("shared_with_user_id").notNull().references(() => users.id),
  permissions: text("permissions").notNull(),
  createdAt: integer("created_at").notNull().default(sql`(strftime('%s', 'now'))`),
});
