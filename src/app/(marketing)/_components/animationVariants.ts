import { cubicBezier, Variants } from "framer-motion";

const DURATION_MULTIPLIER = 1.4;

export const menuAnimationVariants: Record<
  string,
  { menu: Variants; item: Variants }
> = {
  dropdownMenu: {
    menu: {
      hidden: { opacity: 0, y: 10, x: -10, scale: 0.9 },
      visible: {
        opacity: 1,
        height: "auto",
        scale: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.6 * DURATION_MULTIPLIER,
          ease: cubicBezier(0.19, 1, 0.22, 0.7),
        },
      },
      exit: {
        opacity: 0,
        y: -10,
        scale: 0.2,
        x: -10,
        height: 0,
        transition: {
          duration: 0.9 * DURATION_MULTIPLIER,
          ease: cubicBezier(0.19, 1, 0.22, 1.3),
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: -30, x: 30, scale: 0.3 },
      visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        transition: {
          delay: i * 0.1 * DURATION_MULTIPLIER,
          duration: 0.4 * DURATION_MULTIPLIER,
          ease: cubicBezier(0.19, 1, 0.22, 1.1),
          opacity: {
            delay: i * 0.1 * DURATION_MULTIPLIER + 0.2,
          },
        },
      }),
    },
  },
};

export type MenuAnimationVariant = keyof typeof menuAnimationVariants;
