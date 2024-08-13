"use client";

import AnimatedLines from "@/components/effect/animated-lines";
import React, { useState } from "react";

const variants = ["DEFAULT", "CYBERPUNK", "MATRIX"] as const;

const DemoPage: React.FC = () => {
  const [activeVariant, setActiveVariant] =
    useState<(typeof variants)[number]>("DEFAULT");

  return (
    <div className="min-h-screen  text-white">
      <nav className="p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">AnimatedLines Demo</h1>
          <div>
            {variants.map((variant) => (
              <button
                key={variant}
                onClick={() => setActiveVariant(variant)}
                className={`px-4 py-2 rounded ${
                  activeVariant === variant
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-300"
                } mr-2`}
              >
                {variant}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {variants.map((variant) => (
            <div
              key={variant}
              className="relative h-80 rounded-lg overflow-hidden"
            >
              <AnimatedLines lineCount={5} variant={variant} />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-2xl font-bold bg-black bg-opacity-50 p-2 rounded">
                  {variant}
                </h2>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 relative h-96 rounded-lg overflow-hidden">
          <AnimatedLines
            lineCount={10}
            variant={activeVariant}
            perspective={1000}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl font-bold bg-black bg-opacity-50 p-4 rounded">
              Active Variant: {activeVariant}
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DemoPage;
