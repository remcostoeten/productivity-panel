"use server";

import { db } from "@/core/server/db";
import {
  messages,
  userPreferences,
  users,
  userSettings,
} from "@/core/server/db/schema/relation-remodel";
import { auth } from "@clerk/nextjs/server";
import crypto from "crypto";
import { eq, sql } from "drizzle-orm";

// Fallback admin emails for testing
const FALLBACK_ADMIN_EMAILS = ["admin1@example.com", "admin2@example.com"];

export async function updateLastSignIn() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  try {
    await db
      .update(userSettings)
      .set({ lastSignIn: sql`CAST(strftime('%s', 'now') AS INTEGER)` })
      .where(eq(userSettings.userId, userId));
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

  // Debug logs
  console.log("Creating/Updating user:", { id, email, firstName, lastName });
  console.log("ADMIN_EMAIL_MAIN:", process.env.NEXT_PUBLIC_ADMIN_EMAIL_MAIN);
  console.log(
    "ADMIN_EMAIL_SECONDARY:",
    process.env.NEXT_PUBLIC_ADMIN_EMAIL_SECONDARY,
  );

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (existingUser.length > 0) {
      await db.transaction(async (tx) => {
        await tx
          .update(users)
          .set({
            email,
            firstName,
            lastName,
            profileImageUrl,
            emailVerified: emailVerified ? 1 : 0,
            updatedAt: sql`(strftime('%s', 'now'))`,
          })
          .where(eq(users.id, id));

        await tx
          .update(userSettings)
          .set({
            lastSignIn: sql`(strftime('%s', 'now'))`,
            signInCount: sql`${userSettings.signInCount} + 1`,
            updatedAt: sql`(strftime('%s', 'now'))`,
          })
          .where(eq(userSettings.userId, id));
      });

      console.log(`User ${id} updated and sign-in count incremented`);
    } else {
      await db.transaction(async (tx) => {
        await tx.insert(users).values({
          id,
          email,
          firstName,
          lastName,
          profileImageUrl,
          emailVerified: emailVerified ? 1 : 0,
          createdAt: sql`(strftime('%s', 'now'))`,
          updatedAt: sql`(strftime('%s', 'now'))`,
        });

        const isAdmin =
          FALLBACK_ADMIN_EMAILS.includes(email) ||
          email === process.env.NEXT_PUBLIC_ADMIN_EMAIL_MAIN ||
          email === process.env.NEXT_PUBLIC_ADMIN_EMAIL_SECONDARY;

        console.log("Is admin:", isAdmin, "for email:", email);

        await tx.insert(userSettings).values({
          id: crypto.randomUUID(),
          userId: id,
          lastSignIn: sql`(strftime('%s', 'now'))`,
          signInCount: 1,
          isAdmin,
          createdAt: sql`(strftime('%s', 'now'))`,
          updatedAt: sql`(strftime('%s', 'now'))`,
        });

        await tx.insert(userPreferences).values({
          id: crypto.randomUUID(),
          userId: id,
          createdAt: sql`(strftime('%s', 'now'))`,
          updatedAt: sql`(strftime('%s', 'now'))`,
        });

        await tx.insert(messages).values({
          id: crypto.randomUUID(),
          userId: id,
          content: "Welcome to our platform! We're excited to have you here.",
          createdAt: sql`(strftime('%s', 'now'))`,
        });

        await tx.insert(messages).values({
          id: crypto.randomUUID(),
          userId: id,
          content:
            "Don't forget to complete your profile and explore all our features.",
          createdAt: sql`(strftime('%s', 'now'))`,
        });
      });

      console.log(
        `User ${id} created with initial settings, preferences, and welcome messages`,
      );
    }

    return { success: true, id };
  } catch (error) {
    console.error("Error creating or updating user:", error);
    throw new Error("Failed to create or update user");
  }
}

export async function getUserProfile() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }
  try {
    const userProfile = await db.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        settings: true,
        preferences: true,
      },
    });

    if (!userProfile) {
      throw new Error("User not found");
    }

    return userProfile;
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
  showPreloader?: boolean;
  allowNotifications?: boolean;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Not authenticated");
  }
  try {
    const { dateOfBirth, showPreloader, allowNotifications, ...userData } =
      updateData;
    await db.transaction(async (tx) => {
      await tx
        .update(users)
        .set({
          ...userData,
          dateOfBirth: dateOfBirth
            ? new Date(dateOfBirth).getTime() / 1000
            : undefined,
          updatedAt: sql`(strftime('%s', 'now'))`,
        })
        .where(eq(users.id, userId));

      if (showPreloader !== undefined || allowNotifications !== undefined) {
        await tx
          .update(userSettings)
          .set({
            showPreloader,
            allowNotifications,
            updatedAt: sql`(strftime('%s', 'now'))`,
          })
          .where(eq(userSettings.userId, userId));
      }
    });
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

export async function deleteUserAccount() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Not authenticated");
  }

  try {
    await db.transaction(async (tx) => {
      await tx
        .delete(userPreferences)
        .where(eq(userPreferences.userId, userId));
      await tx.delete(userSettings).where(eq(userSettings.userId, userId));
      await tx.delete(users).where(eq(users.id, userId));
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting user account:", error);
    throw new Error("Failed to delete user account");
  }
}

export async function updateNotificationPreference(
  allowNotifications: boolean,
) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  await db
    .update(userSettings)
    .set({ allowNotifications })
    .where(eq(userSettings.userId, userId));

  return allowNotifications;
}

export async function getUserNotificationPreference() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const settings = await db.query.userSettings.findFirst({
    where: eq(userSettings.userId, userId),
    columns: { allowNotifications: true },
  });

  return settings?.allowNotifications ?? true;
}
