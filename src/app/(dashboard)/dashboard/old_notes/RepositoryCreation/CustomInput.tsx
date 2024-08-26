import { motion } from "framer-motion";
import { useState } from "react";

interface CustomInputProps {
  onSubmit: (value: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center py-1.5 pr-1.5 pl-2.5 w-full rounded-md border border-solid bg-neutral-900 border-neutral-800"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Custom folder name"
          className="flex-grow bg-transparent text-zinc-100 text-sm leading-none focus:outline-none"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="ml-2 px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
        >
          Create
        </motion.button>
      </motion.div>
    </form>
  );
};

export default CustomInput;
