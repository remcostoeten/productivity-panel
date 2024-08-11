import clsx, { ClassValue } from "clsx";
import { JSX } from "react/jsx-runtime";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

interface RetroGridProps {
  className?: string;
  speed?: string;
  direction?: "to_right" | "to_left" | "to_bottom" | "to_top";
  hoverEffect?: boolean;
  primaryColor?: string;
  borderColor?: string;
}

export default function RetroGrid({
  className,
  speed = "1s",
  direction = "to_right",
  hoverEffect = false,
  primaryColor = "rgba(0,0,0,0.3)",
  borderColor = "rgba(0,0,0,0.3)",
}: RetroGridProps): JSX.Element {
  return (
    <div
      className={cn(
        "absolute h-full w-full overflow-hidden [perspective:200px]",
        className,
        hoverEffect && "hover:opacity-75",
      )}
      style={{ animationDuration: speed }}
    >
      <div className="absolute inset-0 [transform:rotateX(45deg)]">
        <div
          className={cn(
            "gradient-text",
            "animate-grid",
            "[background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:300vw]",
            `[background-image:linear-gradient(${direction},${borderColor}_1px,transparent_0),linear-gradient(to_bottom,${borderColor}_1px,transparent_0)]`,
            `dark:[background-image:linear-gradient(${direction},${primaryColor}_1px,transparent_0),linear-gradient(to_bottom,${primaryColor}_1px,transparent_0)]`,
          )}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent to-60% dark:from-black" />
    </div>
  );
}
