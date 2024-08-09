import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const siteVisits = sqliteTable("site_visits", {
  path: text("path").notNull(),
  count: integer("count").notNull().default(0),
  lastVisited: integer("last_visited", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export default siteVisits;
