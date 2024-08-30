import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const readMessages = sqliteTable("read_messages", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    messageId: text("message_id").notNull(),
    readAt: integer("read_at")
        .notNull()
        .default(sql`(strftime('%s', 'now'))`),
});
