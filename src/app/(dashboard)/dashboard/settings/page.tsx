"use client";

import { Button, Input, Textarea } from "@/components/ui";
import {
  checkUsernameAvailability,
  updateUserProfile,
} from "@/core/server/server-actions/userActions";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type FormData = {
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  dateOfBirth: string;
};

export default function UserProfilePage() {
  const { user } = useUser();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    username: "",
    bio: "",
    dateOfBirth: "",
  });
  const [usernameAvailable, setUsernameAvailable] = useState(true);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        username: user.username ?? "",
        bio: (user.publicMetadata.bio as string) ?? "",
        dateOfBirth: (user.publicMetadata.dateOfBirth as string) ?? "",
      });
    }
  }, [user]);

  useEffect(() => {
    const checkUsername = async () => {
      if (formData.username && formData.username !== user?.username) {
        const available = await checkUsernameAvailability(formData.username);
        setUsernameAvailable(available);
      } else {
        setUsernameAvailable(true);
      }
    };
    checkUsername();
  }, [formData.username, user?.username]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameAvailable) {
      toast.error("Username is not available");
      return;
    }
    try {
      await updateUserProfile(formData);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            className={`mt-1 ${!usernameAvailable ? "border-red-500" : ""}`}
          />
          {!usernameAvailable && (
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
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="mt-1"
            rows={4}
          />
        </div>
        <Button type="submit" className="w-full">
          Update Profile
        </Button>
      </form>
    </div>
  );
}
