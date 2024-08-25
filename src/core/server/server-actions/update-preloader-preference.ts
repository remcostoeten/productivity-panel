"use server";

import { db } from "@/core/server/db";
import { userSettings } from "@/core/server/db/schema/relation-remodel";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function updatePreloaderPreference(showPreloader: boolean) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  await db
    .update(userSettings)
    .set({
      showPreloader: showPreloader,
      updatedAt: Math.floor(Date.now() / 1000),
    })
    .where(eq(userSettings.userId, userId));

  return { success: true };
}
