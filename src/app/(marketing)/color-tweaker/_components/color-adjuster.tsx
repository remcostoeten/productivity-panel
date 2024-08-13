"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { dropdownMenuItems } from "@/core/data/header-menu-items";
import { menuAnimationVariants } from "@/core/helpers/animations/menu-animations";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React from "react";

type DashNavigationMenuProps = {
  animationVariant?: keyof typeof menuAnimationVariants;
};

function MenuButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant="ghost"
      className="h-8 w-auto px-3 text-text hover:text-text-accent hover:bg-section-hover transition-all duration-300 ease-in-out"
      onClick={onClick}
    >
      Menu
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: [0.6, 0.05, -0.01, 0.9] }}
      >
        <ChevronDown className="ml-1 h-4 w-4" />
      </motion.span>
    </Button>
  );
}

function MenuItem({
  href,
  label,
  variant,
  index,
}: {
  href: string;
  label: string;
  variant: any;
  index: number;
}) {
  return (
    <DropdownMenuItem asChild>
      <motion.a
        href={href}
        className="block px-4 py-2 text-text hover:text-text-accent hover:bg-active-state transition-all duration-300 ease-in-out"
        variants={variant}
        custom={index}
      >
        {label}
      </motion.a>
    </DropdownMenuItem>
  );
}

export default function DashNavigationMenu({
  animationVariant = "elegant",
}: DashNavigationMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const currentVariant = menuAnimationVariants[animationVariant];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <MenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </DropdownMenuTrigger>
      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent
            align="end"
            className="w-[200px] bg-section border border-border-hover rounded-lg shadow-lg overflow-hidden"
            asChild
          >
            <motion.div
              variants={currentVariant.menu}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {dropdownMenuItems.map((item, index) => (
                <MenuItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  variant={currentVariant.item}
                  index={index}
                />
              ))}
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}
