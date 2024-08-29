"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Moon, Sun, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  updateUserBio,
  updateUserDateOfBirth,
  updateUserPreloader,
} from "~/src/core/server/server-actions/onboarding";

const steps = ["Profile", "Preferences", "Welcome"];

export default function OnboardingFlow() {
  const { user } = useUser();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [greeting, setGreeting] = useState("");
  const [formData, setFormData] = useState({
    name: user?.firstName || "",
    bio: "",
    dob: "",
    theme: "tangerineBlaze",
    primaryColor: "#ff6c00",
    showPreloader: true,
    size: "spacious",
    isDarkMode: true,
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = async () => {
    if (currentStep === 0) {
      await updateUserBio(formData.bio);
      await updateUserDateOfBirth(new Date(formData.dob).getTime());
    } else if (currentStep === 1) {
      await updateUserPreloader(formData.showPreloader);
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    await updateUserPreloader(formData.showPreloader);
    router.push("/dashboard");
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white p-8 flex items-center justify-center"
    >
      <div className="w-full max-w-md">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-2 text-center"
        >
          Welcome to Our Platform
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-center mb-8"
        >
          {greeting}, {user?.firstName || "there"}!
        </motion.p>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-zinc-900 p-8 rounded-lg relative"
        >
          <Button
            onClick={handleCancel}
            variant="ghost"
            className="absolute top-2 right-2 text-zinc-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <StepProfile
                key="profile"
                formData={formData}
                onChange={handleInputChange}
              />
            )}
            {currentStep === 1 && (
              <StepPreferences
                key="preferences"
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {currentStep === 2 && (
              <StepWelcome key="welcome" name={formData.name} />
            )}
          </AnimatePresence>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex justify-between items-center"
          >
            {currentStep > 0 && (
              <Button
                onClick={handlePrevious}
                variant="outline"
                className="text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                className="bg-[#ff6c00] hover:bg-[#ff8c00] text-white ml-auto"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-[#ff6c00] hover:bg-[#ff8c00] text-white ml-auto"
              >
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 flex justify-center"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              className={`w-3 h-3 rounded-full mx-1 ${index === currentStep ? "bg-[#ff6c00]" : "bg-zinc-700"
                }`}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function StepProfile({
  formData,
  onChange,
}: {
  formData: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold">Your Profile</h2>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Your name"
          className="w-full bg-zinc-800 border-zinc-700 text-white"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={onChange}
          placeholder="Tell us about yourself"
          className="w-full h-32 bg-zinc-800 border-zinc-700 text-white"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dob">Date of Birth</Label>
        <Input
          id="dob"
          type="date"
          name="dob"
          value={formData.dob}
          onChange={onChange}
          className="w-full bg-zinc-800 border-zinc-700 text-white"
        />
      </div>
    </motion.div>
  );
}

function StepPreferences({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}) {
  const handleChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold">Customize your experience</h2>

      <div>
        <h3 className="text-lg font-semibold mb-2">Color mode</h3>
        <div className="flex items-center justify-between bg-zinc-800 rounded-md p-2">
          <Button
            variant={formData.isDarkMode ? "outline" : "default"}
            size="sm"
            onClick={() => handleChange("isDarkMode", false)}
            className="w-full bg-zinc-700 text-white hover:bg-zinc-600"
          >
            <Sun className="h-4 w-4 mr-2" /> Light
          </Button>
          <Button
            variant={formData.isDarkMode ? "default" : "outline"}
            size="sm"
            onClick={() => handleChange("isDarkMode", true)}
            className="w-full bg-zinc-700 text-white hover:bg-zinc-600"
          >
            <Moon className="h-4 w-4 mr-2" /> Dark
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Size</h3>
        <RadioGroup
          value={formData.size}
          onValueChange={(value) => handleChange("size", value)}
          className="flex space-x-2"
        >
          {["compact", "spacious", "large"].map((sizeOption) => (
            <div key={sizeOption} className="flex items-center space-x-2">
              <RadioGroupItem
                value={sizeOption}
                id={sizeOption}
                className="border-[#ff6c00] text-[#ff6c00]"
              />
              <Label htmlFor={sizeOption} className="text-white">
                {sizeOption.charAt(0).toUpperCase() + sizeOption.slice(1)}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Interface theme</h3>
        <div className="grid grid-cols-3 gap-4">
          <ThemeOption
            name="Tangerine Blaze"
            color="#ff6c00"
            isSelected={formData.theme === "tangerineBlaze"}
            onClick={() => handleChange("theme", "tangerineBlaze")}
          />
          <ThemeOption
            name="Rainbow Candy"
            color="#B667F1"
            isSelected={formData.theme === "rainbowCandy"}
            onClick={() => handleChange("theme", "rainbowCandy")}
          />
          <ThemeOption
            name="Honeydew Punch"
            color="#65D9E4"
            isSelected={formData.theme === "honeydewPunch"}
            onClick={() => handleChange("theme", "honeydewPunch")}
          />
        </div>
      </div>

      <ThemePreview theme={formData.theme} isDarkMode={formData.isDarkMode} />

      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Show preloader every page</h3>
            <p className="text-sm text-zinc-400">
              Display a loading animation when navigating between pages
            </p>
          </div>
          <Switch
            checked={formData.showPreloader}
            onCheckedChange={(value) => handleChange("showPreloader", value)}
            className="data-[state=checked]:bg-[#ff6c00]"
          />
        </div>
      </div>
    </motion.div>
  );
}

function StepWelcome({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold">Welcome aboard, {name}!</h2>
      <p>
        Thank you for completing the onboarding process. We're excited to have
        you with us!
      </p>
      <p>Click the button below to go to your dashboard and start exploring.</p>
    </motion.div>
  );
}

function ThemeOption({
  name,
  color,
  isSelected,
  onClick,
}: {
  name: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative border border-zinc-700 rounded-lg p-2 cursor-pointer ${isSelected ? "ring-2 ring-[#ff6c00]" : ""
        }`}
      onClick={onClick}
    >
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
      <p className="text-sm font-medium text-center text-white">{name}</p>
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-1 right-1 w-4 h-4 bg-[#ff6c00] rounded-full flex items-center justify-center"
        >
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
        </motion.div>
      )}
    </motion.div>
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
      className="mt-6"
    >
      <h3 className="text-lg font-semibold mb-2">Theme Preview</h3>
      <div
        className={`p-4 rounded-lg ${isDarkMode ? "bg-zinc-800" : "bg-white"}`}
      >
        <div
          className={`text-lg font-bold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}
          style={{ color: getThemeColor() }}
        >
          Sample Header
        </div>
        <div
          className={`text-sm mb-2 ${isDarkMode ? "text-zinc-300" : "text-zinc-600"}`}
        >
          This is how your content will look with the selected theme.
        </div>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 rounded-md text-white text-sm"
            style={{ backgroundColor: getThemeColor() }}
          >
            Primary Button
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1 rounded-md text-sm ${isDarkMode ? "bg-zinc-700 text-white" : "bg-zinc-200 text-black"}`}
          >
            Secondary Button
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
