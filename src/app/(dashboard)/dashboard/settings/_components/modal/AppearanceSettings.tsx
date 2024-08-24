import { motion } from "framer-motion";
import { useState } from "react";

export default function AppearanceSettings() {
  const [formData, setFormData] = useState({
    theme: "tangerineBlaze",
    isDarkMode: false,
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold">Appearance Settings</h2>

        <h3 className="text-lg font-semibold mb-4">Choose Your Theme</h3>
        <div className="grid grid-cols-3 gap-4">
          <ThemeOption
            name="Tangerine Blaze"
            color="#ff6c00"
            isSelected={formData.theme === "tangerineBlaze"}
            onClick={() => handleChange("theme", "tangerineBlaze")}
            previewContent={renderWindowPreview("#ff6c00")}
          />
          <ThemeOption
            name="Rainbow Candy"
            color="#B667F1"
            isSelected={formData.theme === "rainbowCandy"}
            onClick={() => handleChange("theme", "rainbowCandy")}
            previewContent={renderWindowPreview("#B667F1")}
          />
          <ThemeOption
            name="Honeydew Punch"
            color="#65D9E4"
            isSelected={formData.theme === "honeydewPunch"}
            onClick={() => handleChange("theme", "honeydewPunch")}
            previewContent={renderWindowPreview("#65D9E4")}
          />
        </div>

        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            checked={formData.isDarkMode}
            onChange={(e) => handleChange("isDarkMode", e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm font-medium">Enable Dark Mode</label>
        </div>

        <ThemePreview theme={formData.theme} isDarkMode={formData.isDarkMode} />
      </motion.div>
    </>
  );
}

function renderWindowPreview(color) {
  return (
    <div className="w-full h-20 bg-zinc-800 rounded mb-2 overflow-hidden">
      <div className="h-4 w-full flex space-x-1 p-1">
        <div className="w-2 h-2 rounded-full bg-red-500"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
      </div>
      <div className="flex h-16">
        <div className="w-1/3 bg-zinc-700"></div>
        <div className="w-2/3 p-2">
          <div
            className="w-full h-2 rounded-full mb-1"
            style={{ backgroundColor: color }}
          ></div>
          <div className="w-3/4 h-2 rounded-full bg-zinc-600"></div>
        </div>
      </div>
    </div>
  );
}

function ThemeOption({
  name,
  color,
  isSelected,
  onClick,
  previewContent,
}: {
  name: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
  previewContent: React.ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg cursor-pointer flex flex-col items-center justify-center ${
        isSelected ? "border-4 border-blue-500" : "border-2 border-gray-300"
      }`}
      style={{ backgroundColor: color }}
    >
      {previewContent}
      <span className="text-white font-bold text-center">{name}</span>
    </div>
  );
}

function ThemePreview({
  theme,
  isDarkMode,
}: {
  theme: string;
  isDarkMode: boolean;
}) {
  const getThemeColor = () => {
    switch (theme) {
      case "tangerineBlaze":
        return "#ff6c00";
      case "rainbowCandy":
        return "#B667F1";
      case "honeydewPunch":
        return "#65D9E4";
      default:
        return "#ff6c00";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-8"
    >
      <h3 className="text-lg font-semibold mb-4">Theme Preview</h3>
      <div
        className={`p-6 rounded-lg ${
          isDarkMode ? "bg-zinc-800" : "bg-gray-100"
        }`}
      >
        <div
          className={`text-xl font-bold mb-4 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
          style={{ color: getThemeColor() }}
        >
          Welcome to Your Dashboard
        </div>
        <div
          className={`text-sm mb-4 ${
            isDarkMode ? "text-zinc-300" : "text-zinc-600"
          }`}
        >
          Here’s a quick overview of your site’s performance:
        </div>
        <div className="flex space-x-4 mb-6">
          <div
            className={`p-4 rounded-md text-white text-center flex-1 ${
              isDarkMode ? "bg-zinc-700" : "bg-zinc-200"
            }`}
          >
            <h4
              className="text-lg font-semibold"
              style={{ color: getThemeColor() }}
            >
              Visitors
            </h4>
            <p className="text-2xl font-bold">12,345</p>
          </div>
          <div
            className={`p-4 rounded-md text-white text-center flex-1 ${
              isDarkMode ? "bg-zinc-700" : "bg-zinc-200"
            }`}
          >
            <h4
              className="text-lg font-semibold"
              style={{ color: getThemeColor() }}
            >
              Sales
            </h4>
            <p className="text-2xl font-bold">987</p>
          </div>
          <div
            className={`p-4 rounded-md text-white text-center flex-1 ${
              isDarkMode ? "bg-zinc-700" : "bg-zinc-200"
            }`}
          >
            <h4
              className="text-lg font-semibold"
              style={{ color: getThemeColor() }}
            >
              Revenue
            </h4>
            <p className="text-2xl font-bold">$45,678</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-md text-white text-sm"
            style={{ backgroundColor: getThemeColor() }}
          >
            Manage Settings
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-md text-sm ${
              isDarkMode ? "bg-zinc-700 text-white" : "bg-zinc-200 text-black"
            }`}
          >
            View Reports
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
