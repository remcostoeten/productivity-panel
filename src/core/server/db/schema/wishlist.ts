import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const wishlists = sqliteTable("wishlists", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  budget: integer("budget").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: integer("created_at").notNull().default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at").notNull().default(sql`(strftime('%s', 'now'))`),
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
  createdAt: integer("created_at").notNull().default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at").notNull().default(sql`(strftime('%s', 'now'))`),
});

export type Wishlist = typeof wishlists.$inferSelect;
export type NewWishlist = typeof wishlists.$inferInsert;

export type WishlistItem = typeof wishlistItems.$inferSelect;
export type NewWishlistItem = typeof wishlistItems.$inferInsert;