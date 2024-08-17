import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  first_name: text("first_name"),
  last_name: text("last_name"),
  is_admin: integer("is_admin", { mode: "boolean" }).notNull().default(false),
  last_sign_in: integer("last_sign_in"),
  sign_in_count: integer("sign_in_count").notNull().default(0),
  profile_image_url: text("profile_image_url"),
  email_verified: integer("email_verified", { mode: "boolean" })
    .notNull()
    .default(false),
  created_at: integer("created_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updated_at: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
