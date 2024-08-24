"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useUser } from "@clerk/nextjs";
import { Link, Settings, User } from "lucide-react";

export default function ProfileSettings() {
  const { user } = useUser(); // Retrieve user info from Clerk

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">
          YOUR PROFILE
        </h3>
        <div className="bg-muted p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={user?.imageUrl || "/placeholder.svg?height=60&width=60"}
              alt="User avatar"
              className="w-15 h-15 rounded-full"
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
              <User className="h-4 w-4" />
            </Button>
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
            defaultValue={`clay.earth/profile/${user?.username || "your-username"}`}
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
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">
          SUBSCRIPTION PLAN
        </h3>
        <div className="bg-muted p-4 rounded-lg flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                PERS
              </div>
              <h4 className="font-semibold">Clay Personal</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              127 of 1,000 contacts used
            </p>
          </div>
          <Button variant="secondary">Manage Plan</Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">
          SWITCH PLAN
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline">Teams</Button>
          <Button variant="outline">Pro</Button>
        </div>
      </div>
    </div>
  );
}
