import { UserResource } from "@clerk/types";
import { ChangeEvent } from "react";

export type UserProfileProps = {
  user: UserResource;
  formData: {
    firstName: string;
    lastName: string;
    username: string;
    bio: string;
  };
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

export type UserPreferencesProps = {
  settings: {
    showPreloader: boolean;
    darkMode: boolean;
    emailNotifications: boolean;
    twoFactorAuth: boolean;
    defaultRepoPrivate: boolean;
  };
  handleToggle: (name: string) => void;
};

export type DangerZoneProps = {
  onDeleteAccount: () => void;
};

export type UserSettingsState = {
  user: UserResource | null;
  isLoaded: boolean;
  isSignedIn: boolean;
  formData: {
    firstName: string;
    lastName: string;
    username: string;
    bio: string;
  };
  settings: {
    showPreloader: boolean;
    darkMode: boolean;
    emailNotifications: boolean;
    twoFactorAuth: boolean;
    defaultRepoPrivate: boolean;
  };
  setUser: (user: UserResource | null) => void;
  setIsLoaded: (isLoaded: boolean) => void;
  setIsSignedIn: (isSignedIn: boolean) => void;
  updateFormData: (data: Partial<UserSettingsState["formData"]>) => void;
  updateSettings: (settings: Partial<UserSettingsState["settings"]>) => void;
};
