"use server";

import { ADMIN_EMAILS } from "@/core/data/site-config";
import { db } from "@/core/server/db";
import { users } from "@/core/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";

export async function updateLastSignIn() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  await db.update(users).set({ lastSignIn: sql`(strftime('%s', 'now'))` });

  return { success: true };
}

export async function createOrUpdateUser(userData: {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl?: string;
  emailVerified: boolean;
}) {
  const { id, email, firstName, lastName, profileImageUrl, emailVerified } =
    userData;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  if (existingUser.length > 0) {
    // Update existing user
    await db
      .update(users)
      .set({
        email,
        firstName,
        lastName,
        profileImageUrl,
        emailVerified: emailVerified ? 1 : 0,
        lastSignIn: sql`(strftime('%s', 'now'))`,
        updatedAt: sql`(strftime('%s', 'now'))`,
      })
      .where(eq(users.id, id));

    console.log(`User ${id} updated`);
  } else {
    // Create new user
    await db.insert(users).values({
      id,
      email,
      firstName,
      lastName,
      profileImageUrl,
      emailVerified: emailVerified ? 1 : 0,
      isAdmin:
        ADMIN_EMAILS.MAIN === email || ADMIN_EMAILS.SECONDARY === email ? 1 : 0,
      lastSignIn: sql`(strftime('%s', 'now'))`,
      createdAt: sql`(strftime('%s', 'now'))`,
      updatedAt: sql`(strftime('%s', 'now'))`,
    });

    console.log(`User ${id} created`);
  }

  return { success: true, id };
}

export async function getUserProfile() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const userProfile = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (userProfile.length === 0) {
    throw new Error("User not found");
  }

  return userProfile[0];
}

export async function updateUserProfile(updateData: {
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
}) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  await db
    .update(users)
    .set({
      ...updateData,
      updatedAt: sql`(strftime('%s', 'now'))`,
    })
    .where(eq(users.id, userId));

  return { success: true };
}
