// 
// import {
  Button
} from '@/components/ui/';
import { DangerZoneProps } from "../types.settings";

// export default function DangerZone({ onDeleteAccount }: DangerZoneProps) {
//   return (
//     <div className="mt-12 pt-6 border-t border-gray-800">
//       <h3 className="text-lg font-semibold text-error mb-4">Danger Zone</h3>
//       <p className="text-sm text-gray-400 mb-4">
//         Permanently delete your BaseHub account and associated user data. This
//         action can't be undone.
//       </p>
//       <Button
//         onClick={onDeleteAccount}
//         variant="destructive"
//         className="bg-red-600 text-white hover:bg-red-700"
//       >
//         Delete BaseHub Account
//       </Button>
//     </div>
//   );
// }
"use client";

import { Button } from "@/components/ui";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteUserAccount } from "~/src/core/server/server-actions/userActions";

const DeleteAccountSection = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (!user) return;

    setIsDeleting(true);
    try {
      await deleteUserAccount();
      toast.success("Account deleted successfully");
      await user.delete();
      router.push("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mt-12 border-t-2 border-red-500 pt-4">
      <h2 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h2>
      <div className="bg-red-100 border border-red-400 rounded p-4">
        <h3 className="font-semibold text-red-800 mb-2">Delete Account</h3>
        <p className="text-red-700 mb-4">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        {!isConfirming ? (
          <Button
            type="button"
            onClick={() => setIsConfirming(true)}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Delete Account
          </Button>
        ) : (
          <div className="space-y-2">
            <p className="font-bold text-red-800">
              Are you sure you want to delete your account?
            </p>
            <div className="flex space-x-2">
              <Button
                type="button"
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete My Account"}
              </Button>
              <Button
                type="button"
                onClick={() => setIsConfirming(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteAccountSection;
