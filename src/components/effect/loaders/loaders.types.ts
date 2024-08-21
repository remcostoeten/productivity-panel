export type AnimatedDotsProps = {
  text?: string;
  dotColor?: string;
  dotSize?: "small" | "medium" | "large";
  animationType?: "fade" | "bounce" | "pulse" | "slide";
  animationDirection?: "up" | "down" | "left" | "right";
  animationSpeed?: "slow" | "normal" | "fast";
  easing?: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";
  reverse?: boolean;
  dotCount?: number;
};
