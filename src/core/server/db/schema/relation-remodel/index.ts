export * from "./user_preferences";
export * from "./user_settings";
export * from "./users";

import { relations } from "drizzle-orm";
import { userPreferences } from "./user_preferences";
import { users } from "./users";
import { userSettings } from "./user_settings";

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
