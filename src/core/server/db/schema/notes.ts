
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const folders = sqliteTable('folders', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  userId: text('user_id').notNull(),
  parentId: text('parent_id').references(() => folders.id),
  createdAt: integer('created_at').notNull().default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at').notNull().default(sql`(strftime('%s', 'now'))`),
});

export const notes = sqliteTable('notes', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content'),
  userId: text('user_id').notNull(),
  folderId: text('folder_id').references(() => folders.id),
  isPublic: integer('is_public', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at').notNull().default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at').notNull().default(sql`(strftime('%s', 'now'))`),
});

export type Folder = typeof folders.$inferSelect;
export type NewFolder = typeof folders.$inferInsert;
export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;