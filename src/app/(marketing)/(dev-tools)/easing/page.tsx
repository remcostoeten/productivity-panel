"use client";

import { Flex } from "@/components/atoms/Flex";
import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Copy } from "lucide-react";
import { useState } from "react";

const cubicBeziers = [
  { name: "in-quad", bezier: [0.55, 0.085, 0.68, 0.53] },
  { name: "in-cubic", bezier: [0.55, 0.055, 0.675, 0.19] },
  { name: "in-quart", bezier: [0.895, 0.03, 0.685, 0.22] },
  { name: "in-quint", bezier: [0.755, 0.05, 0.855, 0.06] },
  { name: "in-expo", bezier: [0.95, 0.05, 0.795, 0.035] },
  { name: "in-circ", bezier: [0.6, 0.04, 0.98, 0.335] },
  { name: "out-quad", bezier: [0.25, 0.46, 0.45, 0.94] },
  { name: "out-cubic", bezier: [0.215, 0.61, 0.355, 1] },
  { name: "out-quart", bezier: [0.165, 0.84, 0.44, 1] },
  { name: "out-quint", bezier: [0.23, 1, 0.32, 1] },
  { name: "out-expo", bezier: [0.19, 1, 0.22, 1] },
  { name: "out-circ", bezier: [0.075, 0.82, 0.165, 1] },
  { name: "in-out-quad", bezier: [0.455, 0.03, 0.515, 0.955] },
  { name: "in-out-cubic", bezier: [0.645, 0.045, 0.355, 1] },
  { name: "in-out-quart", bezier: [0.77, 0, 0.175, 1] },
  { name: "in-out-quint", bezier: [0.86, 0, 0.07, 1] },
  { name: "in-out-expo", bezier: [1, 0, 0, 1] },
  { name: "in-out-circ", bezier: [0.785, 0.135, 0.15, 0.86] },
];

const durations = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1250, 1500, 1750, 2000,
  2500, 3000,
];

const CubicBezierShowcase = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(1000);
  const [copiedClass, setCopiedClass] = useState(null);
  const [count, setCount] = useState(0);

  const toggleAnimation = () => {
    setIsAnimating(true); // {{ edit_1 }}
    repeatAnimation(); // Start the animation
  };

  const copyToClipboard = (name) => {
    const fullClass = `trans-all-${selectedDuration}-${name}`;
    navigator.clipboard.writeText(fullClass).then(() => {
      setCopiedClass(fullClass);
      setTimeout(() => setCopiedClass(null), 2000);
    });
  };

  function repeatAnimation() {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1); // {{ edit_2 }}
    }, selectedDuration);
  }

  function renderCount() {
    return <div>{count}</div>; // {{ edit_3 }}
  }

  return (
    <div className="p-4 container">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={toggleAnimation}>
          {isAnimating ? "Stop Animation" : "Start Animation"}
        </Button>
        <Select onValueChange={(value) => setSelectedDuration(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {durations.map((duration) => (
                <SelectItem key={duration} value={duration.toString()}>
                  {duration}ms
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {cubicBeziers.map(({ name, bezier }) => (
          <div key={name} className="space-y-4 border p-4 rounded">
            <Flex items="center" gap="2" justify="between" margin="5px">
              <Flex items="center" gap="2">
                <h3 className="text-lg font-semibold">{name}</h3>
                <span className=" text-[12px]  flex items-center justify-center rounded-full size-5 border border-zinc-600">
                  {renderCount()}
                </span>
              </Flex>
              <button
                onClick={() => copyToClipboard(name)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                title="Copy class name"
              >
                <Copy size={16} />
              </button>
            </Flex>
            <div className="h-10 border-1 border-border border relative overflow-hidden">
              <div
                className={`w-6 h-12 bg-primary absolute `}
                style={{
                  left: "0",
                  animation: isAnimating
                    ? `moveForward ${selectedDuration}ms cubic-bezier(${bezier.join(",")}) infinite`
                    : "none",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CubicBezierShowcase;
