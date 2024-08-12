"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dropdownMenuItems } from "@/core/data/header-menu-items";
import { menuAnimationVariants } from "animation-variants";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React from "react";

type DashNavigationMenuProps = {
  animationVariant?: keyof typeof menuAnimationVariants;
};

const DashNavigationMenu: React.FC<DashNavigationMenuProps> = ({
  animationVariant = "elegant",
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const currentVariant = menuAnimationVariants[animationVariant];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-auto px-3 text-text hover:text-text-accent hover:bg-section-hover transition-all duration-300 ease-in-out"
        >
          Menu
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
              {dropdownMenuItems.map((item, index) => (
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
};

export default DashNavigationMenu;
