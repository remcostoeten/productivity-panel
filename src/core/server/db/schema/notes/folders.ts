import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "../relation-remodel/users/users";

export const folders = sqliteTable("folders", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  parentId: text("parent_id").references(() => folders.id),
  createdAt: integer("created_at").notNull().default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at").notNull().default(sql`(strftime('%s', 'now'))`),
});
