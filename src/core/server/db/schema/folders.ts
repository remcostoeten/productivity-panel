import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const folders = sqliteTable("folders", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
  parentId: text("parent_id").references(() => folders.id),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export type Folder = typeof folders.$inferSelect;
export type NewFolder = typeof folders.$inferInsert;
