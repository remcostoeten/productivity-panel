
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  bio: text("bio"),
  dateOfBirth: integer("date_of_birth"),
  isAdmin: integer("is_admin", { mode: "boolean" }).notNull().default(false),
  lastSignIn: integer("last_sign_in"),
  signInCount: integer("sign_in_count").notNull().default(0),
  profileImageUrl: text("profile_image_url"),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});
