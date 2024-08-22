"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { users } from "../db/schema/users";

export async function updateUserInfo(formData: FormData) {
  const id = formData.get("id") as string;
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
        updatedAt: sql`strftime('%s', 'now')`,
      })
      .where(eq(users.id, id));

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error updating user info:", error);
    return { error: "Failed to update user information" };
  }
}
