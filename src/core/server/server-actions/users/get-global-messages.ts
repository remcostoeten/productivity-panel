import { sql } from "drizzle-orm"
import { db } from "../../db"
import { globalMessages } from "../../db/schema/relation-remodel"

export async function getGlobalMessages(userId: string) {
    try {
        const messages = await db
            .select({
                id: globalMessages.id,
                content: globalMessages.content,
                createdAt: globalMessages.createdAt,
                expiresAt: globalMessages.expiresAt,
            }) 
            .from(globalMessages)
            .where(
                sql`${globalMessages.isActive} = 1 AND 
            (${globalMessages.expiresAt} IS NULL OR ${globalMessages.expiresAt} > strftime('%s', 'now')) AND
            ${globalMessages.id} NOT IN (
              SELECT messageId FROM readMessages WHERE userId = ${userId}
            )`
            )
            .orderBy(sql`${globalMessages.createdAt} DESC`)

        return messages
    } catch (error) {
        console.error("Failed to fetch global messages:", error)
        throw new Error("Failed to fetch global messages")
    }
}
