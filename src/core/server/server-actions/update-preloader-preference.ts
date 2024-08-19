// In src/core/server/server-actions/update-preloader-preference.ts

"use server";

import { db } from "@/core/server/db";
import { users } from "@/core/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function updatePreloaderPreference(showPreloader: boolean) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  await db
    .update(users)
    .set({
      showPreloader: showPreloader,
      updatedAt: Math.floor(Date.now() / 1000),
    })
    .where(eq(users.id, userId));

  return { success: true };
}
