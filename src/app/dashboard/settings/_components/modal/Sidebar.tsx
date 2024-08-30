"use client";

import Flex from "@/components/atoms/Flex";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  Bell,
  Home,
  Info,
  Moon,
  Settings,
  Sliders,
  User,
  Users2,
  X,
} from "lucide-react";
import { useSettings } from "./SettingsModal";

const menuItems = [
  { icon: Settings, label: "General" },
  { icon: User, label: "Profile" },
  { icon: Home, label: "Home" },
  { icon: Bell, label: "Notifications" },
  { icon: Moon, label: "Appearance" },
  { icon: Info, label: "About" },
  { label: "WORKSPACE", header: true },
  { icon: Sliders, label: "Preferences" },
  { icon: Users2, label: "Members" },
];

export default function Sidebar() {
  const { activeMenu, setActiveMenu } = useSettings();
  const { user } = useUser();
  const clerk = useClerk();

  const handleSignOut = async () => {
    await clerk.signOut();
  };

  return (
    <div className="w-64 bg-dark-section p-4 flex flex-col border-r border-input">
      <Flex dir="col" gap={4}>
        <Flex gap={3} items="center">
          <img
            src={user?.imageUrl || "/placeholder.svg?height=40&width=40"}
            alt="User avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="overflow-hidden">
            <h2 className="font-semibold truncate">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-sm text-muted-foreground break-words">
              {user?.primaryEmailAddress?.emailAddress || "No email available"}
            </p>
          </div>
        </Flex>
      </Flex>
      <nav className="flex-1 mt-6">
        {menuItems.map((item, index) =>
          item.header ? (
            <h3
              key={index}
              className="text-xs font-semibold text-muted-foreground mt-4 mb-2"
            >
              {item.label}
            </h3>
          ) : (
            <button
              key={index}
              className={`flex items-center transition-all duration-300 w-full px-2 py-1.5 mb-1 rounded-md ${
                activeMenu === item.label
                  ? "bg-dark-section--lighter hover:border-input border border-transparent text-accent-foreground"
                  : "hover:bg-dark-section--lighter hover:border-input border border-transparent text-muted-foreground"
              }`}
              onClick={() => setActiveMenu(item.label)}
            >
              {item.icon && <item.icon className="w-5 h-5 mr-3" />}
              {item.label}
            </button>
          ),
        )}
      </nav>
      <button
        className="flex items-center text-destructive hover:text-destructive/80 mt-4"
        onClick={handleSignOut}
      >
        <X className="w-5 h-5 mr-2" />
        SIGN OUT
      </button>
    </div>
  );
}
