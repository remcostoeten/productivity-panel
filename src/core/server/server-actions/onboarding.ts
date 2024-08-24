"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { users } from "../db/schema";

export async function updateUserBio(bio: string) {
  const { userId } = auth();
  if (!userId) throw new Error("User not authenticated");

  await db.update(users).set({ bio }).where(eq(users.id, userId));

  revalidatePath("/dashboard");
}

export async function updateUserDateOfBirth(dateOfBirth: number) {
  const { userId } = auth();
  if (!userId) throw new Error("User not authenticated");

  await db.update(users).set({ dateOfBirth }).where(eq(users.id, userId));

  revalidatePath("/dashboard");
}

export async function updateUserPreloader(showPreloader: boolean) {
  const { userId } = auth();
  if (!userId) throw new Error("User not authenticated");

  await db.update(users).set({ showPreloader }).where(eq(users.id, userId));

  revalidatePath("/dashboard");
}

export async function updateUserInfo(formData: FormData) {
  const { userId } = auth();
  if (!userId) throw new Error("User not authenticated");

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const profileImageUrl = formData.get("profileImageUrl") as string;
  const showPreloader = formData.get("showPreloader") === "on";

  try {
    await db
      .update(users)
      .set({
        firstName,
        lastName,
        profileImageUrl,
        showPreloader,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error updating user info:", error);
    return { error: "Failed to update user information" };
  }
}
