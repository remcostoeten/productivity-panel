import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import users from "./users";

export { default as siteVisits } from "./site-visits";
export { default as users } from "./users";

export const wishlists = sqliteTable("wishlists", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  budget: integer("budget").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export const wishlistItems = sqliteTable("wishlist_items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  description: text("description"),
  url: text("url"),
  category: text("category"),
  wishlistId: text("wishlist_id")
    .notNull()
    .references(() => wishlists.id),
});
