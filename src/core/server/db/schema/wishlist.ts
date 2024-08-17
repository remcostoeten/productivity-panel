import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const wishlists = sqliteTable("wishlists", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  budget: integer("budget").notNull(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  created_at: integer("created_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updated_at: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export const wishlist_items = sqliteTable("wishlist_items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  description: text("description"),
  url: text("url"),
  category: text("category"),
  wishlist_id: text("wishlist_id")
    .notNull()
    .references(() => wishlists.id),
  created_at: integer("created_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updated_at: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export type Wishlist = typeof wishlists.$inferSelect;
