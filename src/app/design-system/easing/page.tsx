"use client";

import Flex from "@/components/atoms/Flex";
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
import toast from "react-hot-toast";
import {
  BezierShowcaseDuration,
  ShowcaseCubicBeziers,
} from "~/src/core/helpers/animations/bezier-curves";

const CubicBezierShowcase = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(1500);
  const [copiedClass, setCopiedClass] = useState(null);
  const [count, setCount] = useState(0);

  const toggleAnimation = () => {
    setIsAnimating(true);
    repeatAnimation();
  };

  const copyToClipboard = (name) => {
    const fullClass = `trans-all-${selectedDuration}-${name}`;
    navigator.clipboard.writeText(fullClass).then(() => {
      setCopiedClass(fullClass);
      setTimeout(() => setCopiedClass(null), 2000);
    });
    toast.success(`Copied ${fullClass} to clipboard`);
  };

  function repeatAnimation() {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, selectedDuration);
  }

  function renderCount() {
    return <div>{count}</div>;
  }

  return (
    <div className="p-4 container">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={toggleAnimation}>
          {isAnimating ? "Stop Animation" : "Start Animation"}
        </Button>
        <Select onValueChange={(value) => setSelectedDuration(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={selectedDuration} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {BezierShowcaseDuration.map((duration) => (
                <SelectItem key={duration} value={duration.toString()}>
                  {duration}ms
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {ShowcaseCubicBeziers.map(({ name, bezier }) => (
          <div key={name} className="space-y-4 border p-4 rounded">
            <Flex items="center" gap="2" justify="between" margin="5px">
              <Flex items="center" gap="2">
                <h3 className="text-lg font-semibold">{name}</h3>
                <span className=" text-[12px]  flex items-center justify-center rounded-full size-5 border border-zinc-600">
                  {renderCount()}
                </span>
              </Flex>
              <div className="group">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => copyToClipboard(name)}
                  title="Copy class name"
                >
                  <Copy
                    size={16}
                    className="text-current group-hover:text-primary--darker group-hover:scale-110 transition-transform duration-300 ease-in-out"
                  />
                </Button>
              </div>
            </Flex>
            <div className="h-10 border-1 border-border border relative overflow-hidden">
              <div
                className={`w-6 h-12 bg-primary--darker absolute `}
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
