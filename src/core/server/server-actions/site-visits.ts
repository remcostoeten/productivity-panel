"use server";

import { sql } from "drizzle-orm";
import { db } from "../db";
import { siteVisits } from "../db/schema";

export async function getSiteVisitStats() {
  try {
    const totalVisits = await db
      .select({ count: sql`count(*)` })
      .from(siteVisits);
    const uniqueVisitors = await db
      .select({ count: sql`count(distinct ip_address)` })
      .from(siteVisits);
    const topPaths = await db
      .select({ path: siteVisits.path, count: sql`count(*)` })
      .from(siteVisits)
      .groupBy(siteVisits.path)
      .orderBy(sql`count(*) desc`)
      .limit(5);

    return {
      totalVisits: Number(totalVisits[0].count),
      uniqueVisitors: Number(uniqueVisitors[0].count),
      topPaths: topPaths.map((p) => ({ path: p.path, count: Number(p.count) })),
    };
  } catch (error) {
    console.error("Error fetching site visit stats:", error);
    throw new Error("Failed to fetch site visit statistics");
  }
}
