"use server";

import { db } from "@/core/server/db";
import { users } from "@/core/server/db/schema/relation-remodel/users/users";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function getUserInfo() {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Unauthorized")
    }

    try {
        const userInfo = await db.select({
            firstName: users.firstName,
            signInCount: users.signInCount,
            lastSignIn: users.lastSignIn
        })
            .from(users)
            .where(eq(users.id, userId))
            .limit(1)

        return userInfo[0]
    } catch (error) {
        console.error("Failed to fetch user info:", error)
        throw new Error("Failed to fetch user info")
    }
}
