"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@ui/select";
import { Separator } from "@/components/ui";
import Flex from "@/components/atoms/Flex";
import { DesignSystemWrapper } from "@/app/design-system/_components/DesignSystemWrapper";
import { useMotionValue, motion } from "framer-motion";

type DemoTitleAndDescriptionProps = {
  title?: string;
  description?: string;
};

function DemoTitleAndDescription({
  title,
  description,
}: DemoTitleAndDescriptionProps) {
  return (
    <Flex dir="col" gap={1}>
      <h2 className="text-lg mb-0 font-semibold">{title}</h2>
      <p className="-mt-2 text-muted-foreground">{description}</p>
      <Separator />
    </Flex>
  );
}

type PaternCardProps = {
  children?: React.ReactNode;
  variant?:
    | "default"
    | "gridEllipsis"
    | "ellipsis"
    | "circleEllipsis"
    | "lines"
    | "plus"
    | "grid";
  animationVariant?: "scale" | "rotate" | "skew" | "none";
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  easing?: number[];
  transitionDelay?: number;
  blurAmount?: string;
  randomnessFactor?: number;
  className?: string;
};

function PaternCard({
  children,
  variant = "default",
  animationVariant = "none",
  gradientSize = 200,
  gradientColor = "#262626",
  gradientOpacity = 0.8,
  easing = [0.4, 0.0, 0.2, 1],
  transitionDelay = 0.15,
  blurAmount = "20px",
  randomnessFactor = 0.1,
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
    lines: "bg-[url(/patterns/circle-ellipsis.svg)] bg-[length:30px_30px]",
    plus: "bg-[url(/patterns/plus.svg)] bg-[length:65px_65px]",
    grid: "bg-[url(/patterns/grid.svg)] bg-[length:50px_50px]",
  };

  const gradientClasses = {
    default: "",
    gridEllipsis: "from-zinc-950 via-zinc-950/70 to-zinc-950",
    ellipsis: "from-zinc-950/90 via-zinc-950/40 to-zinc-950/10",
    circleEllipsis: "from-zinc-950 via-zinc-950/80 to-zinc-900/10",
    lines: "from-zinc-950 via-zinc-950/70 to-zinc-950/30",
    plus: "from-zinc-950 via-zinc-950/80 to-zinc-950/40",
    grid: "from-zinc-950 via-zinc-950/80 to-zinc-950/40",
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${backgroundClasses[variant]} ${className} max-w-full`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-radial ${gradientClasses[variant]}`}
        style={
          {
            background: `radial-gradient(${gradientSize}px circle at var(--mouse-x) var(--mouse-y), ${gradientColor}, transparent ${gradientOpacity * 100}%)`,
            opacity: gradientOpacity,
            "--mouse-x": mouseX,
            "--mouse-y": mouseY,
          } as any
        }
      />
      <motion.div
        className="relative z-10 h-full"
        initial={false}
        animate={{
          scale: animationVariant === "scale" ? [1, 1.05, 1] : 1,
          rotate: animationVariant === "rotate" ? [0, 5, 0] : 0,
          skew: animationVariant === "skew" ? [0, 2, 0] : 0,
        }}
        transition={{
          duration: 0.4,
          ease: easing,
          delay: transitionDelay,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const cardVariants = [
  "default",
  "gridEllipsis",
  "ellipsis",
  "circleEllipsis",
  "lines",
  "plus",
  "grid",
];
const animationVariants = ["none", "scale", "rotate", "skew"];

export default function CardComponentShowcase() {
  const [selectedVariant, setSelectedVariant] = useState<string>("default");
  const [selectedAnimation, setSelectedAnimation] = useState<string>("none");
  const [selectedCardCode, setSelectedCardCode] = useState<string>("");
  const [gradientColor, setGradientColor] = useState<string>(
    "var(--dark-section)",
  );

  const handleVariantChange = (variant: string) => {
    setSelectedVariant(variant);
    setSelectedCardCode(
      `<PaternCard variant="${variant}" animationVariant="${selectedAnimation}" />`,
    );
  };

  const handleAnimationChange = (animation: string) => {
    setSelectedAnimation(animation);
    setSelectedCardCode(
      `<PaternCard variant="${selectedVariant}" animationVariant="${animation}" />`,
    );
  };

  return (
    <DesignSystemWrapper
      title="Card Component Showcase"
      description="Demonstration of the PaternCard component with various background and animation variants."
    >
      <div className="flex flex-col gap-4 items-start w-full">
        <DemoTitleAndDescription
          title="Select a Card Variant"
          description="Use the select dropdown to choose a card variant."
        />
        <Flex gap="6" className="items-center flex-col sm:flex-row">
          <Select value={selectedVariant} onValueChange={handleVariantChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select variant" />
            </SelectTrigger>
            <SelectContent>
              {cardVariants.map((variant) => (
                <SelectItem key={variant} value={variant}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedAnimation}
            onValueChange={handleAnimationChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select animation" />
            </SelectTrigger>
            <SelectContent>
              {animationVariants.map((animation) => (
                <SelectItem key={animation} value={animation}>
                  {animation.charAt(0).toUpperCase() + animation.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Flex>

        <DemoTitleAndDescription
          title="Card Preview"
          description="Hover over the card to see the animation effect."
        />
        <PaternCard
          variant={selectedVariant as PaternCardProps["variant"]}
          animationVariant={
            selectedAnimation as PaternCardProps["animationVariant"]
          }
          gradientColor={gradientColor}
          className="w-full h-64 md:h-96"
        >
          <div className="flex items-center justify-center h-full">
            <p className="text-xl font-semibold text-white">
              {selectedVariant.charAt(0).toUpperCase() +
                selectedVariant.slice(1)}{" "}
              Card
            </p>
          </div>
        </PaternCard>

        <DemoTitleAndDescription
          title="Component Code"
          description="Copy and paste this code to use the PaternCard component with the selected options."
        />
        <pre className="w-full bg-gray-100 p-4 rounded-md overflow-x-auto">
          <code>{selectedCardCode}</code>
        </pre>
      </div>
    </DesignSystemWrapper>
  );
}
