"use client";

import { updatePreloaderPreference } from "@/core/server/server-actions/update-preloader-preference";
import { useState, useTransition } from "react";

interface NativeSwitchProps {
  size?: "xs" | "s" | "m" | "l" | "xl";
  defaultChecked?: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
  [key: string]: any;
}

const sizeClassMap = {
  xs: "extra-small",
  s: "small",
  m: "medium",
  l: "large",
  xl: "extra-large",
};

export default function NativeSwitch({
  size = "m",
  defaultChecked = false,
  onChange,
  className = "",
  ...props
}: NativeSwitchProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const [isPending, startTransition] = useTransition();
  const sizeClass = sizeClassMap[size] || "";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setIsChecked(newValue);
    onChange?.(newValue);

    startTransition(async () => {
      try {
        await updatePreloaderPreference(newValue);
      } catch (error) {
        console.error("Failed to update preloader preference:", error);
        // Optionally, revert the switch state here
        setIsChecked(!newValue);
      }
    });
  };

  return (
    <div
      className={`native-switch ${sizeClass} ${className} ${isPending ? "opacity-50" : ""}`}
    >
      <input
        type="checkbox"
        id="switch"
        checked={isChecked}
        onChange={handleChange}
        disabled={isPending}
        {...props}
      />
      <label className="border-input border border-1" htmlFor="switch">
        Toggle
      </label>
    </div>
  );
}
