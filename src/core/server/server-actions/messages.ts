"use server"

import { auth } from "@clerk/nextjs/server"
import { and, eq, gt, isNull, or } from "drizzle-orm"
import { db } from "../db"
import { globalMessages, personalMessages, readMessages } from "../db/schema/relation-remodel/messages"

export async function getGlobalMessages() {
  const { userId } = auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  const currentTime = Math.floor(Date.now() / 1000)

  const messages = await db
    .select({
      id: globalMessages.id,
      content: globalMessages.content,
      createdAt: globalMessages.createdAt,
      expiresAt: globalMessages.expiresAt,
      isUrgent: globalMessages.isUrgent,
    })
    .from(globalMessages)
    .leftJoin(readMessages, and(
      eq(readMessages.messageId, globalMessages.id),
      eq(readMessages.userId, userId)
    ))
    .where(
      and(
        eq(globalMessages.isActive, true),
        or(
          isNull(globalMessages.expiresAt),
          gt(globalMessages.expiresAt, currentTime)
        ),
        isNull(readMessages.id)
      )
    ) 
    .orderBy(globalMessages.createdAt)

  return messages
}

export async function getPersonalMessages() {
  const { userId } = auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  const currentTime = Math.floor(Date.now() / 1000)

  const messages = await db
    .select({
      id: personalMessages.id,
      content: personalMessages.content,
      createdAt: personalMessages.createdAt,
      expiresAt: personalMessages.expiresAt,
      isUrgent: personalMessages.isUrgent,
    })
    .from(personalMessages)
    .leftJoin(readMessages, and(
      eq(readMessages.messageId, personalMessages.id),
      eq(readMessages.userId, userId)
    ))
    .where(
      and(
        eq(personalMessages.recipientId, userId),
        eq(personalMessages.isActive, true),
        or(
          isNull(personalMessages.expiresAt),
          gt(personalMessages.expiresAt, currentTime)
        ),
        isNull(readMessages.id)
      )
    )
    .orderBy(personalMessages.createdAt)

  return messages
}

export async function markMessageAsRead(messageId: string) {
  const { userId } = auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  await db.insert(readMessages).values({
    id: crypto.randomUUID(),
    userId,
    messageId,
    readAt: Math.floor(Date.now() / 1000),
  })
}
