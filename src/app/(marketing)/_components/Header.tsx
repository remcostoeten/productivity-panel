"use client";

import BrandLogo from "@/components/theme/BrandLogo";
import { Button, Tooltip, TooltipTrigger } from "@/components/ui";
import { ModernKbd } from "@/components/ui/kbd";
import UniqueBadge from "@/components/ui/UniqueBadge";
import menuItems, {
  dashboardMenuItems,
  designSystemItems,
} from "@/core/data/landing-menu-items";
import {
  containerVariants,
  mobileLinkVar,
  mobilenavbarVariant,
} from "@/core/helpers/animations/menu-animations";
import { cn } from "@/core/helpers/cn";
import { TooltipContent } from "@c/ui";
import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/nextjs";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { AlignJustify, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import Flex from "~/src/components/atoms/Flex";
import ShinyCircularButton from "~/src/components/effect/button/circular-btn";
import SettingsModal from "../../(dashboard)/dashboard/settings/_components/modal/SettingsModal";
import ReusableDropdownMenu from "./dash-header-dropdown";

const useKeyboardShortcut = () => {
  const router = useRouter();
  const { signOut, openSignIn } = useClerk();

  const handleLogin = useCallback(() => {
    console.log("Logging in...");
    openSignIn();
  }, [openSignIn]);

  const handleLogout = useCallback(() => {
    console.log("Logging out...");
    signOut(() => router.push("/"));
  }, [signOut, router]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const modifierKey = event.ctrlKey || event.metaKey;

      if (modifierKey && event.key === "l") {
        event.preventDefault();
        handleLogin();
      } else if (modifierKey && event.key === "o") {
        event.preventDefault();
        handleLogout();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleLogin, handleLogout]);

  return { handleLogin, handleLogout };
};

export default function Header() {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [isModalOpen, setModalOpen] = useState(false);
  const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const pathname = usePathname();

  if (pathname.includes("dash")) {
    return null;
  }

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

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <header className="px-8 sm:px-0 animate-fade-in fixed left-0 top-0 z-50 w-full border-seperator-translate-y-4 border-b opacity-0 backdrop-blur-md [--animation-delay:600ms]">
        <div className="px-2 lg:px-1 container flex h-14 items-center justify-between z-20  max-w-contain   er mx-auto">
          <Link
            className="space-x-4 text-md flex items-center transition-all duration-500 origin-top"
            href="/"
          >
            <BrandLogo />
            <UniqueBadge
              text="Beta"
              textColor="text-white/40"
              className="animate-pulse"
              size="sm"
            />
          </Link>
          <nav className="hidden md:flex justify-center items-center content-center w-full">
            <ReusableDropdownMenu
              label="Design System"
              menuItems={designSystemItems}
              animationVariant="dropdownMenu"
            />
            <SignedIn>
              <ReusableDropdownMenu
                label="Dashboard"
                menuItems={dashboardMenuItems}
                animationVariant="dropdownMenu"
              />
            </SignedIn>
          </nav>

          <div className="hidden md:flex ml-auto space-x-4 h-full items-center mr-4">
            <SignedOut>
              <Tooltip>
                <TooltipTrigger>
                  <Flex gap="4">
                    <ShinyCircularButton href="/sign-in">
                      Login
                    </ShinyCircularButton>
                  </Flex>
                </TooltipTrigger>
                <TooltipContent>
                  <ModernKbd variant="login" />
                </TooltipContent>
              </Tooltip>
            </SignedOut>
            <Tooltip>
              <TooltipTrigger>
                <UserButton />
              </TooltipTrigger>
              <TooltipContent>
                <ModernKbd variant="logout" />
              </TooltipContent>
            </Tooltip>
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
                className="border-b py-0.5 pl-6 md:border-none"
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
            <Button onClick={openModal} className="bg-blue-500 text-white">
              Open Settings
            </Button>
            <SettingsModal isOpen={isModalOpen} onClose={closeModal} />
            <SignedOut>
              <motion.li
                variants={mobileLinkVar}
                key="sign-in"
                className="border-grey-dark border-b py-0.5 pl-6 md:border-none"
              >
                <Link
                  className="flex h-[var(--navigation-height)] w-full items-center text-xl transition-[color,transform] duration-300 md:translate-y-0 md:text-sm md:transition-colors text-muted-foreground hover:text-foreground [&_a]:translate-y-0"
                  href="/sign-in"
                >
                  Sign in
                </Link>
              </motion.li>
            </SignedOut>
            <SignedIn>
              <motion.li
                variants={mobileLinkVar}
                key="user-button"
                className="border-grey-dark border-b py-0.5 pl-6 md:border-none"
              >
                <UserButton />
              </motion.li>
            </SignedIn>
          </motion.ul>
        </motion.nav>
      </AnimatePresence>
      {notification && (
        <div className="fixed top-4 right-4 bg-primary text-white p-2 rounded">
          {notification}
        </div>
      )}
    </>
  );
}
