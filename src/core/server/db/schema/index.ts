import { int } from "drizzle-orm/mysql-core";
import { integer } from "drizzle-orm/pg-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { Settings } from "lucide-react";
import { text } from "stream/consumers";
import { boolean } from "zod";

export * from "./notes";
export * from "./notifications";
export * from "./users ";
export * from "./wishlist";

export const users = sqliteTable("user_settings", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().unique(), // de relatie met de users tabel
  allowNotifications: integer("allow_notifications", { mode: "boolean" })
    .notNull()
    .default(false),
  // key: text("key").notNull().unique(),
  // value: text("value"),
  updatedAt: integer("updated_at"),
  createdAt: integer("created_at"),
});

onsubmit;
allowNotification.insert > user_serttings.key - Settings;
id | userid | allow_notifications | allow_searching | allow_x | allow_y;
1, 123, true, false - Settings;
id | userid | name | attribute | value;
1, 123, allow_searching, boolean, false;
1, 123, allow_notifications, boolean, true;
1, 123, maximum_age, int, 10;

//  onderzoek naar database design: key value (store) -  voor drizzle ORM.
