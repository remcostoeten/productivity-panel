import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const globalMessages = sqliteTable("global_messages", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  expiresAt: integer("expires_at"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
});
