
import { sessionOptions, VisitorSession } from "@/core/lib/iron-session-config";
import { db } from "@/core/server/db";
import { siteVisits } from "@/core/server/db/schema";
import { sql } from "drizzle-orm";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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

  return NextResponse.json({ message: "Visit recorded" });
}
