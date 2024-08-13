import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";
import users from "./users";

export const wishlists = sqliteTable("wishlists", {
  id: text("id").primaryKey().default(sql`(uuid())`),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  budget: real("budget").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export const wishlistItems = sqliteTable("wishlist_items", {
  id: text("id").primaryKey().default(sql`(uuid())`),
  wishlistId: text("wishlist_id")
    .notNull()
    .references(() => wishlists.id),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  url: text("url"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export default { wishlists, wishlistItems };
