"use client";

import BEZIER_CURVES, {
  BezierCurve,
} from "@/core/helpers/animations/bezier-curves";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";

const ICON_VIEWBOX = "290 17 24 23";
const ANIMATE_LOGO = true;
const ICON_ANIMATION_DURATION = 1;
const ICON_ANIMATION_DELAY = 0.5;
const PATH_DELAY_DIFFERENCE = 0.2;
const LEFT_FILL = "var(--primary--darker)";
const RIGHT_FILL = "var(--primary)";
const EASING: BezierCurve = BEZIER_CURVES.JUMP;

type LogoProps = {
  width?: string;
  height?: string;
  className?: string;
  link?: boolean | string;
};

const TOTALSIZE = "30";

const BrandLogo = ({
  className,
  width = TOTALSIZE,
  height = TOTALSIZE,
  link,
  ...props
}: LogoProps) => {
  const { theme } = useTheme();

  const PathComponent = ANIMATE_LOGO ? motion.path : "path";

  const path1Animation = {
    initial: { pathLength: 0, scale: 0, opacity: 0 },
    animate: { pathLength: 1, scale: 1, opacity: 1 },
    transition: {
      duration: ICON_ANIMATION_DURATION,
      delay: ICON_ANIMATION_DELAY + PATH_DELAY_DIFFERENCE,
      ease: EASING,
    },
  };

  const path2Animation = {
    initial: { pathLength: 0, scale: 0, opacity: 0 },
    animate: { pathLength: 1, scale: 1, opacity: 1 },
    transition: {
      duration: ICON_ANIMATION_DURATION,
      delay: ICON_ANIMATION_DELAY,
      ease: EASING,
    },
  };

  const svgElement = (
    <svg
      className={className}
      viewBox={ICON_VIEWBOX}
      width={`${width}px`}
      height={`${height}px`}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <PathComponent
        d="M 303.143 25.325 C 303.842 24.222 304.382 23.027 304.747 21.773 C 306.221 24.934 309.426 27.133 313.137 27.133 L 313.137 30.352 L 313.108 30.352 C 308.01 30.352 303.858 34.508 303.858 39.617 L 300.644 39.617 C 300.634 34.948 303.201 30.874 306.999 28.733 C 305.491 27.877 304.177 26.716 303.143 25.325 Z"
        fill={RIGHT_FILL}
        {...(ANIMATE_LOGO ? path1Animation : {})}
      />
      <PathComponent
        d="M 298.742 34.901 C 297.316 31.876 294.31 29.745 290.792 29.585 C 290.652 29.59 290.512 29.59 290.366 29.59 L 290.366 26.351 C 290.506 26.351 290.652 26.356 290.792 26.356 C 293.098 26.258 295.282 25.295 296.91 23.659 C 298.651 21.923 299.626 19.563 299.617 17.105 L 302.836 17.105 C 302.836 20.44 301.54 23.572 299.182 25.93 C 298.387 26.729 297.488 27.417 296.509 27.975 C 298.009 28.829 299.317 29.984 300.351 31.367 C 299.652 32.464 299.111 33.653 298.743 34.901 L 298.742 34.901 Z"
        fill={LEFT_FILL}
        {...(ANIMATE_LOGO ? path2Animation : {})}
      />
    </svg>
  );

  return link ? (
    <Link href={typeof link === "string" ? link : "/"}>{svgElement}</Link>
  ) : (
    svgElement
  );
};

export default BrandLogo;
