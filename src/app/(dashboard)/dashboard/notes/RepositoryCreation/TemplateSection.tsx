import React from "react";
import { motion } from "framer-motion";

interface Template {
  icon: string;
  label: string;
  action: () => void;
  soon?: boolean;
}

interface TemplateSectionProps {
  templates: Template[];
}

const TemplateSection: React.FC<TemplateSectionProps> = ({ templates }) => {
  return (
    <>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-4 pb-px text-sm font-medium leading-loose whitespace-nowrap text-zinc-100"
      >
        Templates
      </motion.h2>
      {templates.map((template, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="flex flex-col pt-3"
        >
          <div className="flex relative flex-col w-full">
            <motion.button
              whileHover={template.soon ? {} : { scale: 1.05 }}
              whileTap={template.soon ? {} : { scale: 0.95 }}
              className={`flex z-0 items-center py-3.5 pr-1.5 pl-2.5 w-full rounded-md border border-solid ${
                template.soon
                  ? "bg-neutral-900 bg-opacity-40 border-neutral-800 border-opacity-40 cursor-not-allowed"
                  : "bg-neutral-900 border-neutral-800"
              } min-h-[42px]`}
              disabled={template.soon}
              onClick={template.action}
            >
              <div className="flex flex-col items-start self-stretch pr-2 my-auto w-6">
                <motion.img
                  loading="lazy"
                  src={template.icon}
                  alt=""
                  className="object-contain w-4 aspect-square"
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex flex-col flex-1 shrink items-start self-stretch pr-64 my-auto text-sm leading-none text-center capitalize whitespace-nowrap basis-0 min-w-[28px] text-zinc-100">
                <span>{template.label}</span>
              </div>
            </motion.button>
            {template.soon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute right-2 py-1 pr-1 pl-1.5 text-xs font-medium leading-loose whitespace-nowrap border border-solid border-neutral-900 inset-y-[11px] left-[307px] rounded-[96px] text-neutral-400 w-[39px]"
              >
                SOON
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default TemplateSection;
