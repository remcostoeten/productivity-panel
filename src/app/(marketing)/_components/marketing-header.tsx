"use client";

import { useState, useCallback, useEffect, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { XIcon, AlignJustify } from "lucide-react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import BrandLogo from "@/components/theme/BrandLogo";
import menuItems from "@/core/data/header-menu-items";
import { cn } from "@/core/helpers/cn";
import NavigationMenu from "./marketing-header-dropdown";
import { BorderMagicButton, BorderMagicButtonAlt } from "@/components/ui";
import {
  mobilenavbarVariant,
  containerVariants,
  mobileLinkVar,
} from "@/core/helpers/animations/menu-animations";
import DashNavigationMenu from "./dash-header-dropdown";
import UtilhNavigationMenu from "./marketing-header-dropdown";

export default function SiteHeader() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);

  const toggleHamburgerMenu = useCallback(() => {
    startTransition(() => {
      setHamburgerMenuIsOpen((prev) => !prev);
    });
  }, []);

  const closeHamburgerNavigation = useCallback(() => {
    setHamburgerMenuIsOpen(false);
  }, []);

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.classList.toggle("overflow-hidden", hamburgerMenuIsOpen);
    }

    window.addEventListener("orientationchange", closeHamburgerNavigation);
    window.addEventListener("resize", closeHamburgerNavigation);

    return () => {
      window.removeEventListener("orientationchange", closeHamburgerNavigation);
      window.removeEventListener("resize", closeHamburgerNavigation);
    };
  }, [hamburgerMenuIsOpen, closeHamburgerNavigation]);

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
            {menuItems.map((item) => (
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
            <UtilhNavigationMenu animationVariant="dropdownMenu" />
            <SignedIn>
              <DashNavigationMenu animationVariant="dropdownMenu" />
            </SignedIn>
          </nav>

          <div className="hidden md:flex ml-auto space-x-4 h-full items-center mr-4">
            <SignedOut>
              <BorderMagicButtonAlt href="/sign-in">
                Sign in
              </BorderMagicButtonAlt>
            </SignedOut>
            <SignedIn>
              <BorderMagicButtonAlt href="/dashboard">
                Dashboard
              </BorderMagicButtonAlt>
            </SignedIn>
            <UserButton />
          </div>
          <button className="ml-6 md:hidden" onClick={toggleHamburgerMenu}>
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
            `bg-background/70 fixed left-0 top-0 z-50 h-screen w-full overflow-auto backdrop-blur-md`,
            {
              "pointer-events-none": !hamburgerMenuIsOpen,
            },
          )}
        >
          <div className="container flex h-14 items-center justify-between">
            <Link className="text-md flex items-center" href="/">
              Remco Stoeten
            </Link>

            <button className="ml-6 md:hidden" onClick={toggleHamburgerMenu}>
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
            {menuItems.map((item) => (
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
