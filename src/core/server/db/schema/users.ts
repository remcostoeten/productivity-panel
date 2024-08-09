import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  isAdmin: integer("is_admin", { mode: "boolean" }).notNull().default(0),
  lastSignIn: integer("last_sign_in", { mode: "timestamp" }),
  profileImageUrl: text("profile_image_url"),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .notNull()
    .default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export default users;
