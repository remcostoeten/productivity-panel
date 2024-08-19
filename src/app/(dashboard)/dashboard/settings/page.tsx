"use client";

import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import DangerZone from "./_components/DangerZone";
import { UserProfile } from "./_components/UserProfile";
import { useUserSettings } from "./_hooks/useUserSettings";
import UserPreferences from "./UserPreferences";

export default function SettingsPage() {
  const router = useRouter();
  const {
    user,
    isLoaded,
    isSignedIn,
    formData,
    settings,
    handleInputChange,
    handleToggle,
    handleSave,
    handleDeleteAccount,
  } = useUserSettings();

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0D1117] text-gray-300">
      <header className="flex justify-between items-center p-4 border-b border-gray-800">
        {/* Header content */}
      </header>
      <main className="max-w-3xl mx-auto mt-8 p-6">
        <UserProfile
          user={user}
          formData={formData}
          handleInputChange={handleInputChange}
        />
        <UserPreferences settings={settings} handleToggle={handleToggle} />
        <div className="flex justify-start space-x-4 mt-8">
          <Button
            variant="outline"
            className="bg-transparent text-gray-300 border-gray-600 hover:bg-gray-800"
            onClick={() => router.push("/")}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            Save
          </Button>
        </div>
        <DangerZone onDeleteAccount={handleDeleteAccount} />
      </main>
    </div>
  );
}
