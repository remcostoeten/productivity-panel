import { Input, Label, Textarea } from "@/components/ui";
import { useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { UserProfileProps } from "../types.settings";

export function UserProfile({
  user,
  formData,
  handleInputChange,
}: UserProfileProps) {
  const clerk = useClerk();

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-8 mb-8">
        <div>
          <Image
            src={user.imageUrl}
            alt="User avatar"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">
            {user.firstName} {user.lastName}
          </h2>
          <button
            onClick={() => clerk.user?.setProfileImage({ file: null })}
            className="text-sm text-gray-400 hover:text-white"
          >
            Change Avatar
          </button>
          <button
            onClick={() => clerk.user?.setProfileImage(null)}
            className="text-sm text-gray-400 hover:text-white ml-4"
          >
            Remove Avatar
          </button>
        </div>
      </div>

      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className="mt-1 bg-[#161B22] border-gray-800"
        />
      </div>

      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className="mt-1 bg-[#161B22] border-gray-800"
        />
      </div>

      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className="mt-1 bg-[#161B22] border-gray-800"
        />
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          className="mt-1 bg-[#161B22] border-gray-800"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <div className="flex items-center mt-1">
          <Input
            id="email"
            name="email"
            value={user.primaryEmailAddress?.emailAddress || ""}
            className="bg-[#161B22] border-gray-800 flex-grow"
            disabled
          />
          <button
            onClick={() => clerk.openUserProfile()}
            className="ml-2 text-gray-400 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
