import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const userSettings = sqliteTable("user_settings", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().unique().references(() => users.id),
  showPreloader: integer("show_preloader", { mode: "boolean" })
    .notNull()
    .default(true),
  allowNotifications: integer("allow_notifications", { mode: "boolean" })
    .notNull()
    .default(true),
  updatedAt: integer("updated_at"),
  createdAt: integer("created_at"),
});
