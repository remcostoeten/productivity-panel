"use client";

import BrandLogo from "@/components/theme/BrandLogo";
import menuItem from "@/core/data/header-menu-items";
import { cn } from "@/core/helpers/cn";
import { UserButton } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { AlignJustify, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NavigationMenu from "./marketing-header-dropdown";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { BorderMagicButton } from "@/components/ui";
import DashNavigationMenu from "./marketing-header-dropdown";
import {
  mobilenavbarVariant,
  containerVariants,
  mobileLinkVar,
} from "@/core/helpers/animations/ menu-animations";

export default function SiteHeader() {
  const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");

    if (html) {
      html.classList.toggle("overflow-hidden", hamburgerMenuIsOpen);
    }
  }, [hamburgerMenuIsOpen]);

  useEffect(() => {
    const closeHamburgerNavigation = () => setHamburgerMenuIsOpen(false);
    window.addEventListener("orientationchange", closeHamburgerNavigation);
    window.addEventListener("resize", closeHamburgerNavigation);

    return () => {
      window.removeEventListener("orientationchange", closeHamburgerNavigation);
      window.removeEventListener("resize", closeHamburgerNavigation);
    };
  }, [setHamburgerMenuIsOpen]);

  const pathname = usePathname();

  return (
    <>
      <header className="animate-fade-in fixed left-0 top-0 z-50 w-full -translate-y-4 border-b opacity-0 backdrop-blur-md [--animation-delay:600ms]">
        <div className="px-2 lg:px-0 sm:container flex h-14 items-center justify-between z-20">
          <Link
            className="text-md flex items-center transition-all duration-500 origin-top"
            href="/"
          >
            <BrandLogo />
          </Link>
          <nav className="hidden md:flex justify-center items-center content-center w-full">
            {menuItem.map((item) => (
              <Link
                key={item.id}
                className={cn(
                  "mr-6 text-sm hover:scale-105 transition-all duration-500",
                  pathname === item.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground",
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
            <NavigationMenu animationVariant="dropdownMenu" />
            <DashNavigationMenu animationVariant="dropdownMenu" />
          </nav>

          <div className="hidden md:flex ml-auto h-full items-center mr-4">
            <UserButton />
            <BorderMagicButton href="/dashboard"> Dashboard</BorderMagicButton>
          </div>
          <button
            className="ml-6 md:hidden"
            onClick={() => setHamburgerMenuIsOpen((open) => !open)}
          >
            <span className="sr-only">Toggle menu</span>
            {hamburgerMenuIsOpen ? (
              <XIcon className="text-red-400" />
            ) : (
              <HamburgerMenuIcon className="text-text size-5" />
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        <motion.nav
          initial="initial"
          exit="exit"
          variants={mobilenavbarVariant}
          animate={hamburgerMenuIsOpen ? "animate" : "exit"}
          className={cn(
            `bg-background/70 fixed left-0 top-0 z-50 h-screen w-full overflow-auto backdrop-blur-md `,
            {
              "pointer-events-none": !hamburgerMenuIsOpen,
            },
          )}
        >
          <div className="container flex h-14 items-center justify-between">
            <Link className="text-md flex items-center" href="/">
              Remco Stoeten
            </Link>

            <button
              className="ml-6 md:hidden"
              onClick={() => setHamburgerMenuIsOpen((open) => !open)}
            >
              <span className="sr-only">Toggle menu</span>
              {hamburgerMenuIsOpen ? <XIcon /> : <AlignJustify />}
            </button>
          </div>
          <motion.ul
            className="flex flex-col uppercase ease-in md:flex-row md:items-center md:normal-case"
            variants={containerVariants}
            initial="initial"
            animate={hamburgerMenuIsOpen ? "open" : "exit"}
          >
            {menuItem.map((item) => (
              <motion.li
                variants={mobileLinkVar}
                key={item.id}
                className="border-grey-dark border-b py-0.5 pl-6 md:border-none"
              >
                <Link
                  className={cn(
                    "flex h-[var(--navigation-height)] w-full items-center text-xl transition-[color,transform] duration-300 md:translate-y-0 md:text-sm md:transition-colors",
                    pathname === item.href
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground",
                    hamburgerMenuIsOpen ? "[&_a]:translate-y-0" : "",
                  )}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.nav>
      </AnimatePresence>
    </>
  );
}
