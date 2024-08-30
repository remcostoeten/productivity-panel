"use client";
import {
  Button, Dialog, DialogContent, DialogHeader, DialogTitle
} from '@/components/ui/';
import DangerZone from "@/app/dashboard/settings/_components/DangerZone";
import { useUserSettings } from "@/app/dashboard/settings/_hooks/useUserSettings";
import UserPreferences from "@/app/dashboard/settings/UserPreferences";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OldSettingsModal({ isOpen, onClose }: SettingsModalProps) {
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
    return null;
  }

  const handleSaveAndClose = () => {
    handleSave();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1C2128] border-gray-700 text-gray-300 max-w-3xl">
        <DialogHeader>
          <DialogTitle>Users Settings</DialogTitle>
        </DialogHeader>
        <div className="mt-4">

          <UserPreferences settings={settings} handleToggle={handleToggle} />
          <div className="flex justify-start space-x-4 mt-8">
            <Button
              variant="outline"
              className="bg-transparent text-gray-300 border-gray-600 hover:bg-gray-800"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveAndClose}
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              Save
            </Button>
          </div>
          <DangerZone onDeleteAccount={handleDeleteAccount} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
