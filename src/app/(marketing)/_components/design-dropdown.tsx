"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { designSystemItems } from "@/core/data/menu-items";
import { menuAnimationVariants } from "@/core/helpers/animations/menu-animations";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type DesignSystemNavigationMenuProps = {
  animationVariant?: keyof typeof menuAnimationVariants;
};

// Default animation variant
const defaultVariant = {
  menu: {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
  item: {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  },
};

export default function DesignSystemNavigationMenu({
  animationVariant = "menu",
}: DesignSystemNavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentVariant =
    menuAnimationVariants[animationVariant] || defaultVariant;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-auto px-3 text-text hover:text-text-accent hover:bg-section-hover transition-all duration-300 ease-in-out"
        >
          DesignSystem
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.6, 0.05, -0.01, 0.9] }}
          >
            <ChevronDown className="ml-1 h-4 w-4" />
          </motion.span>
        </Button>
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
              {designSystemItems.map((item, index) => (
                <DropdownMenuItem key={item.href} asChild>
                  <motion.a
                    href={item.href}
                    className="block px-4 py-2 text-text hover:text-text-accent hover:bg-active-state transition-all duration-300 ease-in-out"
                    variants={currentVariant.item}
                    custom={index}
                  >
                    {item.label}
                  </motion.a>
                </DropdownMenuItem>
              ))}
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}
