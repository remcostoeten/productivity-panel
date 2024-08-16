"use server";

import { sessionOptions, VisitorSession } from "@/core/lib/iron-session-config";
import { db } from "_templates/db-index";
import { sql } from "drizzle-orm";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { siteVisits } from "../db/schema";

export async function incrementSiteVisit() {
  const session = await getIronSession<VisitorSession>(
    cookies(),
    sessionOptions,
  );

  if (!session.hasVisited) {
    await db.insert(siteVisits).values({
      id: crypto.randomUUID(),
      timestamp: sql`(strftime('%s', 'now'))`,
    });

    session.hasVisited = true;
    await session.save();
  }
}