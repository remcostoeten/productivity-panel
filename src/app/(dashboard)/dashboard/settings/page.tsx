"use client";
import { Input, Textarea } from "@/components/ui";
import { checkUsernameAvailability } from "@/core/server/server-actions/userActions";
import { useEffect, useState } from "react";

type UserResource = {
  username: string;
};

type UserProfileProps = {
  user: UserResource;
  formData: {
    firstName: string;
    lastName: string;
    username: string;
    bio: string;
    dateOfBirth: string; // Added dateOfBirth to match the form
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

export default function UserProfile({
  user,
  formData,
  handleInputChange,
}: UserProfileProps) {
  const [usernameAvailable, setUsernameAvailable] = useState(true);

  useEffect(() => {
    const checkUsername = async () => {
      if (formData.username && formData.username !== user.username) {
        const available = await checkUsernameAvailability(formData.username);
        setUsernameAvailable(available);
      } else {
        setUsernameAvailable(true);
      }
    };
    checkUsername();
  }, [formData.username, user.username]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Profile Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-300"
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
            className="block text-sm font-medium text-gray-300"
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
      </div>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-300"
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
        {!usernameAvailable && (
          <p className="text-error text-sm mt-1">
            This username is already taken.
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="dateOfBirth"
          className="block text-sm font-medium text-gray-300"
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
          className="block text-sm font-medium text-gray-300"
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
    </div>
  );
}
