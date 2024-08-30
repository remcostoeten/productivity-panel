"use server";

import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { messages } from "../db/schema/relation-remodel/messages";

export async function markMessageAsRead(messageId: number) {
  await db
    .update(messages)
    .set({ isRead: true })
    .where(eq(messages.id, messageId.toString()));
  revalidatePath("/dashboard/inbox");
}

export async function markMessageAsUnread(messageId: number) {
  await db
    .update(messages)
    .set({ isRead: false })
    .where(eq(messages.id, messageId));
  revalidatePath("/dashboard/inbox");
}

export async function markAllMessagesAsRead(userId: string) {
  await db
    .update(messages)
    .set({ isRead: true })
    .where(eq(messages.userId, userId));
  revalidatePath("/dashboard/inbox");
}

export async function getUserMessages() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  try {
    const userMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.userId, userId))
      .orderBy(desc(messages.createdAt));

    return userMessages;
  } catch (error) {
    console.error("Error retrieving user messages:", error);
    throw new Error("Failed to retrieve user messages");
  }
}
