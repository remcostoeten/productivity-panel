"use client";

import clsx, { ClassValue } from "clsx";
import { JSX } from "react/jsx-runtime";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function RetroGrid({ className }: { className?: string }): JSX.Element {
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
            "gradient-text",
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
