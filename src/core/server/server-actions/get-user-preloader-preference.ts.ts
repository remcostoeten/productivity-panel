"use server";

import { db } from "@/core/server/db";
import { userSettings } from "@/core/server/db/schema/relation-remodel";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function getUserPreloaderPreference(): Promise<boolean> {
  const { userId } = auth();
  if (!userId) return true;

  const settings = await db
    .select({ showPreloader: userSettings.showPreloader })
    .from(userSettings)
    .where(eq(userSettings.userId, userId))
    .limit(1);

  return settings[0]?.showPreloader ?? true;
}
