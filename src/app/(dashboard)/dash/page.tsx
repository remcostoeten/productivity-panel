"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/core/helpers/cn";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  BellIcon,
  BookOpenIcon,
  CalendarIcon,
  CheckSquareIcon,
  CreditCardIcon,
  FolderIcon,
  HeartIcon,
  HelpCircleIcon,
  HomeIcon,
  LockIcon,
  MessageCircleIcon,
  MoonIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { icon: PlusIcon, label: "Add", href: "/add" },
  { icon: FolderIcon, label: "Files", href: "/files" },
  { icon: HomeIcon, label: "Home", href: "/" },
  { icon: SearchIcon, label: "Search", href: "/search" },
  { icon: MessageCircleIcon, label: "Messages", href: "/messages" },
  { icon: BellIcon, label: "Notifications", href: "/notifications" },
];

const menuItems = [
  { icon: HomeIcon, label: "Dashboard", href: "/dashboard" },
  { icon: HeartIcon, label: "Wishlist", href: "/wishlist" },
  { icon: BookOpenIcon, label: "Notes", href: "/notes" },
  { icon: LockIcon, label: "Vault", href: "/vault", disabled: true },
  { icon: CalendarIcon, label: "Agenda", href: "/agenda", disabled: true },
  { icon: CheckSquareIcon, label: "Todo", href: "/todo", disabled: true },
];

const accountItems = [
  { icon: UserIcon, label: "My account", href: "/account" },
  { icon: CreditCardIcon, label: "Billing", href: "/billing" },
  { icon: SettingsIcon, label: "Settings", href: "/settings" },
];

const bottomItems = [
  { icon: MoonIcon, label: "Appearance", href: "/appearance" },
  { icon: HelpCircleIcon, label: "Help", href: "/help" },
];

function MenuItem({
  icon,
  label,
  href,
  disabled,
  key,
}: {
  icon: any;
  label: string;
  href: string;
  disabled?: boolean;
  key: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={disabled ? "#" : href}
      key={key}
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-lg text-sm",
        isActive
          ? "bg-neutral-800 text-white"
          : "text-neutral-400 hover:bg-neutral-800 hover:text-white",
        disabled &&
          "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-neutral-400",
      )}
    >
      <icon size={18} />
      {label}
      {disabled && (
        <span className="ml-auto text-xs text-neutral-500">Soon</span>
      )}
    </Link>
  );
}

export default function SidebarWithAside() {
  const { user } = useUser();

  return (
    <div className="flex h-screen bg-[#0D0D0C] text-white">
      {/* Narrow Sidebar */}
      <aside className="w-16 flex flex-col items-center py-4 bg-[#0D0D0C] border-r border-[#1A1A1A]">
        <div className="mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-[#FF4800] to-[#FF6C00] rounded-lg flex items-center justify-center text-white font-bold text-xl">
            Z
          </div>
        </div>
        <nav className="flex flex-col items-center gap-6">
          {sidebarItems.map((item, index) => (
            <Button
              key={index}
              variant="iconTooltip"
              size="icon"
              className="bg-[#1A1A1A] text-[#646464] hover:bg-[#252525] hover:text-white"
              tooltipContent={item.label}
            >
              <item.icon size={20} />
            </Button>
          ))}
        </nav>
      </aside>

      {/* Wider Aside */}
      <aside className="w-64 bg-[#0D0D0C] p-4">
        <div className="flex items-center gap-3 mb-6">
          <UserButton />
          <div>
            <p className="font-semibold text-sm text-white">{user?.fullName}</p>
            <p className="text-xs text-[#646464]">{user?.username}</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-white">Saas and Home</h2>

        <div className="mb-6">
          <div className="relative">
            <SearchIcon
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#646464]"
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-[#1A1A1A] rounded-lg pl-10 pr-3 py-2 text-sm text-[#646464] placeholder-[#646464] focus:outline-none focus:ring-1 focus:ring-[#252525]"
            />
          </div>
        </div>

        <nav className="space-y-1 mb-6">
          <p className="text-xs text-[#646464] uppercase mb-2 px-4">
            Main Menu
          </p>
          {menuItems.map((item) => (
            <MenuItem key={item.href} {...item} />
          ))}
        </nav>

        <nav className="space-y-1 mb-6">
          <p className="text-xs text-[#646464] uppercase mb-2 px-4">Account</p>
          {accountItems.map((item) => (
            <MenuItem key={item.href} {...item} />
          ))}
        </nav>

        <hr className="border-[#252525] my-4" />

        <nav className="space-y-1">
          {bottomItems.map((item) => (
            <MenuItem key={item.href} {...item} />
          ))}
        </nav>
      </aside>
    </div>
  );
}
