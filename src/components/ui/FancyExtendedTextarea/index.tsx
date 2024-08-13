import React, { useState } from "react";
import { Write } from "./Write";
import { Preview } from "./Preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FancyExtendedTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function FancyExtendedTextarea({
  value,
  onChange,
  placeholder = "Type your message here...",
}: FancyExtendedTextareaProps) {
  return (
    <Tabs defaultValue="write" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="write">Write</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="write">
        <Write value={value} onChange={onChange} placeholder={placeholder} />
      </TabsContent>
      <TabsContent value="preview">
        <Preview value={value} />
      </TabsContent>
    </Tabs>
  );
}
