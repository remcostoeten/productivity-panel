"use client";

import { createFolder } from "@/core/server/server-actions/folder-actions";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import CustomInput from "./CustomInput";
import OptionButton from "./OptionButton";
import TemplateSection from "./TemplateSection";

interface RepositoryCreationProps {
  onComplete: () => void;
}

const RepositoryCreationComponent: React.FC<RepositoryCreationProps> = ({
  onComplete,
}) => {
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

  const options = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/53b90812224a1228afb268eaa795fe2f7dd4ce87c8f7eb7e1b081d1eb50e7516?placeholderIfAbsent=true&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197",
      label: "Blank",
      action: () => handleCreateFolder("My First Folder"),
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4f69858fa1dd1073d1b905b8e4978cdd8268f1bdd94cbb4553704ee20e2e0575?placeholderIfAbsent=true&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197",
      label: "Work",
      action: () => handleCreateFolder("Work"),
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/581f10ac5336a15fce1542007e8b21ef5fbf50a78e94adf41b1ade67d813248f?placeholderIfAbsent=true&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197",
      label: "Personal",
      action: () => handleCreateFolder("Personal"),
    },
  ];

  const templates = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/74593872cee04f0883ac51b92c2902dccfefd7a5eccbcb035c0705b8a6d926a7?placeholderIfAbsent=true&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197",
      label: "Blog",
      action: () => handleCreateFolder("Blog"),
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/eecbb6a606d4ed5d6f41942340c2e5a29eea78edc27ffa1d7bb0f70ba6b18d56?placeholderIfAbsent=true&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197",
      label: "Website",
      action: () => handleCreateFolder("Website"),
      soon: true,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3116c836aacade2dff1bbfa09b438048c2a099ab690c1ecfd6917779730b405e?placeholderIfAbsent=true&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197",
      label: "E-commerce",
      action: () => handleCreateFolder("E-Commerce"),
      soon: true,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center self-stretch px-28 py-16 rounded-2xl border border-solid bg-neutral-950 border-neutral-800 max-md:px-5"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="px-96 pb-px text-lg font-medium leading-none text-center text-zinc-100 max-md:px-5 max-md:max-w-full"
      >
        Let's create your first repo
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="px-80 pb-7 text-sm leading-none text-center text-stone-500 max-md:px-5 max-md:max-w-full"
      >
        Start blank or choose one of our templates
      </motion.p>
      <div className="flex flex-col items-center pr-72 pl-72 max-w-full w-[956px] max-md:px-5">
        <div className="flex flex-col w-full max-w-[353px]">
          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div
                key="options"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                {options.map((option, index) => (
                  <OptionButton
                    key={index}
                    icon={option.icon}
                    label={option.label}
                    onClick={option.action}
                  />
                ))}
                <CustomInput onSubmit={handleCreateFolder} />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 text-gray-400 hover:text-white"
                  onClick={() => setStep(1)}
                >
                  See more templates
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="templates"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <TemplateSection templates={templates} />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 text-gray-400 hover:text-white"
                  onClick={() => setStep(0)}
                >
                  Back to previous templates
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default RepositoryCreationComponent;
