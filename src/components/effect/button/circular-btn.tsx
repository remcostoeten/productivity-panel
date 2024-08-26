import { motion } from "framer-motion";
import { CSSProperties, ReactNode } from "react";

// Constants for easy customization
const GRADIENT_COLORS = [
  "#fff", // Hex color
  "var(--primary)", // CSS variable
  "rgba(123, 104, 238, 0.8)", // RGBA color
  "#F5833F",
];
const BUTTON_BG_COLOR = "!bg-dark-section--lighter";
const BORDER_COLOR = "p-px";
const BORDER_RADIUS = "rounded-full";
const BUTTON_TEXT_COLOR = "text-muted";
const ACTIVE_SCALE = "active:scale-95";

type ShinyCircularButtonProps = {
  href?: string;
  isClickable?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

export default function ShinyCircularButton({
  href,
  isClickable = true,
  children,
  className = "",
  style = {},
  onClick,
  ...props
}: ShinyCircularButtonProps) {
  const ButtonWrapper = isClickable ? (href ? "a" : "button") : "div";
  const buttonProps = {
    ...(isClickable && !href && { type: "button" }),
    ...(href && { href }),
    ...(onClick && { onClick }),
    className: `${BUTTON_BG_COLOR} min-w-fit ${BORDER_COLOR} relative ${BORDER_RADIUS} overflow-hidden group ${isClickable ? `${ACTIVE_SCALE} transition-transform cursor-pointer` : "cursor-default"} ${className}`,
    style,
    ...props,
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
        className={`relative z-10 ${BORDER_RADIUS} px-3 py-1 ${BUTTON_BG_COLOR} block`}
      >
        <motion.span
          animate={{
            backgroundImage: animatedGradients,
          }}
          transition={{
            duration: 1,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
          className={`bg-clip-text group-hover:text-transparent ${BUTTON_TEXT_COLOR} text-sm tracking-tighter transition-colors transform-gpu duration-500`}
        >
          {children}
        </motion.span>
      </span>
    </ButtonWrapper>
  );
}
