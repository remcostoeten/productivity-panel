import { cn } from "@/core/helpers/cn";
import { useId } from "react";

interface DotPatternProps {
  width?: any;
  height?: any;
  x?: any;
  y?: any;
  cx?: any;
  cy?: any;
  cr?: any;
  color?: string;
  className?: string;
  glow?: boolean; // Add a prop for glow
  glowColor?: string; // Optional prop to set the glow color
  glowIntensity?: number; // Optional prop to set the glow intensity
  [key: string]: any;
}

export function DotPattern({
  width = 14,
  height = 14,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  color = "currentColor",
  className,
  glow = false, // Default is no glow
  glowColor = "yellow", // Default glow color
  glowIntensity = 10, // Default glow intensity
  ...props
}: DotPatternProps) {
  const id = useId();

  // Function to determine if a dot should glow
  const shouldGlow = () => {
    return glow && Math.random() > 0.7; // 30% chance to glow
  };

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 h-full w-full fill-neutral-400/80",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle
            id="pattern-circle"
            cx={cx}
            cy={cy}
            r={cr}
            fill={color}
            className={shouldGlow() ? "glow" : ""}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}

export default DotPattern;
