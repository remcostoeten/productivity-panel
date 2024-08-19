import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const siteVisits = sqliteTable("site_visits", {
  id: text("id").primaryKey(),
  timestamp: integer("timestamp")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  userId: text("user_id"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  path: text("path").notNull(),
});

export type SiteVisit = typeof siteVisits.$inferSelect;
export type NewSiteVisit = typeof siteVisits.$inferInsert;
