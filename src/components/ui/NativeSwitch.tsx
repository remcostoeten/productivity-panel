'use client';

import { useState } from 'react';

interface NativeSwitchProps {
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  defaultChecked?: boolean;
  onChange?: (value: boolean) => void;
}

const sizeClassMap = {
  xs: 'extra-small',
  s: 'small',
  m: 'medium',
  l: 'large',
  xl: 'extra-large',
};

export default function NativeSwitch({
  size = 'm',
  defaultChecked = false,
  onChange,
}: NativeSwitchProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const sizeClass = sizeClassMap[size] || '';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={`native-switch ${sizeClass}`}>
      <input
        type="checkbox"
        id="switch"
        checked={isChecked}
        onChange={handleChange}
      />
      <label htmlFor="switch">Toggle</label>
    </div>
  );
}
