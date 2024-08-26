export * from "./messages/global-messages";
export * from "./messages/messages";
export * from "./users/user_preferences";
export * from "./users/user_settings";
export * from "./users/users";

import { relations } from "drizzle-orm";
import { messages } from "./messages/messages";
import { userPreferences } from "./users/user_preferences";
import { userSettings } from "./users/user_settings";
import { users } from "./users/users";

export const usersRelations = relations(users, ({ one }) => ({
  settings: one(userSettings, {
    fields: [users.id],
    references: [userSettings.userId],
  }),
  preferences: one(userPreferences, {
    fields: [users.id],
    references: [userPreferences.userId],
  }),
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
