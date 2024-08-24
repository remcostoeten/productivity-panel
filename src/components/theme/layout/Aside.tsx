"use client";

import {
  accountItems,
  bottomItems,
  menuItems,
} from "@/core/data/dashboard-menu-items";
import { UserButton, useUser } from "@clerk/nextjs";
import { SearchIcon } from "lucide-react";
import MenuItem from "./MenuItem";

export default function Aside() {
  const { user } = useUser();

  return (
    <aside className="w-64 bg-[#0D0D0C] p-4">
      <div className="flex items-center gap-3 mb-6">
        <UserButton />
        <div>
          <p className="font-semibold text-sm text-white">
            {user?.fullName || "Welsonia granz"}
          </p>
          <p className="text-xs text-[#646464]">{user?.username}</p>
        </div>
      </div>

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
        <p className="text-xs text-[#646464] uppercase mb-2 px-4">Main Menu</p>
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
  );
}
