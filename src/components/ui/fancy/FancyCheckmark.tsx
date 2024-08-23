"use client";

import { useState } from "react";
import { CheckmarkProps } from "./fancy.types";

export default function FancyCheckmark({
  size,
  color,
  checked: initialChecked,
}: CheckmarkProps): JSX.Element {
  const [checked, setChecked] = useState(initialChecked);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="fancy-checkmark">
      <label className="container">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <div className="checkmark">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            viewBox="0 0 512 512"
          >
            <title>Checkmark</title>
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M416 128L192 384l-96-96"
            ></path>
          </svg>
        </div>
      </label>
    </div>
  );
}
