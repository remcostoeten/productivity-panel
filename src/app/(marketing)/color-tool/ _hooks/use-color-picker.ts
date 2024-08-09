"use client";

import { useCallback, useState } from "react";

export const useColorPicker = () => {
  const [color, setColor] = useState<string | null>(null);
  const [pickingColor, setPickingColor] = useState(false);
  const [hoverColor, setHoverColor] = useState("rgba(0, 0, 0, 0.5)");
  const [cursorScale, setCursorScale] = useState(1);

  const generateColorName = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (r === g && g === b) {
      return r === 255
        ? "white"
        : r === 0
          ? "black"
          : `gray-${Math.round(r / 25.5)}`;
    }
    const hue = rgbToHsl(r, g, b)[0];
    const hueNames = ["red", "orange", "yellow", "green", "blue", "purple"];
    return hueNames[Math.floor(hue / 60)] || "";
  };

  const rgbToHsl = (
    r: number,
    g: number,
    b: number,
  ): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  };

  const handleColorPick = useCallback((pickedColor: string) => {
    const cssVarName = `--picker-${generateColorName(pickedColor)}`;
    setColor(pickedColor);
    return { color: pickedColor, cssVar: cssVarName };
  }, []);

  const handleMouseMove = useCallback((pixelData: Uint8ClampedArray) => {
    const hoverColor = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
    setHoverColor(hoverColor);
  }, []);

  const handleScroll = useCallback((delta: number) => {
    setCursorScale((prevScale) =>
      Math.max(0.5, Math.min(2, prevScale + delta * 0.1)),
    );
  }, []);

  return {
    color,
    pickingColor,
    setPickingColor,
    hoverColor,
    cursorScale,
    handleColorPick,
    handleMouseMove,
    handleScroll,
  };
};
