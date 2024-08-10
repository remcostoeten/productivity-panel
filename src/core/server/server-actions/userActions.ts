import { db } from "@/core/server/db";
import { users } from "@/core/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import console from "console";
import { eq, sql } from "drizzle-orm";

export async function updateLastSignIn() {
  const { userId } = auth();

  if (!userId) {
    console.error("updateLastSignIn: Not authenticated");
    throw new Error("Not authenticated");
  }

  try {
    await db
      .update(users)
      .set({
        lastSignIn: sql`(strftime('%s', 'now'))`,
      })
      .where(eq(users.id, userId));

    console.log(
      `updateLastSignIn: Successfully updated last sign-in for user ${userId}`,
    );
    return { success: true };
  } catch (error) {
    console.error(
      `updateLastSignIn: Error updating last sign-in for user ${userId}:`,
      error,
    );
    throw error;
  }
}

export async function incrementSignInCount() {
  const { userId } = auth();

  if (!userId) {
    console.error("incrementSignInCount: Not authenticated");
    throw new Error("Not authenticated");
  }

  try {
    await db
      .update(users)
      .set({
        signInCount: sql`sign_in_count + 1`,
      })
      .where(eq(users.id, userId));

    console.log(
      `incrementSignInCount: Successfully incremented sign-in count for user ${userId}`,
    );
    return { success: true };
  } catch (error) {
    console.error(
      `incrementSignInCount: Error incrementing sign-in count for user ${userId}:`,
      error,
    );
    throw error;
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

      console.log(`createOrUpdateUser: User ${id} updated`);
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
        lastSignIn: sql`(strftime('%s', 'now'))`,
        signInCount: 1, // Set to 1 for new users
        createdAt: sql`(strftime('%s', 'now'))`,
        updatedAt: sql`(strftime('%s', 'now'))`,
      });

      console.log(`createOrUpdateUser: User ${id} created`);
    }

    return { success: true, id };
  } catch (error) {
    console.error(
      `createOrUpdateUser: Error creating/updating user ${id}:`,
      error,
    );
    throw error;
  }
}

export async function getUserProfile() {
  const { userId } = auth();

  if (!userId) {
    console.error("getUserProfile: Not authenticated");
    throw new Error("Not authenticated");
  }

  try {
    const userProfile = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (userProfile.length === 0) {
      console.error(`getUserProfile: User ${userId} not found`);
      throw new Error("User not found");
    }

    return userProfile[0];
  } catch (error) {
    console.error(`getUserProfile: Error fetching user ${userId}:`, error);
    throw error;
  }
}

export async function updateUserProfile(updateData: {
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
}) {
  const { userId } = auth();

  if (!userId) {
    console.error("updateUserProfile: Not authenticated");
    throw new Error("Not authenticated");
  }

  try {
    await db
      .update(users)
      .set({
        ...updateData,
        updatedAt: sql`(strftime('%s', 'now'))`,
      })
      .where(eq(users.id, userId));

    console.log(
      `updateUserProfile: Successfully updated profile for user ${userId}`,
    );
    return { success: true };
  } catch (error) {
    console.error(
      `updateUserProfile: Error updating profile for user ${userId}:`,
      error,
    );
    throw error;
  }
}

export async function resetSignInCount() {
  const { userId } = auth();

  if (!userId) {
    console.error("resetSignInCount: Not authenticated");
    throw new Error("Not authenticated");
  }

  try {
    await db
      .update(users)
      .set({
        signInCount: 0,
        updatedAt: sql`(strftime('%s', 'now'))`,
      })
      .where(eq(users.id, userId));

    console.log(
      `resetSignInCount: Successfully reset sign-in count for user ${userId}`,
    );
    return { success: true };
  } catch (error) {
    console.error(
      `resetSignInCount: Error resetting sign-in count for user ${userId}:`,
      error,
    );
    throw error;
  }
}

export async function deleteUser() {
  const { userId } = auth();

  if (!userId) {
    console.error("deleteUser: Not authenticated");
    throw new Error("Not authenticated");
  }

  try {
    await db.delete(users).where(eq(users.id, userId));

    console.log(`deleteUser: Successfully deleted user ${userId}`);
    return { success: true };
  } catch (error) {
    console.error(`deleteUser: Error deleting user ${userId}:`, error);
    throw error;
  }
}
