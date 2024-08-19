"use client";

import { useState } from "react";

interface FancyCheckboxProps {
  label?: string;
  checkedColor?: string;
  uncheckedColor?: string;
  checkmarkColor?: string;
  size?: string;
  spread?: string;
}

const FancyCheckbox: React.FC<FancyCheckboxProps> = ({
  label,
  checkedColor = "green",
  uncheckedColor = "gray",
  checkmarkColor = "white",
  size = "1em",
  spread = "10px",
}) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <label className="container-fancy-check">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        style={{
          width: size,
          height: size,
        }}
      />
      <div
        className="checkmark"
        style={{
          backgroundColor: checked ? checkedColor : uncheckedColor,
          color: checkmarkColor,
          margin: spread,
        }}
      ></div>
      {label && <span>{label}</span>}
    </label>
  );
};

export default FancyCheckbox;
