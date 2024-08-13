"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorConfigPickerPage from "../color-tool/page";
import ColorShowcase from "./components/_all-text";
import TailwindcssButtons from "./components/_button-showcase";
import LogoShowcase from "./components/LogoShowCase";

interface TabContentProps {
  children: React.ReactNode;
  value: string;
}

function TabContent({ children, value }: TabContentProps) {
  return (
    <TabsContent value={value} className="mt-6">
      {children}
    </TabsContent>
  );
}

const tabs = [
  { id: "logo", label: "Logo Showcase", component: <LogoShowcase /> },
  {
    id: "uploader",
    label: "Color picker & config creator",
    component: <ColorConfigPickerPage />,
  },
  { id: "colors", label: "Color Showcase", component: <ColorShowcase /> },
  {
    id: "buttons",
    label: "Tailwindcss Buttons",
    component: <TailwindcssButtons />,
  },
];

function DesignSystemShowcase() {
  return (
      <Tabs defaultValue="logo" className="my-4 w-full">                                                                                                                                                                                                                                                                                                                                                                                                        
        <TabsList className="grid w-full grid-cols-4">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
          {tabs.map((tab) => (
            <TabContent key={tab.id} value={tab.id}>
              {tab.component}
            </TabContent>
          ))}
      </Tabs>
  );
}

export default DesignSystemShowcase;
