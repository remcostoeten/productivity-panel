import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const userPreferences = sqliteTable("user_preferences", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().unique().references(() => users.id),
  darkMode: integer("dark_mode", { mode: "boolean" }).notNull().default(false),
  emailNotifications: integer("email_notifications", { mode: "boolean" })
    .notNull()
    .default(true),
  twoFactorAuth: integer("two_factor_auth", { mode: "boolean" })
    .notNull()
    .default(false),
  defaultRepoPrivate: integer("default_repo_private", { mode: "boolean" })
    .notNull()
    .default(false),
  updatedAt: integer("updated_at"),
  createdAt: integer("created_at"),
});
