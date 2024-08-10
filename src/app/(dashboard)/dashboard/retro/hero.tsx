import Retro from "./retro";
import { RetroGrid } from "./retro-grid";
import { HERO_CONSTANTS } from "./helpers/constants";

export type HeroProps = {};

export default function Hero({}: HeroProps) {
  return (
    <div>
      <Retro />
      <Blur />
      <RetroGrid
        className={`opacity-20 duration-${HERO_CONSTANTS.ANIMATION_DURATION} hidden animation-grid`}
      />
    </div>
  );
}

function Blur() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 pointer-events-none"
    >
      <div
        className={`fix-safari-blur blur-[${HERO_CONSTANTS.BLUR.AMOUNT}] h-${HERO_CONSTANTS.BLUR.HEIGHT.LARGE} bg-gradient-to-br from-${HERO_CONSTANTS.COLORS.LIGHT.FROM} to-${HERO_CONSTANTS.COLORS.LIGHT.TO} dark:from-${HERO_CONSTANTS.COLORS.DARK.FROM}`}
      ></div>
      <div
        className={`fix-safari-blur blur-[${HERO_CONSTANTS.BLUR.AMOUNT}] h-${HERO_CONSTANTS.BLUR.HEIGHT.SMALL} bg-gradient-to-r from-fuchsia-400 to-${HERO_CONSTANTS.COLORS.LIGHT.TO} dark:to-${HERO_CONSTANTS.COLORS.DARK.TO}`}
      ></div>
    </div>
  );
}
