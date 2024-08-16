import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '@/lib/iron-session-config';
import { db } from '@/core/server/db';
import { siteVisits } from '@/core/server/db/schema';
import { sql } from 'drizzle-orm';

export async function incrementSiteVisit() {
  const session = await getIronSession(cookies(), sessionOptions);

  if (!session.hasVisited) {
    await db.insert(siteVisits).values({
      id: crypto.randomUUID(),
      timestamp: sql`(strftime('%s', 'now'))`,
    });

    session.hasVisited = true;
    await session.save();
  }
}
