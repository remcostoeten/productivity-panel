import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const personalMessages = sqliteTable("personal_messages", {
    id: text("id").primaryKey(),
    content: text("content").notNull(),
    recipientId: text("recipient_id").notNull(),
    createdAt: integer("created_at")
        .notNull()
        .default(sql`(strftime('%s', 'now'))`),
    expiresAt: integer("expires_at"),
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
    isUrgent: integer("is_urgent", { mode: "boolean" }).notNull().default(false),
    createdBy: text("created_by").notNull(),
})
