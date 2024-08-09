"use client";

import { motion } from "framer-motion";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

const ThemeToggle = () => {
  const [selected, setSelected] = useState("dark");
  const { theme, setTheme } = useTheme();

  if (selected === "dark") {
    setTheme("dark");
  } else {
    setTheme("light");
  }

  return <SliderToggle selected={selected} setSelected={setSelected} />;
};

type SliderProps = {
  selected: string;
  setSelected: (value: string) => void;
};

const SliderToggle = ({ selected, setSelected }: SliderProps) => {
  return (
    <div className="fixed bottom-4 left-4  z-50 shadow-md">
      <div className="relative flex w-fit items-center rounded-full">
        {/* @ts-ignore */}
        <button
          className={`${TOGGLE_CLASSES} ${
            selected === "light" ? "text-slate-800" : "text-slate00"
          }`}
          onClick={() => {
            setSelected("light");
          }}
        >
          <MoonIcon className="relative z-10 text-lg md:text-sm" />
          {/* <span className="relative z-10">Light</span> */}
        </button>
        {/* @ts-ignore */}
        <button
          className={`${TOGGLE_CLASSES} ${
            selected === "dark" ? "text-white/70" : "text-slate-800"
          }`}
          onClick={() => {
            setSelected("dark");
          }}
        >
          <SunIcon className="relative z-10 text-lg md:text-sm" />
          {/* <span className="relative z-10">Dark</span> */}
        </button>
        <div
          className={`absolute inset-0 z-0 flex ${
            selected === "dark" ? "justify-end" : "justify-start"
          }`}
        >
          <motion.span
            layout
            transition={{ type: "spring", damping: 15, stiffness: 250 }}
            className="h-full w-1/2 rounded-full bg-gradient-to-r from-[#ff6a0000] to-theme-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
