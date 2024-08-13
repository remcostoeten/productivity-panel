import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import users from "./users";

export const wishlists = sqliteTable("wishlists", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  budget: integer("budget"),
  userId: text("user_id")
    .references(() => users.id),
});

export const wishlistItems = sqliteTable("wishlist_items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  wishlistId: text("wishlist_id")
    .references(() => wishlists.id),
});
