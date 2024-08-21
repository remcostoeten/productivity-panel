import { ReactNode } from "react";

export type ColorRow = {
  id: number;
  color: string;
  percentage: number;
  adjustment: "lighter" | "darker";
  result: string | null;
};
export type ActionButton = {
  label: string;
  onClick: () => void;
};

export type DesignSystemWrapperProps = {
  title?: string;
  description: string;
  actionButtons?: ActionButton[];
  children?: ReactNode;
};

// configuration stuff
export const baseVariants = [
  { name: "Dot (Default)", props: {} },
  { name: "Bar", props: { variant: "bar" } },
  { name: "Pulse", props: { variant: "pulse" } },
  { name: "Wave", props: { variant: "wave" } },
  { name: "Spinner", props: { variant: "spinner" } },
  { name: "Bounce", props: { variant: "bounce" } },
  { name: "Dot (Small)", props: { size: "sm" } },
  { name: "Dot (Large)", props: { size: "lg" } },
  { name: "Bar (Fast)", props: { variant: "bar", speed: "fast" } },
  { name: "Pulse (Slow)", props: { variant: "pulse", speed: "slow" } },
  {
    name: "Wave (Secondary)",
    props: { variant: "wave", color: "secondary" },
  },
  {
    name: "Spinner (Accent)",
    props: { variant: "spinner", color: "accent" },
  },
  {
    name: "Bounce (Success)",
    props: { variant: "bounce", color: "success" },
  },
  { name: "Dot (Warning)", props: { color: "warning" } },
  { name: "Bar (Error)", props: { variant: "bar", color: "error" } },
  { name: "Pulse (Linear)", props: { variant: "pulse", easing: "linear" } },
  { name: "Wave (Ease-In)", props: { variant: "wave", easing: "ease-in" } },
  {
    name: "Spinner (Ease-Out)",
    props: { variant: "spinner", easing: "ease-out" },
  },
  {
    name: "Bounce (Ease-In-Out)",
    props: { variant: "bounce", easing: "ease-in-out" },
  },
  {
    name: "Custom Combo",
    props: {
      variant: "dot",
      size: "lg",
      color: "accent",
      speed: "fast",
      easing: "ease-in-out",
    },
  },
];

export const inputVariants = [
  {
    name: "Input Typing",
    props: {
      variant: "dot",
      size: "sm",
      color: "secondary",
      speed: "normal",
    },
    custom: true,
  },
  {
    name: "Input Searching",
    props: {
      variant: "spinner",
      size: "sm",
      color: "primary",
      speed: "fast",
    },
    custom: true,
  },
  {
    name: "Input Validating",
    props: {
      variant: "pulse",
      size: "sm",
      color: "warning",
      speed: "normal",
    },
    custom: true,
  },
  {
    name: "Input Submitting",
    props: { variant: "bar", size: "sm", color: "success", speed: "fast" },
    custom: true,
  },
  {
    name: "Animated Placeholder",
    props: {},
    custom: true,
    animatedPlaceholder: true,
  },
];
