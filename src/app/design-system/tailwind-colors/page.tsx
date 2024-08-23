"use client";

import toast from "react-hot-toast";
import { DesignSystemWrapper } from "../_components/DesignSystemWrapper";
import { GetCustomColors } from "../_components/TwColorUtil";

function ColorShowcase() {
  const colors = GetCustomColors();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${text} to clipboard!`);
  };

  return (
    <DesignSystemWrapper
      title="Tailwind config colors"
      description="Every (custom) tailwind property in this repository is shown here.."
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {Object.entries(colors).map(([name, value]) => (
          <div key={name} className="rounded-lg p-4 flex flex-col items-center">
            <div
              className="w-16 border border-muted/40 h-16 mb-2"
              style={{ backgroundColor: value }}
            />
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
          </div>
        ))}
      </div>
    </DesignSystemWrapper>
  );
}

export default ColorShowcase;
