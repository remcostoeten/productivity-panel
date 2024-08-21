"use client";

import React from "react";

type DesignSystemLayoutProps = {
  children: React.ReactNode;
};

export default function DesignSystemLayout({
  children,
}: DesignSystemLayoutProps) {
  return (
    <div className="min-h-screen bg-dark-bg text-foreground font-sans">
      <header className="border-b border-seperator py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Design System & Tool Showcase</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
