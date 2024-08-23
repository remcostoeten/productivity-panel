"use server";

import { eq, sql } from "drizzle-orm";

export async function updateUserInfo(userInfo: {
  id: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  showPreloader: boolean;
}) {
  const { id, ...updateData } = userInfo;

  try {
    await db
      .update(users)
      .set({
        firstName: updateData.firstName,
        lastName: updateData.lastName,
        profileImageUrl: updateData.profileImageUrl,
        showPreloader: updateData.showPreloader,
        updatedAt: sql`strftime('%s', 'now')`,
      })
      .where(eq(users.id, id));

    return { success: true };
  } catch (error) {
    console.error("Error updating user info:", error);
    throw new Error("Failed to update user information");
  }
}
