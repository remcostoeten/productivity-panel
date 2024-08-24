"use client";
import { useState } from "react";
import { Button } from "~/src/components/ui";
import SettingsModal from "./_components/modal/SettingsModal";

export default function page() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsSettingsOpen(true)}>Open Settings</Button>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
