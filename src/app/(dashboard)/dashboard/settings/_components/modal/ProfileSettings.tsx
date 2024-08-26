"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { updateUserProfile } from "@/core/server/server-actions/userActions";
import { useUser } from "@clerk/nextjs";
import { Link, Settings } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfileSettings() {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    bio: "", // Add this field to your user schema if not already present
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Update the database
      await updateUserProfile(formData);

      // Update the Clerk user
      if (user) {
        await user.update({
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
        });
      }

      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">
          YOUR PROFILE
        </h3>
        <div className="bg-dark-section--lighter border border-seperator p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              width={44}
              height={44}
              src={user?.imageUrl || "/placeholder.svg?height=60&width=60"}
              alt="User avatar"
              className="rounded-full"
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
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                  <Button type="submit">Save Changes</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      {/* Rest of your component remains the same */}
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
