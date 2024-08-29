"use client";

import { useState } from "react"; 

type ToggleSwitchProps = {
  onToggle: (isChecked: boolean) => void;
  label: string;
};

export default function ToggleSwitch({ onToggle, label }: ToggleSwitchProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onToggle(!isChecked);
  };

  return (
    <div className="toggle-switch__wrapper">
      <label className="toggle-switch__label">{label}</label>
      <input
        type="checkbox"
        className="toggle-switch__input"
        checked={isChecked}
        onChange={handleToggle}
      />
      <span className="toggle-switch__slider"></span>
    </div>
  );
}
