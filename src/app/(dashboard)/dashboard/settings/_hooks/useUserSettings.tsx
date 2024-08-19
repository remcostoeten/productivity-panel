"use client";

import { useUserSettingsStore } from "@/core/stores/useSettingsStore";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";

export function useUserSettings() {
  const { user, isLoaded, isSignedIn } = useUser();
  const clerk = useClerk();
  const router = useRouter();

  const {
    formData,
    settings,
    setUser,
    setIsLoaded,
    setIsSignedIn,
    updateFormData,
    updateSettings,
  } = useUserSettingsStore();

  useEffect(() => {
    setUser(user);
    setIsLoaded(isLoaded);
    setIsSignedIn(isSignedIn);
  }, [user, isLoaded, isSignedIn, setUser, setIsLoaded, setIsSignedIn]);

  useEffect(() => {
    if (user) {
      updateFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        bio: (user.publicMetadata.bio as string) || "",
      });
      updateSettings({
        showPreloader: (user.publicMetadata.showPreloader as boolean) || false,
        darkMode: (user.publicMetadata.darkMode as boolean) || true,
        emailNotifications:
          (user.publicMetadata.emailNotifications as boolean) || false,
        twoFactorAuth: (user.publicMetadata.twoFactorAuth as boolean) || false,
        defaultRepoPrivate:
          (user.publicMetadata.defaultRepoPrivate as boolean) || false,
      });
    }
  }, [user, updateFormData, updateSettings]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      updateFormData({ [name]: value });
    },
    [updateFormData],
  );

  const handleToggle = useCallback(
    (name: string) => {
      updateSettings({ [name]: !settings[name] });
    },
    [settings, updateSettings],
  );

  const handleSave = useCallback(async () => {
    if (!user) return;

    try {
      await user.update({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        unsafeMetadata: {
          ...user.unsafeMetadata,
          bio: formData.bio,
          ...settings,
        },
      });
      toast.success("Profile and settings updated successfully");
    } catch (error) {
      toast.error("Error updating profile and settings");
      console.error("Error updating profile and settings:", error);
    }
  }, [user, formData, settings]);

  const handleDeleteAccount = useCallback(async () => {
    toast(
      (t) => (
        <span>
          Are you sure you want to delete your account? This action cannot be
          undone.
          <br />
          <button
            onClick={() => {
              deleteAccount();
              toast.dismiss(t.id);
            }}
          >
            Yes, delete my account
          </button>
          <button onClick={() => toast.dismiss(t.id)}>Cancel</button>
        </span>
      ),
      { duration: Infinity },
    );
  }, []);

  const deleteAccount = useCallback(async () => {
    try {
      await user?.delete();
      toast.success("Account deleted successfully");
      router.push("/");
    } catch (error) {
      toast.error("Error deleting account");
      console.error("Error deleting account:", error);
    }
  }, [user, router]);

  return {
    user,
    isLoaded,
    isSignedIn,
    formData,
    settings,
    handleInputChange,
    handleToggle,
    handleSave,
    handleDeleteAccount,
  };
}
