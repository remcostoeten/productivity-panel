'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import ColorShowcase from './components/_all-text';
import ImageUploaderAndColorPicker from './components/_ImageUploaderAndColorPicker';
import LogoShowcase from './components/LogoShowCase';

interface TabContentProps {
  children: React.ReactNode;
  value: string;
}

const TabContent: React.FC<TabContentProps> = ({ children, value }) => (
  <TabsContent value={value} className="mt-6">
    {children}
  </TabsContent>
);

const DesignSystemShowcase: React.FC = () => {
  const tabs = [
    { id: 'logo', label: 'Logo Showcase', component: <LogoShowcase /> },
    {
      id: 'uploader',
      label: 'Image Uploader & Color Picker',
      component: <ImageUploaderAndColorPicker />,
    },
    { id: 'colors', label: 'Color Showcase', component: <ColorShowcase /> },
  ];

  return (
    <div className="container mx-auto mt-4 p-4 text-2xl">
      <Tabs defaultValue="logo" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="bg-[#262626] p-8 my-8 ">
          {tabs.map((tab) => (
            <TabContent key={tab.id} value={tab.id}>
              {tab.component}
            </TabContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default DesignSystemShowcase;
