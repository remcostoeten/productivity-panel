import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Define the unique_visits table
export const uniqueVisits = sqliteTable("unique_visits", {
  userId: text("user_id").primaryKey(), // Store unique user IDs
  visitedAt: integer("visited_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`), // Timestamp of the visit
});

// Type definitions for unique visits
export type UniqueVisit = typeof uniqueVisits.$inferSelect;
export type NewUniqueVisit = typeof uniqueVisits.$inferInsert;

// Function to count unique visitors
export const countUniqueVisitors = async (db) => {
  const result = await db
    .select()
    .from(uniqueVisits)
    .distinct()
    .count("userId")
    .execute();
  return result[0]?.count || 0; // Return the count of unique visitors
};
