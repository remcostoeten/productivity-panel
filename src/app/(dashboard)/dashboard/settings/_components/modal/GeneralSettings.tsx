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

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const preloaderPreference = await getUserPreloaderPreference();
        setShowPreloader(preloaderPreference);

        const notificationPreference = await getUserNotificationPreference();
        setAllowNotifications(notificationPreference);
      } catch (error) {
        console.error("Error fetching user preferences:", error);
        toast.error("Failed to load user preferences");
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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">
          PREFERRED EMAIL
        </h3>
        <Input defaultValue={user?.primaryEmailAddress?.emailAddress || ""} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">
          Disable the page brand loader animation which shows when you navigate
          to a new page.
        </h3>
        <div className="flex items-center justify-between text-muted">
          <Label htmlFor="show-preloader">Show page loader</Label>
          <Switch
            id="show-preloader"
            checked={showPreloader}
            onCheckedChange={handleLoaderToggle}
          />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">
          MOMENTS
        </h3>
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
        <p className="text-sm text-muted-foreground mt-2">
          Not all mail apps support deep linking to a specific message, so Clay
          will open emails and events from Moments in your browser by default.{" "}
          <a href="#" className="text-primary">
            Learn more about email settings.
          </a>
        </p>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">
          NOTIFICATIONS
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground pr-3">
              Allow us to send you notifications when there are important
              updates or changes to your account. Also personal schedule
              updates.
            </p>
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
