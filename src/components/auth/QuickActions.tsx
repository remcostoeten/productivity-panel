"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getUserProfile } from "@/core/server/server-actions/userActions";
import { SettingsIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import SettingsModal from "~/src/app/(dashboard)/dashboard/settings/_components/modal/SettingsModal";
import type { UserProfile } from "~/src/core/types/user-profile.types";

export default function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const profile = await getUserProfile();
      if (!profile) {
        console.error("User profile not found");
        return;
      }
      setUserProfile(profile);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
    fetchUserProfile();
  };

  return (
    <>
      <Button
        className="fixed bottom-16 size-[40px] bg-input right-4  border border-orange-700/20 rounded-full hover:bg-muted/70 p-3"
        onClick={() => setIsSettingsOpen(true)}
      >
        <SettingsIcon className="h-6 w-6 text-white" />
      </Button>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <Button
        className="fixed bottom-4 size-[40px] bg-input right-4  border border-orange-700/20 rounded-full hover:bg-muted/70 p-3"
        onClick={handleOpenModal}
      >
        <UserIcon className="h-6 w-6 text-white" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Information</DialogTitle>
            <DialogDescription>
              Here's the information we have on file for you.
            </DialogDescription>
          </DialogHeader>
          {userProfile ? (
            <div className="mt-4 space-y-4">
              <div>
                <strong>Name:</strong> {userProfile.firstName}{" "}
                {userProfile.lastName}
              </div>
              <div>
                <strong>Email:</strong> {userProfile.email}
              </div>
              <div>
                <strong>Admin:</strong> {userProfile.isAdmin ? "Yes" : "No"}
              </div>
              <div>
                <strong>Last Sign In:</strong>{" "}
                {userProfile.lastSignIn
                  ? new Date(userProfile.lastSignIn * 1000).toLocaleString()
                  : "Never"}
              </div>
              <div>
                <strong>Sign In Count:</strong> {userProfile.signInCount}
              </div>
              <div>
                <strong>Email Verified:</strong>{" "}
                {userProfile.emailVerified ? "Yes" : "No"}
              </div>
              <div>
                <strong>Account Created:</strong>{" "}
                {new Date(userProfile.createdAt * 1000).toLocaleString()}
              </div>
              {userProfile.profileImageUrl && (
                <div>
                  <strong>Profile Image:</strong>
                  <img
                    src={userProfile.profileImageUrl}
                    alt="Profile"
                    className="mt-2 h-20 w-20 rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="mt-4 text-center">Loading user information...</div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
