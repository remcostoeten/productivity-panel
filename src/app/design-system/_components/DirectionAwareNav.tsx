"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { designSystemItems } from "~/src/core/data/landing-menu-items";

const Tab = ({ href, label, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverDirection, setHoverDirection] = useState("");

  const handleMouseEnter = (event) => {
    const { clientX, clientY, target } = event;
    const { left, top, right, bottom } = target.getBoundingClientRect();

    const horizontalCenter = (left + right) / 2;
    const verticalCenter = (top + bottom) / 2;

    if (clientX < horizontalCenter) {
      setHoverDirection("left");
    } else {
      setHoverDirection("right");
    }

    if (clientY < verticalCenter) {
      setHoverDirection((prev) => (prev === "left" ? "top-left" : "top-right"));
    } else {
      setHoverDirection((prev) =>
        prev === "left" ? "bottom-left" : "bottom-right",
      );
    }

    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link href={href} passHref>
      <motion.div
        className={`relative px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 ease-in-out
          ${isActive ? "bg-dark-section--lighter text-white" : "bg-transparent text-muted hover:text-white"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="relative z-10">{label}</span>
        {!isActive && isHovered && (
          <motion.div
            className={`absolute inset-0 rounded-md`}
            layoutId="hoverTab"
            initial={{
              opacity: 0,
              translateX: hoverDirection.includes("left") ? -10 : 10,
              translateY: hoverDirection.includes("top") ? -10 : 10,
            }}
            animate={{ opacity: 1, translateX: 0, translateY: 0 }}
            exit={{
              opacity: 0,
              translateX: hoverDirection.includes("left") ? -10 : 10,
              translateY: hoverDirection.includes("top") ? -10 : 10,
            }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: "var(--dark-section--lighter)", // Use a color from your Tailwind config
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", // Add shadow for more visibility
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default function DesignSystemTabs() {
  const pathname = usePathname();

  return (
    <nav className="w-full  py-2 border-b border-seperator">
      <div className="container mx-auto">
        <motion.div
          className="flex space-x-1 overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {designSystemItems.map((item) => (
            <Tab
              key={item.href}
              href={item.href}
              label={item.alias}
              isActive={pathname === item.href}
            />
          ))}
        </motion.div>
      </div>
    </nav>
  );
}
