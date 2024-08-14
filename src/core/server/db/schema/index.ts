import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import users from "./users";

export { default as siteVisits } from "./site-visits";
export { default as users } from "./users";

export const wishlists = sqliteTable("wishlists", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  budget: integer("budget"),
  userId: text("user_id").references(() => users.id),
});

export const wishlistItems = sqliteTable("wishlist_items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  description: text("description"),
  wishlistId: text("wishlist_id").references(() => wishlists.id),
});
