"use server";

import { db } from "@/core/server/db";
import { users } from "@/core/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function getUserPreloaderPreference(): Promise<boolean> {
  const { userId } = auth();
  if (!userId) return true;

  const user = await db
    .select({ showPreloader: users.showPreloader })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return user[0]?.showPreloader ?? true;
}
