export * from "../assets/assets";
export * from "../notes";
export * from './messages/index';
export * from "./users/user_preferences";
export * from "./users/user_settings";
export * from "./users/users";

import { assets } from "@/core/server/db/schema/assets/assets";
import { relations } from "drizzle-orm";
import { folders, notes, sharedNotes, tags } from "../notes";
import { messages } from "./messages/index";
import { userPreferences } from "./users/user_preferences";
import { userSettings } from "./users/user_settings";
import { users } from "./users/users";

export const usersRelations = relations(users, ({ one, many }) => ({
  settings: one(userSettings, {
    fields: [users.id],
    references: [userSettings.userId],
  }),
  preferences: one(userPreferences, {
    fields: [users.id],
    references: [userPreferences.userId],
  }),
  notes: many(notes),
  folders: many(folders),
  tags: many(tags),
  sharedNotes: many(sharedNotes),
  assets: many(assets),
}));

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(users, {
    fields: [userSettings.userId],
    references: [users.id],
  }),
}));

export const userPreferencesRelations = relations(
  userPreferences,
  ({ one }) => ({
    user: one(users, {
      fields: [userPreferences.userId],
      references: [users.id],
    }),
  }),
);

export const messagesRelations = relations(messages, ({ one }) => ({
  user: one(users, {
    fields: [messages.userId],
    references: [users.id],
  }),
}));

export * from "../notes";
