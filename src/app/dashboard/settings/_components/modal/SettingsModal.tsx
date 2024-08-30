"use client";

import { Dialog, DialogContent, DialogOverlay } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { Button } from "~/src/components/ui";
import HomeSettings from "../HomeSettings";
import AboutSettings from "./AboutSettings";
import AppearanceSettings from "./AppearanceSettings";
import GeneralSettings from "./GeneralSettings";
import ProfileSettings from "./ProfileSettings";
import Sidebar from "./Sidebar";

type SettingsContextType = {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

export default function SettingsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeMenu, setActiveMenu] = useState("General");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/50" />
      <DialogContent className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-dark-section backdrop-blur-md max-w-[800px] border border-seperator w-full p-0 overflow-hidden rounded-lg shadow-lg">
          <SettingsContext.Provider value={{ activeMenu, setActiveMenu }}>
            <div className="flex h-[60vh]">
              <Sidebar />
              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">{activeMenu}</h1>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {activeMenu === "General" && <GeneralSettings />}
                {activeMenu === "Profile" && <ProfileSettings />}
                {activeMenu === "Home" && <HomeSettings />}
                {activeMenu === "Appearance" && <AppearanceSettings />}
                {activeMenu === "About" && <AboutSettings />}
              </div>
            </div>
          </SettingsContext.Provider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
