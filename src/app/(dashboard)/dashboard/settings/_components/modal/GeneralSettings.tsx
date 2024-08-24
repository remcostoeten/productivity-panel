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

export default function GeneralSettings() {
  const { user } = useUser();
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    const fetchUserPreference = async () => {
      try {
        const preference = await getUserPreloaderPreference();
        setShowPreloader(preference);
      } catch (error) {
        console.error("Error fetching user preference:", error);
        toast.error("Failed to load user preference");
      }
    };
    fetchUserPreference();
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

  return (
    <div className="space-y-6 ">
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">
          PREFERRED EMAIL
        </h3>
        <Input defaultValue={user?.primaryEmailAddress?.emailAddress || ""} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 ">
          Disable the page brand loader animation which shows when you navigate
          to a new page.
        </h3>
        <div className="flex items-center justify-between text-muted">
          <Label htmlFor="notes">Show page loader</Label>
          <Switch
            id="notes"
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
          MERGING
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="resolve-duplicates">Resolve Duplicates</Label>
            <p className="text-sm text-muted-foreground">
              This enables intelligent contact deduplication and merges your
              duplicate contacts across all your Clay integrations. It is turned
              on by default.
            </p>
          </div>
          <Switch id="resolve-duplicates" defaultChecked />
        </div>
      </div>
    </div>
  );
}
