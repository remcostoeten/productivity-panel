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
      .set({ last_sign_in: sql`(strftime('%s', 'now'))` })
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
  first_name: string | null;
  last_name: string | null;
  profile_image_url?: string;
  email_verified: boolean;
}) {
  const {
    id,
    email,
    first_name,
    last_name,
    profile_image_url,
    email_verified,
  } = userData;

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
          first_name,
          last_name,
          profile_image_url,
          email_verified: email_verified ? 1 : 0,
          last_sign_in: sql`(strftime('%s', 'now'))`,
          updated_at: sql`(strftime('%s', 'now'))`,
        })
        .where(eq(users.id, id));

      console.log(`User ${id} updated`);
    } else {
      await db.insert(users).values({
        id,
        email,
        first_name,
        last_name,
        profile_image_url,
        email_verified: email_verified ? 1 : 0,
        is_admin:
          email === process.env.ADMIN_EMAIL_MAIN ||
          email === process.env.ADMIN_EMAIL_SECONDARY
            ? 1
            : 0,
        last_sign_in: sql`(strftime('%s', 'now'))`,
        created_at: sql`(strftime('%s', 'now'))`,
        updated_at: sql`(strftime('%s', 'now'))`,
      });

      console.log(`User ${id} created`);
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

// Update the profile of the authenticated user
export async function updateUserProfile(updateData: {
  first_name?: string;
  last_name?: string;
  profile_image_url?: string;
}) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  try {
    await db
      .update(users)
      .set({
        ...updateData,
        updated_at: sql`(strftime('%s', 'now'))`,
      })
      .where(eq(users.id, userId));

    return { success: true };
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Failed to update user profile");
  }
}
