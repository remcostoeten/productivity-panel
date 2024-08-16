import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const siteVisits = sqliteTable("site_visits", {
  id: text("id").primaryKey(),
  timestamp: integer("timestamp")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export type SiteVisit = typeof siteVisits.$inferSelect;
export type NewSiteVisit = typeof siteVisits.$inferInsert;
