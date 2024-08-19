"use erver";

import { db } from "@/core/server/db";
import { users } from "@/core/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";

export async function incrementSignInCount() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  try {
    await db
      .update(users)
      .set({
        signInCount: sql`${users.signInCount} + 1`,
        lastSignIn: sql`(strftime('%s', 'now'))`,
      })
      .where(eq(users.id, userId));

    return { success: true };
  } catch (error) {
    console.error("Error incrementing sign-in count:", error);
    throw new Error("Failed to increment sign-in count");
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
          updatedAt: sql`(strftime('%s', 'now'))`,
        })
        .where(eq(users.id, id));

      console.log(`User ${id} updated`);
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
        signInCount: 0,
        lastSignIn: null,
        createdAt: sql`(strftime('%s', 'now'))`,
        updatedAt: sql`(strftime('%s', 'now'))`,
      });

      console.log(`User ${id} created`);
    }

    return { success: true, id };
  } catch (error) {
    console.error("Error creating or updating user:", error);
    throw new Error("Failed to create or update user");
  }
}
