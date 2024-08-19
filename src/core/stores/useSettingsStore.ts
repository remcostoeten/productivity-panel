"use client";

import { UserSettingsState } from "@/app/(dashboard)/dashboard/settings/types.settings";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserSettingsStore = create<UserSettingsState>()(
  persist(
    (set) => ({
      user: null,
      isLoaded: false,
      isSignedIn: false,
      formData: {
        firstName: "",
        lastName: "",
        username: "",
        bio: "",
      },
      settings: {
        showPreloader: false,
        darkMode: true,
        emailNotifications: false,
        twoFactorAuth: false,
        defaultRepoPrivate: false,
      },
      setUser: (user) => set({ user }),
      setIsLoaded: (isLoaded) => set({ isLoaded }),
      setIsSignedIn: (isSignedIn) => set({ isSignedIn }),
      updateFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),
      updateSettings: (settings) =>
        set((state) => ({ settings: { ...state.settings, ...settings } })),
      // Implement other actions here
    }),
    {
      name: "user-settings-storage",
      getStorage: () => localStorage,
    },
  ),
);
