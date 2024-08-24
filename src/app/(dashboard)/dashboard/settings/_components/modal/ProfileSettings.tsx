"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useUser } from "@clerk/nextjs";
import { Link, Settings } from "lucide-react";

export default function ProfileSettings() {
  const { user } = useUser(); // Retrieve user info from Clerk

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">
          YOUR PROFILE
        </h3>
        <div className="bg-dark-section--lighter border border-seperator p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={user?.imageUrl || "/placeholder.svg?height=60&width=60"}
              alt="User avatar"
              className="w-4 h-4 rounded-full"
            />
            <div>
              <h4 className="font-semibold">
                {user?.firstName} {user?.lastName}
              </h4>
              <p className="text-sm text-muted-foreground">
                {user?.username || "CLAY"}
              </p>
            </div>
          </div>
          <div className="space-x-2">
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">
          PUBLIC PROFILE
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="public-profile">Enable Public Profile</Label>
            <p className="text-sm text-muted-foreground">
              Enable your public profile and share it with anyone inside and
              outside of Clay.
              <a href="#" className="text-primary">
                Learn more.
              </a>
            </p>
          </div>
          <Switch id="public-profile" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">
          PROFILE URL
        </h3>
        <div className="flex items-center space-x-2">
          <Input
            defaultValue={`/profile/${user?.username || "your-username"}`}
            className="flex-1"
          />
          <Button variant="ghost" size="icon">
            <Link className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Set a custom URL for your public profile.{" "}
          <a href="#" className="text-primary">
            Learn more.
          </a>
        </p>
      </div>
    </div>
  );
}
