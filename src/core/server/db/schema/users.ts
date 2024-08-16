import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  isAdmin: integer("is_admin", { mode: "boolean" }).notNull().default(false),
  lastSignIn: integer("last_sign_in"),
  signInCount: integer("sign_in_count").notNull().default(0),
  profileImageUrl: text("profile_image_url"),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at").notNull().default(sql`CAST((julianday('now') - 2440587.5)*86400000 AS INTEGER)`),
  updatedAt: integer("updated_at").notNull().default(sql`CAST((julianday('now') - 2440587.5)*86400000 AS INTEGER)`),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;