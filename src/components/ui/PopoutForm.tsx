"use client";

import { cn } from "@/core/helpers/cn";
import { motion } from "framer-motion";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

type FieldConfig = {
  type: "text" | "textarea" | "number" | "select";
  name: string;
  placeholder: string;
  prefix?: string;
  options?: string[];
};

type PopoutFormProps = {
  label: string;
  fields: FieldConfig[];
  onSubmit: (data: Record<string, string>) => void;
  defaultWidth?: number;
  defaultHeight?: number;
  expandedWidth?: number;
  expandedHeight?: number;
};

const InputField: React.FC<
  FieldConfig & { value: string; onChange: (value: string) => void }
> = ({ type, name, placeholder, prefix, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const inputClass =
    "w-full rounded-[6px] border-border !border-1 !border-red-400 px-2 py-[6px] text-sm text-white placeholder:text-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  if (type === "textarea") {
    return (
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} h-[60px] resize-none`}
      />
    );
  }

  if (type === "select") {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`${inputClass} flex items-center justify-between`}
        >
          {value || placeholder}
          <ChevronDownIcon
            size={16}
            className={cn("transition-transform", isOpen && "rotate-180")}
          />
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-neutral-800 rounded-md shadow-lg">
            {options?.map((option) => (
              <button
                key={option}
                type="button"
                className="w-full px-2 py-1 text-left text-sm text-white hover:bg-neutral-700"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      {prefix && (
        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/50">
          {prefix}
        </span>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} ${prefix ? "pl-6" : ""}`}
      />
    </div>
  );
};

export default function PopoutForm({
  label,
  fields,
  onSubmit,
  defaultWidth = 148,
  defaultHeight = 52,
  expandedWidth = 320,
  expandedHeight = 320,
}: PopoutFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleOpenSettings = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const requiredFields = fields.filter(
      (field) => field.name !== "description",
    );
    const isValid = requiredFields.every((field) =>
      formData[field.name]?.trim(),
    );

    if (isValid) {
      onSubmit(formData);
      setIsOpen(false);
      setFormData({});
    } else {
      toast.error("Please fill in all required fields");
    }
  };
  return (
    <motion.div
      animate={{
        height: isOpen ? expandedHeight : defaultHeight,
        width: isOpen ? expandedWidth : defaultWidth,
      }}
      transition={{
        type: "spring",
        duration: 0.6,
      }}
      className={cn(
        "overflow-hidden justify-between bg-neutral-900 rounded-2xl items-center text-neutral-50 p-2 shadow-lg",
        !isOpen && "hover:bg-neutral-800",
      )}
    >
      <div className="h-full">
        <div
          className={cn(
            "transition-all duration-300 flex flex-col justify-between gap-2 h-full transform-gpu",
          )}
        >
          <div
            className={cn(
              "transition-all duration-300 flex items-center justify-between gap-2 group transform-gpu",
            )}
          >
            {isOpen ? (
              <div className="text-neutral-200 text-sm font-medium py-1 px-2 rounded-md">
                {label}
              </div>
            ) : (
              <button
                type="button"
                className={cn(
                  "flex gap-2 p-2 transition-all text-nowrap font-medium text-neutral-500 group-hover:text-neutral-50 text-sm transform-gpu",
                )}
                onClick={() => setIsOpen(true)}
              >
                {label}
              </button>
            )}
            <button
              onClick={handleOpenSettings}
              type="button"
              className="size-8 text-neutral-400 hover:text-neutral-300 transition-colors duration-500 transform-gpu"
            >
              <PlusIcon
                className={cn(
                  "transition-transform duration-300 transform-gpu",
                  isOpen ? "rotate-45" : "rotate-0",
                )}
              />
            </button>
          </div>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, type: "spring" }}
              className="flex flex-col gap-.5 justify-between h-full p-2"
            >
              {fields.map((field, index) => (
                <React.Fragment key={field.name}>
                  <InputField
                    {...field}
                    value={formData[field.name] || ""}
                    onChange={(value) => handleChange(field.name, value)}
                  />
                  {index < fields.length - 1 && (
                    <hr className="border-neutral-700/40" />
                  )}
                </React.Fragment>
              ))}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="text-neutral-200 bg-primary py-1 font-medium px-2 rounded-lg"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
