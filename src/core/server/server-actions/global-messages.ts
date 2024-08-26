// src/core/server/server-actions/global-messages.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { users } from "../db/schema";
import { globalMessages } from "../db/schema/relation-remodel/messages/global-messages";

type CreateGlobalMessageInput = {
  content: string;
  expiresAt?: Date;
};

export async function createGlobalMessage({
  content,
  expiresAt,
}: CreateGlobalMessageInput) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  // Check if the user is an admin
  const isAdmin = await checkIfUserIsAdmin(userId);
  if (!isAdmin) {
    throw new Error("Not authorized. Only admins can create global messages.");
  }

  try {
    await db.insert(globalMessages).values({
      id: crypto.randomUUID(),
      content,
      expiresAt: expiresAt ? Math.floor(expiresAt.getTime() / 1000) : undefined,
    });

    revalidatePath("/dashboard/inbox");
  } catch (error) {
    console.error("Error creating global message:", error);
    throw new Error("Failed to create global message");
  }
}

async function checkIfUserIsAdmin(userId: string): Promise<boolean> {
  const user = await db
    .select({ isAdmin: users.isAdmin })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return user.length > 0 && user[0].isAdmin;
}
