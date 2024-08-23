"use client";

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Flex } from "~/src/components/atoms/Flex";
import CodeHighlight from "~/src/components/ui/CodeHighlight/CodeHighlight";
import { useToast } from "~/src/core/hooks/useToast";
import { DesignSystemWrapper } from "../_components/DesignSystemWrapper";
import { ShowcaseCubicBeziers } from "~/src/core/helpers/animations/bezier-curves";

export default function ToastDemoPage() {
  const [position, setPosition] = useState("top-right");
  const [duration, setDuration] = useState(4000);
  const [selectedToastCode, setSelectedToastCode] = useState("");
  const [items, setItems] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 5" },
  ]);
  const [currentBezierIndex, setCurrentBezierIndex] = useState(0);
  const toast = useToast();

  const deleteItem = (id) => {
    const deletedItem = items.find((item) => item.id === id);
    setItems(items.filter((item) => item.id !== id));

    toast.undo({
      message: `Deleted "${deletedItem.name}"`,
      onUndo: () => {
        setItems((prevItems) => [...prevItems, deletedItem]);
        toast.success({ message: `Restored "${deletedItem.name}"` });
      },
    });
  };

  const demoToasts = [
    {
      label: "Normal",
      action: () => toast.showToast({ message: "Normal toast" }),
      code: `toast.showToast({ message: "Normal toast" })`,
    },
    {
      label: "Success",
      action: () => toast.success({ message: "Success toast" }),
      code: `toast.success({ message: "Success toast" })`,
    },
    {
      label: "Error",
      action: () => toast.error({ message: "Error toast" }),
      code: `toast.error({ message: "Error toast" })`,
    },
    {
      label: "Loading",
      action: () => toast.loading({ message: "Loading..." }),
      code: `toast.loading({ message: "Loading..." })`,
    },
    {
      label: "Undo",
      action: () =>
        toast.undo({
          message: "Action performed",
          onUndo: () => toast.success({ message: "Action undone" }),
        }),
      code: `toast.undo({ 
  message: "Action performed", 
  onUndo: () => toast.success({ message: "Action undone" })
})`,
    },
  ];

  const handleNextBezier = () => {
    setCurrentBezierIndex(
      (prevIndex) => (prevIndex + 1) % ShowcaseCubicBeziers.length,
    );
  };

  const currentBezier = ShowcaseCubicBeziers[currentBezierIndex].bezier;

  return (
    <DesignSystemWrapper
      title="Vercel-style Toast Notifications with Bezier Curve Animation"
      description="Demonstration of Vercel-style toast notifications with various Bezier curve animations."
    >
      <div className="flex flex-col gap-4 items-start">
        <Flex gap="2" className="flex-wrap">
          <Select value={position} onValueChange={setPosition}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top-left">Top Left</SelectItem>
              <SelectItem value="top-center">Top Center</SelectItem>
              <SelectItem value="top-right">Top Right</SelectItem>
              <SelectItem value="bottom-left">Bottom Left</SelectItem>
              <SelectItem value="bottom-center">Bottom Center</SelectItem>
              <SelectItem value="bottom-right">Bottom Right</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={duration.toString()}
            onValueChange={(value) => setDuration(parseInt(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2000">2 seconds</SelectItem>
              <SelectItem value="4000">4 seconds</SelectItem>
              <SelectItem value="6000">6 seconds</SelectItem>
              <SelectItem value="8000">8 seconds</SelectItem>
            </SelectContent>
          </Select>
        </Flex>

        <Flex gap="2" className="flex-wrap">
          {demoToasts.map((toastDemo, index) => (
            <Button
              key={index}
              onClick={() => {
                toastDemo.action();
                setSelectedToastCode(toastDemo.code);
              }}
            >
              {toastDemo.label}
            </Button>
          ))}
        </Flex>

        <Button onClick={handleNextBezier}>
          Next Bezier Curve ({ShowcaseCubicBeziers[currentBezierIndex].name})
        </Button>

        <div className="mt-4 w-full">
          <h3 className="text-lg font-semibold mb-2">
            Deletable List with Undo
          </h3>
          <ul className="space-y-2">
            <AnimatePresence>
              {items.map((item) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="flex items-center justify-between p-2 bg-dark-bg border-input border px-8 rounded"
                >
                  <span>{item.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      deleteItem(item.id);
                      setSelectedToastCode(`
deleteItem(${item.id});

// deleteItem function:
const deleteItem = (id) => {
  const deletedItem = items.find(item => item.id === id);
  setItems(items.filter(item => item.id !== id));
  
  toast.undo({
    message: \`Deleted "\${deletedItem.name}"\`,
    onUndo: () => {
      setItems(prevItems => [...prevItems, deletedItem]);
      toast.success({ message: \`Restored "\${deletedItem.name}"\` });
    },
  });
};`);
                    }}
                  >
                    <Trash2Icon size={18} />
                  </Button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>

        <CodeHighlight title="Toast Code" language="typescript">
          {selectedToastCode ||
            "// Click on a toast button or delete an item to see its code"}
        </CodeHighlight>
      </div>

      <Toaster
        position={position}
        toastOptions={{
          style: {
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          },
          duration: 4000,
          success: {
            iconTheme: {
              primary: "#4caf50",
              secondary: "#fff",
            },
            style: {
              background: "#4caf50",
              color: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#f44336",
              secondary: "#fff",
            },
            style: {
              background: "#f44336",
              color: "#fff",
            },
          },
          loading: {
            iconTheme: {
              primary: "#ff9800",
              secondary: "#fff",
            },
            style: {
              background: "#ff9800",
              color: "#fff",
            },
          },
          custom: {
            iconTheme: {
              primary: "#2196f3",
              secondary: "#fff",
            },
            style: {
              background: "#2196f3",
              color: "#fff",
            },
          },
        }}
      >
        {(t) => (
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: [0.5, 1.1, 1] }}
            transition={{ duration: 0.5, ease: currentBezier }}
            className="flex items-center gap-2 p-3 bg-dark-bg border border-input rounded shadow-lg backdrop-blur-sm"
          >
            {t.icon}
            <div>{t.message}</div>
          </motion.div>
        )}
      </Toaster>
    </DesignSystemWrapper>
  );
}
