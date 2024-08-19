"use client";

import { Flex } from "@/components/atoms/Flex";
import Paragraph from "@/components/atoms/Paragraph";
import { createFolder } from "@/core/server/server-actions/folder-actions";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { OnboardingProps } from "../types.notes";

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);

  const handleCreateFolder = async (name: string) => {
    try {
      await createFolder(name);
      toast.success("Folder created successfully");
      onComplete();
    } catch (error) {
      toast.error("Failed to create folder");
    }
  };

  const steps = [
    {
      title: "Let's create your first folder",
      description: "Start blank or choose one of our templates",
      options: [
        { name: "Blank", action: () => handleCreateFolder("My First Folder") },
        { name: "Work", action: () => handleCreateFolder("Work") },
        { name: "Personal", action: () => handleCreateFolder("Personal") },
      ],
    },
    {
      title: "Templates",
      options: [
        { name: "Blog", action: () => handleCreateFolder("Blog") },
        {
          name: "Website",
          action: () => handleCreateFolder("Website"),
          disabled: true,
        },
        {
          name: "E-Commerce",
          action: () => handleCreateFolder("E-Commerce"),
          disabled: true,
        },
      ],
    },
  ];

  return (
    <Flex
      dir="col"
      className="bg-[#121212] text-white p-8 rounded-lg max-w-md mx-auto"
    >
      <Paragraph size="2xl" weight="bold" className="mb-4">
        {steps[step].title}
      </Paragraph>
      <Paragraph size="sm" className="mb-6 text-gray-400">
        {steps[step].description}
      </Paragraph>
      {steps[step].options.map((option, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full p-3 mb-2 rounded-lg text-left ${option.disabled ? "bg-gray-800 text-gray-500" : "bg-[#1E1E1E] hover:bg-[#2A2A2A]"}`}
          onClick={option.action}
          disabled={option.disabled}
        >
          <Flex justify="between" items="center">
            <span>{option.name}</span>
            {option.disabled && (
              <span className="text-xs text-gray-500">Soon</span>
            )}
            {!option.disabled && <span>→</span>}
          </Flex>
        </motion.button>
      ))}
      {step === 0 && (
        <button
          className="mt-4 text-gray-400 hover:text-white"
          onClick={() => setStep(1)}
        >
          See more templates
        </button>
      )}
    </Flex>
  );
}
