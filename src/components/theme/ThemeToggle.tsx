"use client";

import { motion } from "framer-motion";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setTheme(theme === "dark" ? "dark" : "light");
    }
  }, [theme, setTheme, mounted]);

  if (!mounted) {
    return null;
  }

  return <SliderToggle selected={theme || "dark"} setSelected={setTheme} />;
};

type SliderProps = {
  selected: string;
  setSelected: (value: string) => void;
};

const SliderToggle = ({ selected, setSelected }: SliderProps) => {
  return (
    <div className="fixed bottom-4 left-4 z-50 shadow-md">
      <div className="relative flex w-fit items-center rounded-full">
        <button
          className={`${TOGGLE_CLASSES} ${
            selected === "light" ? "text-slate-800" : "text-slate-100"
          }`}
          onClick={() => setSelected("light")}
        >
          <MoonIcon className="relative z-10 text-lg md:text-sm" />
        </button>
        <button
          className={`${TOGGLE_CLASSES} ${
            selected === "dark" ? "text-white/70" : "text-slate-800"
          }`}
          onClick={() => setSelected("dark")}
        >
          <SunIcon className="relative z-10 text-lg md:text-sm" />
        </button>
        <div
          className={`absolute inset-0 z-0 flex ${
            selected === "dark" ? "justify-end" : "justify-start"
          }`}
        >
          <motion.span
            layout
            transition={{ type: "spring", damping: 15, stiffness: 250 }}
            className="h-full w-1/2 rounded-full bg-gradient-to-r from-[#ff6a0000] to-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
