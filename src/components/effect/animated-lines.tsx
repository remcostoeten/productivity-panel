"use client";

import React from "react";
import { useServerInsertedHTML } from "next/navigation";
import { twMerge } from "tailwind-merge";

type Variant = "DEFAULT" | "CYBERPUNK" | "MATRIX";

interface AnimatedLinesProps {
  lineCount: number;
  positions?: number[];
  animationDuration?: number | number[];
  backgroundColor?: string;
  lineColor?: string;
  glowColor?: string;
  variant?: Variant;
  perspective?: number;
  alignWithElement?: string;
}

const VARIANTS: Record<
  Variant,
  { lineColor: string; glowColor: string; backgroundColor: string }
> = {
  DEFAULT: {
    lineColor: "rgba(255, 255, 255, 0.1)",
    glowColor: "#ffffff",
    backgroundColor: "#171717",
  },
  CYBERPUNK: {
    lineColor: "rgba(255, 0, 255, 0.1)",
    glowColor: "#ff00ff",
    backgroundColor: "#000033",
  },
  MATRIX: {
    lineColor: "rgba(0, 255, 0, 0.1)",
    glowColor: "#00ff00",
    backgroundColor: "#001100",
  },
};

const AnimatedLines: React.FC<AnimatedLinesProps> = ({
  lineCount = 3,
  positions,
  animationDuration = 7,
  backgroundColor,
  lineColor,
  glowColor,
  variant = "DEFAULT",
  perspective = 1000,
  alignWithElement,
}) => {
  const {
    lineColor: defaultLineColor,
    glowColor: defaultGlowColor,
    backgroundColor: defaultBackgroundColor,
  } = VARIANTS[variant];

  const containerStyle = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    margin: "auto",
    width: "90vw",
    perspective: `${perspective}px`,
  };

  const lineStyle = (position: number): React.CSSProperties => ({
    position: "absolute",
    width: "1px",
    height: "100%",
    top: 0,
    left: "50%",
    marginLeft: `${position}%`,
    background: lineColor || defaultLineColor,
    overflow: "hidden",
  });

  const afterStyle = (delay: number): React.CSSProperties => ({
    content: '""',
    display: "block",
    position: "absolute",
    height: "15vh",
    width: "100%",
    top: "-50%",
    left: 0,
    background: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, ${
      glowColor || defaultGlowColor
    } 75%, ${glowColor || defaultGlowColor} 100%)`,
    animation: `drop ${
      typeof animationDuration === "number"
        ? animationDuration
        : animationDuration[delay % animationDuration.length]
    }s ${delay}s infinite`,
    animationFillMode: "forwards",
    animationTimingFunction: "cubic-bezier(0.4, 0.26, 0, 0.97)",
  });

  const keyframes = `
    @keyframes drop {
      0% { top: -50%; }
      100% { top: 110%; }
    }
  `;

  useServerInsertedHTML(() => (
    <style dangerouslySetInnerHTML={{ __html: keyframes }} />
  ));

  const alignmentStyle = alignWithElement
    ? {
        position: "absolute" as const,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none" as const,
      }
    : {};

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-drop");
            } else {
              entry.target.classList.remove("animate-drop");
            }
          });
        },
        { threshold: 0.1 },
      );

      document.querySelectorAll(".line-glow").forEach((line) => {
        observer.observe(line);
      });

      return () => observer.disconnect();
    }
  }, []);

  return (
    <div
      className={twMerge(
        `h-full overflow-hidden`,
        backgroundColor || defaultBackgroundColor,
      )}
      style={alignmentStyle}
    >
      <div style={containerStyle}>
        {[...Array(lineCount)].map((_, index) => (
          <div
            key={index}
            className="transform-gpu"
            style={lineStyle(
              positions?.[index] || (index - Math.floor(lineCount / 2)) * 25,
            )}
          >
            <div className="line-glow" style={afterStyle(index * 0.5)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedLines;
