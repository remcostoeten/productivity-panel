import { db } from "@/core/server/db";
import { users } from '@/core/server/db/schema/relation-remodel';
import { auth } from '@clerk/nextjs/server';
import { eq } from "drizzle-orm";
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId) {
    // Redirect to sign-in page if user is not authenticated
    if (typeof window !== 'undefined') {
      window.location.href = '/sign-in';
    }
    return null;
  }

  let user = null;
  if (userId) {
    const result = await db.select().from(users).where(eq(users.id, userId));
    user = result[0];
  }

  return <DashboardClient user={user} userId={userId} />;
}
