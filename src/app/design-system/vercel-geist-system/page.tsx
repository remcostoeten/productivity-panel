"use client";

import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from '@/components/ui/';
import { Button } from "@/components/ui";

import { useState } from "react";
import { DesignSystemWrapper } from "../_components/DesignSystemWrapper";

export default function GeistSystem() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000); // Reset copied state after 2 seconds
  };

  const colors = [
    { label: "Success Lighter", value: "#d3e5ff" },
    { label: "Success Light", value: "#3291ff" },
    { label: "Success", value: "#0070f3" },
    { label: "Success Dark", value: "#0761d1" },
    { label: "Error Lighter", value: "#f7d4d6" },
    { label: "Error Light", value: "#ff1a1a" },
    { label: "Error", value: "#e00" },
    { label: "Error Dark", value: "#c50000" },
    { label: "Warning Lighter", value: "#ffefcf" },
    { label: "Warning Light", value: "#f7b955" },
    { label: "Warning", value: "#f5a623" },
    { label: "Warning Dark", value: "#ab570a" },
    { label: "Violet Lighter", value: "#d8ccf1" },
    { label: "Violet Light", value: "#8a63d2" },
    { label: "Violet", value: "#7928ca" },
    { label: "Violet Dark", value: "#4c2889" },
    { label: "Violet Background", value: "#fff" },
    { label: "Violet Background Secondary", value: "#291c3a" },
    { label: "Violet Background Tertiary", value: "#eae5f4" },
    { label: "Background RGB", value: "rgb(255, 255, 255)" },
    { label: "Foreground RGB", value: "rgb(0, 0, 0)" },
    { label: "Console Header", value: "#efe7ed" },
    { label: "Console Purple", value: "#7928ca" },
    { label: "Console Text Default", value: "#000" },
    { label: "Console Text Blue", value: "#0070f3" },
    { label: "Console Text Pink", value: "#eb367f" },
    { label: "Console Text Purple", value: "#7928ca" },
    { label: "Cyan Lighter", value: "#aaffec" },
    { label: "Cyan Light", value: "#79ffe1" },
    { label: "Cyan", value: "#50e3c2" },
    { label: "Cyan Dark", value: "#29bc9b" },
    { label: "Highlight Purple", value: "#f81ce5" },
    { label: "Highlight Magenta", value: "#eb367f" },
    { label: "Highlight Pink", value: "#ff0080" },
    { label: "Highlight Yellow", value: "#fff500" },
    { label: "Foreground", value: "#000" },
    { label: "Background", value: "#fff" },
    { label: "Selection", value: "#003366" },
    { label: "Selection Text Color", value: "#fff" },
    { label: "Accents 1", value: "#fafafa" },
    { label: "Accents 2", value: "#eaeaea" },
    { label: "Accents 3", value: "#999" },
    { label: "Accents 4", value: "#888" },
    { label: "Accents 5", value: "#666" },
    { label: "Accents 6", value: "#444" },
    { label: "Accents 7", value: "#333" },
    { label: "Accents 8", value: "#111" },
    { label: "Link Color", value: "#0070f3" },
    { label: "Marketing Gray", value: "#fafbfc" },
    { label: "Code", value: "#000" },
    { label: "Secondary Lighter", value: "#eaeaea" },
    { label: "Secondary Light", value: "#999" },
    { label: "Secondary", value: "#666" },
    { label: "Secondary Dark", value: "#333" },
    { label: "Dropdown Box Shadow", value: "0 4px 4px 0 rgba(0, 0, 0, .02)" },
    { label: "Dropdown Triangle Stroke", value: "#fff" },
    { label: "Scroller Start", value: "#fff" },
    { label: "Scroller End", value: "hsla(0, 0%, 100%, 0)" },
    { label: "Shadow Smallest", value: "0px 2px 4px rgba(0, 0, 0, .1)" },
    { label: "Shadow Extra Small", value: "0px 4px 8px rgba(0, 0, 0, .12)" },
    { label: "Shadow Small", value: "0 5px 10px rgba(0, 0, 0, .12)" },
    { label: "Shadow Medium", value: "0 8px 30px rgba(0, 0, 0, .12)" },
    { label: "Shadow Large", value: "0 30px 60px rgba(0, 0, 0, .12)" },
    { label: "Shadow Hover", value: "0 30px 60px rgba(0, 0, 0, .12)" },
    { label: "Shadow Sticky", value: "0 12px 10px -10px rgba(0, 0, 0, .12)" },
    { label: "Portal Opacity", value: "0.25" },
    { label: "WV Green", value: "#0cce6b" },
    { label: "WV Orange", value: "#ffa400" },
    { label: "WV Red", value: "#ff4e42" },
    { label: "Develop Start Gradient", value: "#007cf0" },
    { label: "Develop End Gradient", value: "#00dfd8" },
    { label: "Develop Line End", value: "#019ae9" },
    { label: "Develop Text", value: "#0a72ef" },
    { label: "Preview Start Gradient", value: "#7928ca" },
    { label: "Preview End Gradient", value: "#ff0080" },
    { label: "Preview Line End", value: "#9a1fb8" },
    { label: "Preview Text", value: "#de1d8d" },
    { label: "Ship Start Gradient", value: "#ff4d4d" },
    { label: "Ship End Gradient", value: "#f9cb28" },
    { label: "Ship Line End", value: "#f9cb28" },
    { label: "Ship Text", value: "#ff5b4f" },
    { label: "Next Icon Border", value: "#000" },
  ];

  const spacings = [
    { label: "Space", value: "4px" },
    { label: "Space 2x", value: "8px" },
    { label: "Space 3x", value: "12px" },
    { label: "Space 4x", value: "16px" },
    { label: "Space 6x", value: "24px" },
    { label: "Space 8x", value: "32px" },
    { label: "Space 10x", value: "40px" },
    { label: "Space 16x", value: "64px" },
    { label: "Space 24x", value: "96px" },
    { label: "Space 32x", value: "128px" },
    { label: "Space 48x", value: "192px" },
    { label: "Space 64x", value: "256px" },
    { label: "Space Small", value: "32px" },
    { label: "Space Medium", value: "40px" },
    { label: "Space Large", value: "48px" },
    { label: "Space Gap", value: "24px" },
    { label: "Space Gap Half", value: "12px" },
    { label: "Space Gap Quarter", value: "8px" },
    { label: "Gap", value: "24px" },
    { label: "Gap Half", value: "12px" },
    { label: "Gap Quarter", value: "8px" },
    { label: "Tiny", value: "4px" },
  ];

  const typography = [
    { label: "Font Size 1", font: "16px" },
    { label: "Font Size 2", font: "18px" },
    { label: "Font Size 3", font: "20px" },
    { label: "Font Size 4", font: "24px" },
    { label: "Font Size 5", font: "32px" },
    { label: "Font Size 6", font: "40px" },
    { label: "Font Size 7", font: "48px" },
    { label: "Font Size 8", font: "56px" },
    { label: "Font Size 9", font: "64px" },
    { label: "Line Height", font: "1.5" },
    { label: "Font Family", font: "'Helvetica Neue', Arial, sans-serif" },
  ];

  const shadows = [
    { label: "Shadow Smallest", value: "0px 2px 4px rgba(0, 0, 0, .1)" },
    { label: "Shadow Extra Small", value: "0px 4px 8px rgba(0, 0, 0, .12)" },
    { label: "Shadow Small", value: "0 5px 10px rgba(0, 0, 0, .12)" },
    { label: "Shadow Medium", value: "0 8px 30px rgba(0, 0, 0, .12)" },
    { label: "Shadow Large", value: "0 30px 60px rgba(0, 0, 0, .12)" },
    { label: "Shadow Hover", value: "0 30px 60px rgba(0, 0, 0, .12)" },
    { label: "Shadow Sticky", value: "0 12px 10px -10px rgba(0, 0, 0, .12)" },
    { label: "Portal Opacity", value: "0.25" },
  ];

  return (
    <DesignSystemWrapper
      title="Design System Showcase"
      description="A demonstration of the design system's core elements."
    >
      <Tabs defaultValue="colors">
        <TabsList>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="spacing">Spacing</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="shadows">Shadows</TabsTrigger>
        </TabsList>

        <TabsContent value="colors">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Colors</h3>
            <div className="flex flex-wrap gap-4">
              {colors.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center border border-input p-2 rounded-lg"
                >
                  <div
                    className="w-32 h-32 flex items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: value }}
                  >
                    {label}
                  </div>
                  <Button
                    onClick={() => handleCopy(value)}
                    className="mt-2"
                    variant="outline"
                  >
                    {copiedText === value ? "Copied!" : "Copy"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="spacing">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Spacing</h3>
            <div className="flex flex-col gap-4">
              {spacings.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 border border-input p-2 rounded-lg"
                >
                  <div
                    className="bg-gray-200 w-full"
                    style={{ height: value }}
                  ></div>
                  <Button onClick={() => handleCopy(value)} variant="outline">
                    {copiedText === value ? "Copied!" : "Copy"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="typography">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Typography</h3>
            <div className="flex flex-col gap-4">
              {typography.map(({ label, font }) => (
                <div
                  key={label}
                  className="flex items-center justify-between border border-input p-2 rounded-lg"
                >
                  <p className="text-xl" style={{ fontFamily: font }}>
                    {label}
                  </p>
                  <Button onClick={() => handleCopy(font)} variant="outline">
                    {copiedText === font ? "Copied!" : "Copy"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="shadows">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Shadows</h3>
            <div className="flex flex-wrap gap-4">
              {shadows.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center border border-input p-2 rounded-lg"
                >
                  <div
                    className="w-32 h-32 bg-white rounded-lg flex items-center justify-center"
                    style={{ boxShadow: value }}
                  >
                    {label}
                  </div>
                  <Button
                    onClick={() => handleCopy(value)}
                    className="mt-2"
                    variant="outline"
                  >
                    {copiedText === value ? "Copied!" : "Copy"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DesignSystemWrapper>
  );
}
