"use client";

import NativeSwitch from "@/components/ui/NativeSwitch";
import { updatePreloaderPreference } from "@/core/server/server-actions/update-preloader-preference";
import { Label } from "@c/ui";
import toast from "react-hot-toast";
import { UserPreferencesProps } from "./types.settings";

export default function UserPreferences({
  settings,
  handleToggle,
}: UserPreferencesProps) {
  const handleToggleWithServerUpdate = async (name: keyof typeof settings) => {
    const newValue = !settings[name];
    handleToggle(name);
    if (name === "showPreloader") {
      try {
        await updatePreloaderPreference(newValue);
        toast.success("Pre-loader preference updated");
      } catch (error) {
        toast.error("Failed to update pre-loader preference");
      }
    }
  };

  return (
    <div className="space-y-4 mt-8">
      <h3 className="text-lg font-semibold">Preferences</h3>

      <div className="flex items-center justify-between">
        <Label htmlFor="showPreloader">Show Pre-loader</Label>
        <NativeSwitch
          id="showPreloader"
          defaultChecked={settings.showPreloader}
          onChange={() => handleToggleWithServerUpdate("showPreloader")}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="darkMode">Dark Mode</Label>
        <NativeSwitch
          id="darkMode"
          defaultChecked={settings.darkMode}
          onChange={() => handleToggle("darkMode")}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="emailNotifications">Email Notifications</Label>
        <NativeSwitch
          id="emailNotifications"
          defaultChecked={settings.emailNotifications}
          onChange={() => handleToggle("emailNotifications")}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
        <NativeSwitch
          id="twoFactorAuth"
          defaultChecked={settings.twoFactorAuth}
          onChange={() => handleToggle("twoFactorAuth")}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="defaultRepoPrivate">
          Default New Repositories to Private
        </Label>
        <NativeSwitch
          id="defaultRepoPrivate"
          defaultChecked={settings.defaultRepoPrivate}
          onChange={() => handleToggle("defaultRepoPrivate")}
        />
      </div>
    </div>
  );
}
