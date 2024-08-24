"use client";

import { Button, Input, Textarea } from "@/components/ui";
import { useUser } from "@clerk/nextjs";
import { EditIcon, SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import {
  checkUsernameAvailability,
  getUserProfile,
  updateUserProfile,
} from "~/src/core/server/server-actions/userActions";
import DangerZone from "./_components/DangerZone";

const UserProfilePage = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    bio: "",
    dateOfBirth: "",
    profileImageUrl: "",
  });
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [isEditingBio, setIsEditingBio] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      startTransition(async () => {
        try {
          const profile = await getUserProfile();
          setFormData({
            firstName: profile.firstName ?? "",
            lastName: profile.lastName ?? "",
            username: profile.username ?? "",
            bio: profile.bio ?? "",
            dateOfBirth: profile.dateOfBirth
              ? new Date(profile.dateOfBirth * 1000).toISOString().split("T")[0]
              : "",
            profileImageUrl: profile.profileImageUrl ?? "",
          });
        } catch (error) {
          console.error("Error fetching user profile:", error);
          toast.error("Failed to load user profile");
        }
      });
    }
  }, [isLoaded, user]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "username") {
      startTransition(async () => {
        try {
          const available = await checkUsernameAvailability(value);
          setUsernameAvailable(available);
        } catch (error) {
          console.error("Error checking username availability:", error);
          toast.error("Failed to check username availability");
        }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!usernameAvailable) {
      toast.error("Username is not available");
      return;
    }

    try {
      console.log("Submitting form data:", formData); // Log form data
      const response = await updateUserProfile(formData);
      console.log("Update response:", response); // Log the response

      if (response.success) {
        // Update Clerk user profile
        if (user) {
          try {
            await user.update({
              firstName: formData.firstName,
              lastName: formData.lastName,
              username: formData.username,
              // Add any other fields you want to update in Clerk
            });
            toast.success(
              "Profile updated successfully in both database and Clerk",
            );
          } catch (error) {
            console.error("Error updating Clerk user:", error);
            toast.warning(
              "Profile updated in database, but Clerk changes may not be reflected immediately.",
            );
          }
        }
      } else {
        toast.error("Failed to update profile in database");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleBioEdit = () => setIsEditingBio(true);

  const handleBioSave = async () => {
    try {
      const response = await updateUserProfile({ bio: formData.bio });
      if (response.success) {
        setIsEditingBio(false);
        toast.success("Bio updated successfully");
      } else {
        toast.error("Failed to update bio");
      }
    } catch (error) {
      console.error("Error updating bio:", error);
      toast.error("Failed to update bio");
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {" "}
        {/* Corrected form submission */}
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={`mt-1 ${!usernameAvailable ? "border-error" : ""}`}
          />
          {isPending && (
            <p className="text-gray-500 text-sm mt-1">Checking username...</p>
          )}
          {!isPending && !usernameAvailable && (
            <p className="text-red-500 text-sm mt-1">
              This username is already taken.
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium text-gray-700"
          >
            Date of Birth
          </label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          {isEditingBio ? (
            <div className="mt-1 flex items-start">
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="flex-grow"
                rows={4}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleBioSave}
                className="ml-2 px-3 py-2"
              >
                <SaveIcon size={16} />
              </Button>
            </div>
          ) : (
            <div className="mt-1 flex items-start">
              <p className="flex-grow text-muted">
                {formData.bio || "No bio provided"}
              </p>
              <Button
                variant="outline"
                size="ghost"
                type="button"
                onClick={handleBioEdit}
                className="ml-2 px-3 py-2"
              >
                <EditIcon size={16} />
              </Button>
            </div>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Updating..." : "Update Profile"}
        </Button>
      </form>

      {/* Danger Zone */}
      <Suspense fallback={<div>Loading delete account section...</div>}>
        <DangerZone />
      </Suspense>
    </div>
  );
};

export default UserProfilePage;
