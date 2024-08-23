"use client";

import { cn } from "@/core/helpers/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MenuItem({ icon: Icon, label, href, disabled }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={disabled ? "#" : href}
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-lg text-sm",
        isActive
          ? "bg-neutral-800 text-white"
          : "text-neutral-400 hover:bg-neutral-800 hover:text-white",
        disabled &&
          "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-neutral-400",
      )}
    >
      <Icon size={18} />
      {label}
      {disabled && (
        <span className="ml-auto text-xs text-neutral-500">Soon</span>
      )}
    </Link>
  );
}

export default MenuItem;
