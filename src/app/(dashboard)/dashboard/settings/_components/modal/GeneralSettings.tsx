"use client";

import { updatePreloaderPreference } from "@/core/server/server-actions/update-preloader-preference";
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@c/ui";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getUserPreloaderPreference } from "~/src/core/server/server-actions/get-user-preloader-preference.ts";
import {
  getUserNotificationPreference,
  updateNotificationPreference,
} from "~/src/core/server/server-actions/userActions";

export default function GeneralSettings() {
  const { user } = useUser();
  const [showPreloader, setShowPreloader] = useState(false);
  const [allowNotifications, setAllowNotifications] = useState(false);
  const [loadingPreferences, setLoadingPreferences] = useState(true);

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const [preloaderPreference, notificationPreference] = await Promise.all(
          [getUserPreloaderPreference(), getUserNotificationPreference()],
        );

        setShowPreloader(preloaderPreference);
        setAllowNotifications(notificationPreference);
      } catch (error) {
        console.error("Error fetching user preferences:", error);
        toast.error("Failed to load user preferences. Please try again later.");
      } finally {
        setLoadingPreferences(false);
      }
    };

    fetchUserPreferences();
  }, []);

  const handleLoaderToggle = async (isChecked: boolean) => {
    setShowPreloader(isChecked);
    try {
      await updatePreloaderPreference(isChecked);
      toast.success("Pre-loader preference updated");
    } catch (error) {
      toast.error("Failed to update pre-loader preference");
    }
  };

  const handleNotificationToggle = async (isChecked: boolean) => {
    setAllowNotifications(isChecked);
    try {
      await updateNotificationPreference(isChecked);
      toast.success("Notification preference updated");
    } catch (error) {
      toast.error("Failed to update notification preference");
    }
  };

  if (loadingPreferences) {
    return <div>Loading preferences...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Preferred Email</h2>
        <Input defaultValue={user?.primaryEmailAddress?.emailAddress || ""} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Animated Logo</h2>
        <p className="text-sm text-muted mb-4">
          The animated logo is displayed when navigating to a new page. You can
          choose to enable or disable this animation.
        </p>
        <div className="flex items-center justify-between">
          <Label htmlFor="show-preloader" className="text-sm font-medium">
            Show animated logo on page load
          </Label>
          <Switch
            id="show-preloader"
            checked={showPreloader}
            onCheckedChange={handleLoaderToggle}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Moments</h2>
        <Select defaultValue="default">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="View Moments in" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">default browser</SelectItem>
            <SelectItem value="chrome">Chrome</SelectItem>
            <SelectItem value="firefox">Firefox</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted mt-2">
          Not all mail apps support deep linking to a specific message, so Clay
          will open emails and events from Moments in your browser by default.{" "}
          <a href="#" className="text-primary">
            Learn more about email settings.
          </a>
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        <div className="flex items-start justify-between">
          <div className="text-sm text-muted pr-4">
            <p className="mb-2">Allow us to send you notifications for:</p>
            <ul className="list-disc list-inside">
              <li>Important updates or changes to your account</li>
              <li>Personal schedule updates</li>
            </ul>
          </div>
          <Switch
            id="allow-notifications"
            checked={allowNotifications}
            onCheckedChange={handleNotificationToggle}
          />
        </div>
      </div>
    </div>
  );
}
