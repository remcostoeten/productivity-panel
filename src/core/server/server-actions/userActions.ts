"use server";

import { db } from "@/core/server/db";
import { users } from "@/core/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";

// Update the last sign-in time for the authenticated user
export async function updateLastSignIn() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  try {
    await db
      .update(users)
      .set({ lastSignIn: sql`(strftime('%s', 'now'))` })
      .where(eq(users.id, userId));
    return { success: true };
  } catch (error) {
    console.error("Error updating last sign-in:", error);
    throw new Error("Failed to update last sign-in");
  }
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

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (existingUser.length > 0) {
      await db
        .update(users)
        .set({
          email,
          firstName,
          lastName,
          profileImageUrl,
          emailVerified: emailVerified ? 1 : 0,
          lastSignIn: sql`(strftime('%s', 'now'))`,
          signInCount: sql`${users.signInCount} + 1`, // Increment sign-in count
          updatedAt: sql`(strftime('%s', 'now'))`,
        })
        .where(eq(users.id, id));

      console.log(`User ${id} updated and sign-in count incremented`);
    } else {
      await db.insert(users).values({
        id,
        email,
        firstName,
        lastName,
        profileImageUrl,
        emailVerified: emailVerified ? 1 : 0,
        isAdmin:
          email === process.env.ADMIN_EMAIL_MAIN ||
          email === process.env.ADMIN_EMAIL_SECONDARY
            ? 1
            : 0,
        lastSignIn: sql`(strftime('%s', 'now'))`,
        signInCount: 1, // Set initial sign-in count for new users
        createdAt: sql`(strftime('%s', 'now'))`,
        updatedAt: sql`(strftime('%s', 'now'))`,
      });

      console.log(`User ${id} created with initial sign-in count`);
    }

    return { success: true, id };
  } catch (error) {
    console.error("Error creating or updating user:", error);
    throw new Error("Failed to create or update user");
  }
}

// Retrieve the profile of the authenticated user
export async function getUserProfile() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  try {
    const userProfile = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (userProfile.length === 0) {
      throw new Error("User not found");
    }

    return userProfile[0];
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    throw new Error("Failed to retrieve user profile");
  }
}

export async function updateUserProfile(updateData: {
  firstName?: string;
  lastName?: string;
  username?: string;
  dateOfBirth?: string;
  bio?: string;
  profileImageUrl?: string;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Not authenticated");
  }
  try {
    const { dateOfBirth, ...otherData } = updateData;
    await db
      .update(users)
      .set({
        ...otherData,
        dateOfBirth: dateOfBirth
          ? new Date(dateOfBirth).getTime() / 1000
          : undefined,
        updatedAt: sql`(strftime('%s', 'now'))`,
      })
      .where(eq(users.id, userId));
    return { success: true };
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Failed to update user profile");
  }
}

export async function checkUsernameAvailability(username: string) {
  try {
    const existingUser = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
    return existingUser.length === 0;
  } catch (error) {
    console.error("Error checking username availability:", error);
    throw new Error("Failed to check username availability");
  }
}
