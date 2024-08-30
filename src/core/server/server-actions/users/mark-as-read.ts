import { revalidatePath } from "next/cache"
import { db } from "../../db"

export async function markMessageAsRead(userId: string, messageId: string) {
    try {
        await db.insert(readMessages).values({
            id: crypto.randomUUID(),
            userId,
            messageId,
            readAt: Math.floor(Date.now() / 1000),
        })
        revalidatePath("/dashboard")
    } catch (error) {
        console.error("Failed to mark message as read:", error)
        throw new Error("Failed to mark message as read")
    }
}
