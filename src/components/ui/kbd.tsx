"use client";

import React, { useEffect } from "react";
import { cn } from "@/core/helpers/cn";
import toast from "react-hot-toast";

type KbdProps = {
  variant?: "default" | "login" | "logout";
  className?: string;
  children?: React.ReactNode;
};

const ModernKbd = ({
  variant = "default",
  className,
  children,
  ...props
}: KbdProps) => {
  const baseClasses = [
    "grid place-content-center select-none text-nowrap font-medium text-xs px-4 py-2 tracking-tighter rounded-lg transition-all transform-gpu duration-100",
    "dark:text-neutral-300 text-neutral-800 bg-gradient-to-b dark:from-neutral-950 dark:to-neutral-950/65 from-neutral-200 to-neutral-200/50",
    "shadow-[0_1.5px_0.5px_1.5px_rgba(0,0,0,0.1),_0_0_0.5px_1px_rgba(0,0,0,0.25),_inset_0_1px_0.5px_0.5px_rgba(255,255,255,0.4),_inset_0_1px_1px_1px_rgba(255,255,255,0.8)]",
    "dark:shadow-[0_1.5px_0.5px_2.5px_rgba(0,0,0,0.4),_0_0_0.5px_1px_rgba(0,0,0,1),_inset_0_2px_1px_1px_rgba(0,0,0,0.25),_inset_0_1px_1px_1px_rgba(255,255,255,0.2)]",
    "dark:hover:shadow-[0_0_0_0_rgba(0,0,0,0),_0_0_0.5px_1px_rgba(0,0,0,1),_inset_0_2px_1px_1px_rgba(0,0,0,0.25),_inset_0_1px_1px_0_rgba(255,255,255,0.15)]",
    "hover:shadow-[0_0_0_0_rgba(0,0,0,0),_0_0_0.5px_1px_rgba(0,0,0,0.25),_inset_0_1px_0.5px_0.5px_rgba(255,255,255,0.4),_inset_0_1px_1px_1px_rgba(255,255,255,0.8)]",
    "active:shadow-[0_0_0_0_rgba(0,0,0,0),_0_0_1px_1px_rgba(0,0,0,0.15),_inset_0_1px_0.5px_0.5px_rgba(0,0,0,0.3),_inset_0_1.5px_1.5px_1.5px_rgba(255,255,255,0.6)]",
    "dark:active:shadow-[0_0_0_0_rgba(0,0,0,0),_0_0_1px_1px_rgba(0,0,0,1),_inset_0_2px_2px_1px_rgba(0,0,0,1),_inset_0_2px_2px_0_rgba(255,255,255,0.1)]",
  ];

  const variants = {
    default: "⌘ + Option + Shift + K",
    login: "⌘ / Ctrl + L",
    logout: "⌘ / Ctrl + O",
  };

  useEffect(() => {
    toast.success(`Shortcut: ${variants[variant]}`, {
      duration: 2000,
      position: "bottom-center",
    });
  }, [variant]);

  return (
    <kbd className={cn(baseClasses, className)} {...props}>
      {children || variants[variant]}
    </kbd>
  );
};

export { ModernKbd };
