"use client";

import {
  BorderBeam, Button
} from '@/components/ui/';
import { HomeImageSkeleton } from "@/components/effect/skeletons";

import TextShimmer from "@/components/ui/text-shimmer";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useInView } from "framer-motion";
import Image from "next/image";
import { Suspense, useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section
      id="hero"
      className="relative mx-auto pt-12 max-w-[1024px] px-6 text-center md:px-8"
    >
      <div className="backdrop-filter-[12px] group inline-flex h-7 -translate-y-4 items-center justify-between gap-1 rounded-full border border-white/5 bg-white/10 px-3 text-xs text-white  hover:cursor-pointer hover:bg-white/20 dark:text-black">
        <TextShimmer className="inline-flex items-center justify-center">
          <span>
            <span>✨</span> Keep track of your finances
          </span>{" "}
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </TextShimmer>
      </div>
      <h1 className="lg:!text-nowrap -translate-y-4 text-balance bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent  sm:text-6xl md:text-7xl lg:text-7xl dark:from-white dark:to-white/40">
        A platform for keeping <br className="hidden md:block" /> track of{" "}
        <i>anything</i>.
      </h1>
      <p className="-translate-y-4 text-pretty text-lg tracking-tight text-gray-400  md:text-xl">
        Because who wants to use Excel or Google Sheets? 🤷‍♂️
        <br className="hidden sm:block" /> All data is stored for you as an
        individual user. Sign up with ease.{" "}
      </p>

      <Button
        variant="shimmer"
        withArrow={true}
        arrowPosition="right"
        href="/dashboard"
        className=""
      >
        Go to dashboard
      </Button>
      <div
        ref={ref}
        className="relative mt-32  [perspective:2000px] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)]"
      >
        <div
          className={`rounded-xl border border-white/10 bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:size-full before: before:[background-image:linear-gradient(to_bottom,var(--color-one),var(--color-one),transparent_40%)] before:[filter:blur(180px)] ${
            inView ? "before:animate-image-glow" : ""
          }`}
        >
          <BorderBeam
            size={200}
            duration={12}
            delay={11}
            colorFrom="var(--color-one)"
            colorTo="var(--color-two)"
          />

          <Suspense fallback={<HomeImageSkeleton />}>
            <Image
              width="1200"
              height="729"
              src="/hero-dark.webp"
              alt="Hero Image"
              className="relative hidden size-full rounded-[inherit] border object-contain dark:block"
            />
            <Image
              width={1000}
              height={1000}
              src="/hero-light.webp"
              alt="Hero Image"
              className="relative block size-full rounded-[inherit] border object-contain dark:hidden"
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
