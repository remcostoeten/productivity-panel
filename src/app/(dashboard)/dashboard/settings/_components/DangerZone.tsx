import { Button } from "@/components/ui/button";
import { DangerZoneProps } from "../types.settings";

export default function DangerZone({ onDeleteAccount }: DangerZoneProps) {
  return (
    <div className="mt-12 pt-6 border-t border-gray-800">
      <h3 className="text-lg font-semibold text-error mb-4">Danger Zone</h3>
      <p className="text-sm text-gray-400 mb-4">
        Permanently delete your BaseHub account and associated user data. This
        action can't be undone.
      </p>
      <Button
        onClick={onDeleteAccount}
        variant="destructive"
        className="bg-red-600 text-white hover:bg-red-700"
      >
        Delete BaseHub Account
      </Button>
    </div>
  );
}
