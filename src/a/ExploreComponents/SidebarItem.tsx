"use client";

import { motion } from "framer-motion";

interface SidebarItemProps {
  icon: string;
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  isActive = false,
  onClick,
}) => (
  <motion.div
    className={`flex justify-between items-center py-1.5 pr-4 w-full rounded min-h-[28px] ${
      isActive ? "bg-zinc-900" : ""
    }`}
    whileHover={{ backgroundColor: "#2A2A2A" }}
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyPress={(e) => e.key === "Enter" && onClick && onClick()}
  >
    <div className="flex flex-col items-start self-stretch pl-1 my-auto min-h-[19px] w-[23px]">
      <div className="flex justify-center items-center p-0.5 rounded-sm min-h-[19px] w-[19px]">
        <img
          loading="lazy"
          src={icon}
          alt={`${text} icon`}
          className="object-contain self-stretch my-auto aspect-square w-[15px]"
        />
      </div>
    </div>
    <div className="flex self-stretch my-auto min-h-[15px]" />
    <div className="flex flex-col self-stretch pl-1.5 my-auto text-sm leading-loose whitespace-nowrap text-stone-300 w-[172px]">
      <div className="overflow-hidden py-1.5 w-full max-md:pr-5">{text}</div>
    </div>
    <div className="flex shrink-0 self-stretch my-auto w-px h-px" />
  </motion.div>
);

export default SidebarItem;
