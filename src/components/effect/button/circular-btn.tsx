"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const GRADIENT_COLORS = [
  "rgba(255,106,0,0.1)", // "var(--color-two)",
  "var(--brand)", // "var(--color-two)",
  "#ff6c00", // "var(--color-two)",
  "var(--brand)", // "var(--color-two)",
  "#ff5b00", // "var(--color-two)",
  "rgba(255,106,0,0.1)", // "var(--color-two)",
];
const BUTTON_BG_COLOR = "bg-dark-bg border border-seperator";
const BORDER_COLOR = "p-px";
const BORDER_RADIUS = "rounded-full";
const BUTTON_TEXT_COLOR = "text-muted";
const ACTIVE_SCALE = "active:scale-95";

type ShinyCircularButtonProps = {
  href?: string;
  isClickable?: boolean;
  children?: ReactNode;
};

export default function ShinyCircularButton({
  href,
  isClickable = true,
  children,
}: ShinyCircularButtonProps) {
  const ButtonWrapper = isClickable ? (href ? "a" : "button") : "div";
  const buttonProps = {
    ...(isClickable && !href && { type: "button" }),
    ...(href && { href }),
    className: `$ ${BUTTON_BG_COLOR} min-w-fit ${BORDER_COLOR} relative ${BORDER_RADIUS} overflow-hidden group ${isClickable ? `${ACTIVE_SCALE} w-max transition-transform cursor-pointer` : "cursor-default"}`,
  };

  const gradientStyle = {
    background: `linear-gradient(135deg, ${GRADIENT_COLORS.join(", ")})`,
  };

  const animatedGradients = GRADIENT_COLORS.map((_, index) => {
    const rotatedColors = [
      ...GRADIENT_COLORS.slice(index),
      ...GRADIENT_COLORS.slice(0, index),
    ];
    return `linear-gradient(90deg, ${rotatedColors.join(", ")})`;
  });

  return (
    <ButtonWrapper {...buttonProps}>
      <motion.span
        initial={{ top: 0, left: 0 }}
        animate={{
          top: ["50%", "0%", "50%", "100%", "50%"],
          left: ["0%", "50%", "100%", "50%", "0%"],
        }}
        transition={{
          duration: 3,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
        className={`absolute size-8 z-10 -translate-x-1/2 -translate-y-1/2 blur-sm duration-300 transition-transform transform-gpu`}
      >
        <motion.span
          animate={{
            rotate: ["0deg", "360deg"],
          }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
          className={`block ${BORDER_RADIUS} size-full transform-gpu`}
          style={gradientStyle}
        />
      </motion.span>
      <span
        className={`relative z-10 ${BORDER_RADIUS} px-4 py-1  ${BUTTON_BG_COLOR} block`}
      >
        <motion.span
          animate={{
            backgroundImage: animatedGradients,
          }}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
          className={`bg-clip-text $ ${BUTTON_TEXT_COLOR} text-sm tracking-tighter transition-colors transform-gpu duration-500`}
        >
          {children}
        </motion.span>
      </span>
    </ButtonWrapper>
  );
}
