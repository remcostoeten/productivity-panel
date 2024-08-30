// src/core/server/db/schema/assets.ts

import { users } from "@/core/server/db/schema/relation-remodel";
import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
 
export const assets = sqliteTable("assets", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  fileSize: integer("file_size").notNull(),
  url: text("url").notNull(),
  visibility: text("visibility").notNull().default("private"),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export const assetCategories = sqliteTable("asset_categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const assetCategoryRelations = sqliteTable("asset_category_relations", {
  assetId: text("asset_id")
    .notNull()
    .references(() => assets.id),
  categoryId: text("category_id")
    .notNull()
    .references(() => assetCategories.id),
});
