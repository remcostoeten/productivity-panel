"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { notifications } from "../db/schema";

export async function getNotifications() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, session.user.id));
}

export async function createNotification(message: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const newNotification = await db
    .insert(notifications)
    .values({
      userId: session.user.id,
      message,
    })
    .returning();

  revalidatePath("/dashboard");
  return newNotification[0];
}

export async function updateNotificationStatus(id: string, isRead: boolean) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const updatedNotification = await db
    .update(notifications)
    .set({ isRead })
    .where(
      and(eq(notifications.id, id), eq(notifications.userId, session.user.id)),
    )
    .returning();

  if (updatedNotification.length === 0) {
    throw new Error("Notification not found");
  }

  revalidatePath("/dashboard");
  return updatedNotification[0];
}
