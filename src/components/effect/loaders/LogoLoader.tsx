"use client";

import { Center } from "@/components/atoms/Center";
import BrandLogo from "@/components/theme/BrandLogo";
import ImageLoader from "../LogoFlicker";

export default function LogoLoader() {
  return (
    <>
      <Center
        fullScreen={true}
        className="absolute inset-0 z-50 flex items-center justify-center "
      >
        <ImageLoader>
          <BrandLogo />
        </ImageLoader>
      </Center>
    </>
  );
}
