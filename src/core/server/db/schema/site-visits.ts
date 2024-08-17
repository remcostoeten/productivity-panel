import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const site_visits = sqliteTable("site_visits", {
  id: text("id").primaryKey(),
  timestamp: integer("timestamp")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export type SiteVisit = typeof site_visits.$inferSelect;
export type NewSiteVisit = typeof site_visits.$inferInsert;
