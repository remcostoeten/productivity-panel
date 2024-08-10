"use client;";

import React from "react";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function RetroGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute h-full w-full overflow-hidden [perspective:200px]",
        className,
      )}
    >
      <div className="absolute inset-0 [transform:rotateX(45deg)]">
        <div
          className={cn(
            "animate-grid",
            "[background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:300vw]",
            "[background-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_0)]",
            "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]",
          )}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent to-60% dark:from-black" />
    </div>
  );
}

function Blur() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 pointer-events-none"
    >
      <div className="blur-[106px] h-56 bg-gradient-to-br from-violet-500 to-purple-400 dark:from-fuchsia-700" />
      <div className="blur-[106px] h-32 bg-gradient-to-r from-fuchsia-400 to-purple-300 dark:to-violet-600" />
    </div>
  );
}

export default function AnimatedRetroGrid() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-white dark:bg-gray-900 text-black dark:text-white">
      <Blur />
      <RetroGrid className="opacity-20 duration-500" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-4xl font-bold">Animated Retro Grid</h1>
      </div>
    </div>
  );
}

// The following script tag should be added to your HTML file or _document.js in Next.js
const styleTag = `
<style>
  @keyframes grid {
    0% { transform: translateY(0); }
    100% { transform: translateY(-100%); }
  }
  .animate-grid {
    animation: grid 20s linear infinite;
  }
</style>
`;
