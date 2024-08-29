"use client";
import React, { useCallback, useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  Transition,
} from "framer-motion";
import { cn } from "@/core/helpers/cn";

// Constants for customization
const EASING: Transition["ease"] = [0.4, 0.0, 0.2, 1];
const TRANSITION_DELAY = 0.15;
const BLUR_AMOUNT = "20px";
const OPACITY = 0.8;
const GRADIENT_COLOR = "#262626";
const GRADIENT_SIZE = 200;
const RANDOMNESS_FACTOR = 0.1;
const ANIMATION_DURATION = 0.3;

const cardContent = {
  title: "Lorem ipsum dolor",
  description:
    "Lorem ipsum dolor, sit amet elit consectetur adipisicing. Nostrum, hic ipsum! dolor, sit amet elit consectetur amete elite!",
};

const CardBody = ({ className = "" }: { className?: string }) => (
  <div className={cn("text-left p-4 md:p-6", className)}>
    <h3 className="text-lg font-bold mb-1 text-zinc-200">
      {cardContent.title}
    </h3>
    <p className="text-wrap text-zinc-500 text-sm">{cardContent.description}</p>
  </div>
);

export interface PaternCardProps {
  children?: React.ReactNode;
  variant?:
    | "default"
    | "gridEllipsis"
    | "ellipsis"
    | "circleEllipsis"
    | "lines"
    | "plus"
    | "grid";
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  easing?: Transition["linear"];
  transitionDelay?: number;
  blurAmount?: string;
  randomnessFactor?: number;
  className?: string;
}

export default function PaternCard({
  children,
  variant = "lines",
  gradientSize = GRADIENT_SIZE,
  gradientColor = GRADIENT_COLOR,
  gradientOpacity = OPACITY,
  easing = EASING,
  transitionDelay = TRANSITION_DELAY,
  blurAmount = BLUR_AMOUNT,
  randomnessFactor = RANDOMNESS_FACTOR,
  className = "",
}: PaternCardProps) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      const offsetX =
        (e.clientX - left) * (1 + randomnessFactor * (Math.random() - 0.5));
      const offsetY =
        (e.clientY - top) * (1 + randomnessFactor * (Math.random() - 0.5));
      mouseX.set(offsetX);
      mouseY.set(offsetY);
    },
    [mouseX, mouseY, randomnessFactor],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  useEffect(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  const baseClasses =
    "border w-full rounded-md overflow-hidden dark:border-zinc-900 dark:bg-zinc-950";
  const variantClasses = {
    default: "",
    gridEllipsis: "p-1",
    ellipsis: "p-3",
    circleEllipsis: "p-1",
    lines: "p-1",
    plus: "",
    grid: "",
  };

  const backgroundClasses = {
    default: "",
    gridEllipsis: "bg-[url(/patterns/grid-ellipsis.svg)] bg-[length:25px_25px]",
    ellipsis: "bg-[url(/patterns/ellipsis.svg)] bg-[length:30px_30px]",
    circleEllipsis:
      "bg-[url(/patterns/circle-ellipsis.svg)] bg-[length:30px_30px]",
    lines: "bg-[url(/patterns/lines.svg)] bg-[length:30px_30px]",
    plus: "bg-[url(/patterns/plus.svg)] bg-[length:65px_65px]",
    grid: "bg-[url(/patterns/grid.svg)] bg-[length:50px_50px]",
  };

  const gradientClasses = {
    default: "",
    gridEllipsis: "from-zinc-950 via-zinc-950/70 to-zinc-950",
    ellipsis: "from-zinc-950/90 via-zinc-950/40 to-zinc-950/10",
    circleEllipsis: "from-zinc-950 via-zinc-950/80 to-zinc-900/10",
    lines: "from-zinc-950 via-zinc-950/80 to-zinc-900/10",
    plus: "from-zinc-950 via-zinc-950/[0.93] to-zinc-950",
    grid: "from-zinc-950 via-zinc-950/[.85] to-zinc-950",
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{
        transitionDelay: `${transitionDelay}s`,
        transitionTimingFunction: easing,
      }}
    >
      <div className={cn("size-full bg-repeat", backgroundClasses[variant])}>
        <div
          className={cn(
            "size-full bg-gradient-to-tr relative",
            gradientClasses[variant],
          )}
        >
          <div className="relative z-10">{children || <CardBody />}</div>
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)`,
              opacity: gradientOpacity,
              filter: `blur(${blurAmount})`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
