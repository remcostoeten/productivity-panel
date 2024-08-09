"use client";

import { useState } from "react";

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
  const sizeClass = sizeClassMap[size] || "";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={`native-switch ${sizeClass} ${className}`}>
      <input
        type="checkbox"
        id="switch"
        checked={isChecked}
        onChange={handleChange}
        {...props}
      />
      <label htmlFor="switch">Toggle</label>
    </div>
  );
}
