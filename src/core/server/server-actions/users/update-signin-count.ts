"use server"

import { db } from "@/core/server/db"
import { users } from "@/core/server/db/schema/relation-remodel/users/users"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function updateSignInCount() {
    const { userId, sessionId } = auth()

    if (!userId || !sessionId) {
        throw new Error("Unauthorized")
    }

    try {
        // Get the current session
        const session = await clerkClient.sessions.getSession(sessionId)

        // Check if this is the first request of the session
        if (session.lastActiveAt === session.createdAt) {
            // This is a new session, so increment the sign-in count
            await db.update(users)
                .set({
                    signInCount: sql`${users.signInCount} + 1`,
                    lastSignIn: sql`(strftime('%s', 'now'))`
                })
                .where(eq(users.id, userId))

            revalidatePath("/dashboard")
        }
    } catch (error) {
        console.error("Failed to update sign-in count:", error)
        throw new Error("Failed to update sign-in count")
    }
}
