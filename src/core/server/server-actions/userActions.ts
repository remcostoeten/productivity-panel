"use server";

import { db } from "@/core/server/db";
import { users } from "@/core/server/db/schema";
import { eq, sql } from "drizzle-orm";

export async function updateLastSignIn(userId: string) {
  const now = Math.floor(Date.now() / 1000);
  await db
    .update(users)
    .set({ lastSignIn: now, updatedAt: now })
    .where(eq(users.id, userId));

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
  const { id, email, firstName, lastName, profileImageUrl, emailVerified } = userData;
  const now = Math.floor(Date.now() / 1000);

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
        lastSignIn: now,
        updatedAt: now,
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
      isAdmin: 0, // Default to non-admin
      lastSignIn: now,
      createdAt: now,
      updatedAt: now,
      signInCount: 1, // Initialize sign-in count
    });

    console.log(`User ${id} created`);
  }

  return { success: true, id };
}

export async function getUserProfile(userId: string) {
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

export async function updateUserProfile(userId: string, updateData: {
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
}) {
  const now = Math.floor(Date.now() / 1000);

  await db
    .update(users)
    .set({
      ...updateData,
      updatedAt: now,
    })
    .where(eq(users.id, userId));

  return { success: true };
}

export async function updateSignInInfo(userId: string) {
  const now = Math.floor(Date.now() / 1000);

  await db
    .update(users)
    .set({
      lastSignIn: now,
      signInCount: sql`${users.signInCount} + 1`,
      updatedAt: now,
    })
    .where(eq(users.id, userId));

  return { success: true };
}