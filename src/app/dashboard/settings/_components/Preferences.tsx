"use cient";

import {
  Button,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Switch,
} from "@/components/ui";
import { Moon, Sun, X } from "lucide-react";
import { useState } from "react";

export default function Component() {
  const [theme, setTheme] = useState("tangerineBlaze");
  const [primaryColor, setPrimaryColor] = useState("#ff6c00");
  const [transparentSidebar, setTransparentSidebar] = useState(false);
  const [size, setSize] = useState("spacious");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const themeColor = "#ff6c00";

  return (
    <div
      className={`fixed inset-0 ${isDarkMode ? "bg-black/80" : "bg-white/80"} backdrop-blur-sm flex items-center justify-center`}
    >
      <div
        className={`${isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"} border rounded-xl shadow-lg w-full max-w-md p-6`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}
          >
            Appearance
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className={`${isDarkMode ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-black"}`}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h3
              className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"} mb-2`}
            >
              Color mode
            </h3>
            <div className="flex items-center justify-between bg-zinc-800 rounded-md p-2">
              <Button
                variant={isDarkMode ? "default" : "ghost"}
                size="sm"
                onClick={() => setIsDarkMode(true)}
                className="w-full"
              >
                <Moon className="h-4 w-4 mr-2" /> Dark
              </Button>
              <Button
                variant={!isDarkMode ? "default" : "ghost"}
                size="sm"
                onClick={() => setIsDarkMode(false)}
                className="w-full"
              >
                <Sun className="h-4 w-4 mr-2" /> Light
              </Button>
            </div>
          </div>

          <div>
            <h3
              className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"} mb-2`}
            >
              Size
            </h3>
            <RadioGroup
              value={size}
              onValueChange={setSize}
              className="flex space-x-2"
            >
              {["compact", "spacious", "large"].map((sizeOption) => (
                <div key={sizeOption} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={sizeOption}
                    id={sizeOption}
                    className="border-[#ff6c00] text-[#ff6c00]"
                    style={{
                      "--tw-ring-color": themeColor,
                      "--tw-ring-offset-shadow": `0 0 0 2px ${themeColor}`,
                    }}
                  />
                  <Label
                    htmlFor={sizeOption}
                    className={isDarkMode ? "text-white" : "text-black"}
                  >
                    {sizeOption.charAt(0).toUpperCase() + sizeOption.slice(1)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <h3
              className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"} mb-2`}
            >
              Interface theme
            </h3>
            <p
              className={`text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-600"} mb-4`}
            >
              Customise your workspace theme
            </p>
            <div className="grid grid-cols-3 gap-4">
              <ThemeOption
                name="Tangerine Blaze"
                color="#ff6c00"
                isSelected={theme === "tangerineBlaze"}
                onClick={() => setTheme("tangerineBlaze")}
                isDarkMode={isDarkMode}
              />
              <ThemeOption
                name="Rainbow Candy"
                color="#B667F1"
                isSelected={theme === "rainbowCandy"}
                onClick={() => setTheme("rainbowCandy")}
                isDarkMode={isDarkMode}
              />
              <ThemeOption
                name="Honeydew Punch"
                color="#65D9E4"
                isSelected={theme === "honeydewPunch"}
                onClick={() => setTheme("honeydewPunch")}
                isComingSoon
                isDarkMode={isDarkMode}
              />
            </div>
          </div>

          <div>
            <h3
              className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"} mb-2`}
            >
              Customize primary color
            </h3>
            <p
              className={`text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-600"} mb-4`}
            >
              Customize the look of your workspace. Feeling adventurous?
            </p>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className={`${isDarkMode ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-zinc-300 text-black"}`}
              />
              <div
                className="w-10 h-10 rounded"
                style={{ backgroundColor: primaryColor }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3
                  className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"}`}
                >
                  Transparent sidebar
                </h3>
                <p
                  className={`text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
                >
                  Add a transparency layer to your sidebar
                </p>
              </div>
              <Switch
                checked={transparentSidebar}
                onCheckedChange={setTransparentSidebar}
                className="data-[state=checked]:bg-[#ff6c00]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button
            variant="outline"
            className={`${isDarkMode ? "text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-white" : "text-zinc-600 border-zinc-300 hover:bg-zinc-100 hover:text-black"}`}
          >
            Cancel
          </Button>
          <Button className="bg-[#ff6c00] text-white hover:bg-[#e66000]">
            Save preferences
          </Button>
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
  isComingSoon = false,
  isDarkMode,
}) {
  return (
    <div
      className={`relative border ${isDarkMode ? "border-zinc-700" : "border-zinc-300"} rounded-lg p-2 cursor-pointer ${
        isSelected ? "ring-2 ring-[#ff6c00]" : ""
      } ${isComingSoon ? "opacity-50" : ""}`}
      onClick={isComingSoon ? undefined : onClick}
    >
      <div
        className={`w-full h-20 ${isDarkMode ? "bg-zinc-800" : "bg-zinc-100"} rounded mb-2 overflow-hidden`}
      >
        <div className="h-4 w-full flex space-x-1 p-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
        <div className="flex h-16">
          <div
            className={`w-1/3 ${isDarkMode ? "bg-zinc-700" : "bg-zinc-200"}`}
          ></div>
          <div className="w-2/3 p-2">
            <div
              className="w-full h-2 rounded-full mb-1"
              style={{ backgroundColor: color }}
            ></div>
            <div
              className={`w-3/4 h-2 rounded-full ${isDarkMode ? "bg-zinc-600" : "bg-zinc-300"}`}
            ></div>
          </div>
        </div>
      </div>
      <p
        className={`text-sm font-medium text-center ${isDarkMode ? "text-white" : "text-black"}`}
      >
        {name}
      </p>
      {isSelected && (
        <div className="absolute top-1 right-1 w-4 h-4 bg-[#ff6c00] rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-3 h-3 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
      {isComingSoon && (
        <div
          className={`absolute inset-0 ${isDarkMode ? "bg-zinc-900/80" : "bg-zinc-100/80"} backdrop-blur-sm flex items-center justify-center rounded-lg`}
        >
          <p
            className={`text-xs font-semibold ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
          >
            Coming soon
          </p>
        </div>
      )}
    </div>
  );
}
