import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "../relation-remodel";

export const wishlists = sqliteTable("wishlists", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  budget: integer("budget").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export type Wishlist = typeof wishlists.$inferSelect;
export type NewWishlist = typeof wishlists.$inferInsert;
