"use client";

import { useState } from "react";
import { toast } from "sonner";
import { GetCustomColors } from "./tailwindColors";

const ColorShowcase: React.FC = () => {
  const colors = GetCustomColors();
  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(""), 2000);
    toast("Copied the color to clipboard!");
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {Object.entries(colors).map(([name, value]) => (
        <div
          key={name}
          className="border rounded-lg p-4 flex flex-col items-center"
        >
          <div className="w-16 h-16 mb-2" style={{ backgroundColor: value }} />
          <p className="text-sm font-semibold mb-2">{name}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => copyToClipboard(`text-${name}`)}
              className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
            >
              Copy text
            </button>
            <button
              onClick={() => copyToClipboard(`bg-${name}`)}
              className="px-2 py-1 bg-green-500 text-white rounded text-xs"
            >
              Copy bg
            </button>
          </div>
          {(copiedText === `text-${name}` || copiedText === `bg-${name}`) && (
            <p className="text-xs mt-2 text-gray-500">Copied: {copiedText}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ColorShowcase;
