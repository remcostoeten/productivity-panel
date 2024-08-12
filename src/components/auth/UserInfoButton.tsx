
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  ScrollArea,
} from "@c/ui";
import { UserIcon } from "lucide-react";

type User = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  isAdmin: boolean;
  lastSignIn: number | null;
  signInCount: number;
  profileImageUrl: string | null;
  emailVerified: boolean;
  createdAt: number;
  updatedAt: number;
};

// Define the position options
export enum ButtonPosition {
  TOP_LEFT = "TOP_LEFT",
  TOP_RIGHT = "TOP_RIGHT",
  BOTTOM_LEFT = "BOTTOM_LEFT",
  BOTTOM_RIGHT = "BOTTOM_RIGHT",
}

type UserInfoButtonProps = {
  user: User;
  position?: ButtonPosition;
};

export default function UserInfoButton({
  user,
  position = ButtonPosition.BOTTOM_RIGHT,
}: UserInfoButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case ButtonPosition.TOP_LEFT:
        return "top-4 left-4";
      case ButtonPosition.TOP_RIGHT:
        return "top-4 right-4";
      case ButtonPosition.BOTTOM_LEFT:
        return "bottom-4 left-4";
      case ButtonPosition.BOTTOM_RIGHT:
      default:
        return "bottom-4 right-4";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`fixed ${getPositionClasses()} rounded-full bg-gray-900 hover:bg-gray-800 text-gray-300 border-gray-700`}
        >
          <UserIcon className="h-4 w-4" />
          <span className="sr-only">User Info</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-950 text-gray-200 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-gray-100">User Information</DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-4 h-[60vh] rounded-md border border-gray-800 p-4">
          <div className="space-y-4">
            <InfoItem label="ID" value={user.id} />
            <InfoItem label="Email" value={user.email} />
            <InfoItem
              label="Name"
              value={
                `${user.firstName || ""} ${user.lastName || ""}`.trim() || "N/A"
              }
            />
            <InfoItem label="Admin" value={user.isAdmin ? "Yes" : "No"} />
            <InfoItem
              label="Last Sign In"
              value={
                user.lastSignIn
                  ? new Date(user.lastSignIn * 1000).toLocaleString()
                  : "Never"
              }
            />
            <InfoItem
              label="Sign In Count"
              value={user.signInCount.toString()}
            />
            <InfoItem
              label="Profile Image"
              value={user.profileImageUrl || "N/A"}
            />
            <InfoItem
              label="Email Verified"
              value={user.emailVerified ? "Yes" : "No"}
            />
            <InfoItem
              label="Created At"
              value={new Date(user.createdAt * 1000).toLocaleString()}
            />
            <InfoItem
              label="Updated At"
              value={new Date(user.updatedAt * 1000).toLocaleString()}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col space-y-1">
      <span className="text-sm font-medium text-gray-400">{label}</span>
      <span className="text-sm text-gray-300">{value}</span>
    </div>
  );
}
