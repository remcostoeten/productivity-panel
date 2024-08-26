"use client";

import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@/components/ui";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Trash2Icon, UndoIcon } from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Flex from "~/src/components/atoms/Flex";
import CodeHighlight from "~/src/components/ui/CodeHighlight/CodeHighlight";
import { DesignSystemWrapper } from "../_components/DesignSystemWrapper";

type Item = {
  id: number;
  name: string;
};

type ToastDemo = {
  label: string;
  action: () => void;
  code: string;
};

export default function ToastDemoPage() {
  const [position, setPosition] = useState<string>("top-right");
  const [duration, setDuration] = useState<number>(4000);
  const [selectedToastCode, setSelectedToastCode] = useState<string>("");
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 5" },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deleteItem = (id: number) => {
    const deletedItem = items.find((item) => item.id === id);
    if (!deletedItem) return;

    setItems(items.filter((item) => item.id !== id));

    toast(
      (t) => (
        <Flex gap="2" className="items-center">
          Deleted "{deletedItem.name}"
          <Button
            variant="outline"
            size="sm"
            className="space-x-2"
            onClick={() => {
              setItems((prevItems) => [...prevItems, deletedItem]);
              toast.success(`Restored "${deletedItem.name}"`);
              toast.dismiss(t.id);
            }}
          >
            <UndoIcon size={15} />
            <span>Undo</span>
          </Button>
        </Flex>
      ),
      {
        duration: 5000,
      },
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const pendingToast = toast.loading("Submitting form...");

    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.7) {
            reject(new Error("Random submission error"));
          } else {
            resolve();
          }
        }, 2000);
      });

      toast.success("Form submitted successfully!", {
        id: pendingToast,
      });
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      toast.error("Failed to submit form. Please try again.", {
        id: pendingToast,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const demoToasts: ToastDemo[] = [
    {
      label: "Normal",
      action: () => toast("Normal toast"),
      code: `toast("Normal toast")`,
    },
    {
      label: "Success",
      action: () => toast.success("Success toast"),
      code: `toast.success("Success toast")`,
    },
    {
      label: "Error",
      action: () => toast.error("Error toast"),
      code: `toast.error("Error toast")`,
    },
    {
      label: "Loading",
      action: () => toast.loading("Loading..."),
      code: `toast.loading("Loading...")`,
    },
    {
      label: "Undo",
      action: () => {
        toast((t) => (
          <Flex gap="2" className="items-center">
            Action performed
            <Button
              variant="outline"
              size="sm"
              className="space-x-2"
              onClick={() => {
                toast.success("Action undone");
                toast.dismiss(t.id);
              }}
            >
              <UndoIcon size={14} />
              <span>Undo</span>
            </Button>
          </Flex>
        ));
      },
      code: `toast((t) => (
  <span>
    Action performed
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        toast.success("Action undone");
        toast.dismiss(t.id);
      }}
    >
      Undo
    </Button>
  </span>
))`,
    },
  ];

  function DemoTitleAndDescription({
    title,
    description,
  }: {
    title?: string;
    description?: string;
  }) {
    return (
      <Flex dir="col" gap={1}>
        <h2 className="text-lg mb-0 font-semibold">{title}</h2>
        <p className="-mt-2 text-muted-foreground">{description}</p>
        <Separator />
      </Flex>
    );
  }

  return (
    <DesignSystemWrapper
      title="Vercel-style Toast Notifications with Deletable List and Bezier Curves"
      description="Demonstration of Vercel-style toast notifications with various variants, including a deletable list with undo functionality and Bezier curve animations."
    >
      <div className="flex flex-col gap-4 items-start">
        <DemoTitleAndDescription
          title="Configure the duration and position"
          description="Use the select dropdowns below to configure the position where the toast appears, and for how long it should stay on screen."
        />
        <Flex gap="6">
          <Flex gap="2" dir="col" className="flex-wrap">
            <Label>Position:</Label>
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
          </Flex>
          <Flex gap="2" dir="col" className="flex-wrap">
            <Label>Duration:</Label>
            <Select
              value={duration.toString()}
              onValueChange={(value) => setDuration(parseInt(value, 10))}
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
        </Flex>
        <Flex gap="2" dir="col">
          <DemoTitleAndDescription
            title="Basic example"
            description="Different states, non-interactive examples."
          />
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
        </Flex>
        <Flex gap="[24px]" marginTop="24px">
          <Flex gap="2" dir="col" className="w-1/3 pr-20">
            <DemoTitleAndDescription
              title="Form submission example"
              description="Example of a form submission with loading state."
            />
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 mt-4 w-full max-w-[400px]"
            >
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your name"
                required
              />
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                required
              />
              <Input
                type="text"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Enter your message"
                required
              />
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Flex>
          <Flex gap="2" dir="col">
            <DemoTitleAndDescription
              title="Deletable list with undo"
              description="Demonstration of a deletable list with undo functionality."
            />
            <AnimatePresence>
              <ul className="space-y-2">
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
  if (!deletedItem) return;

  setItems(items.filter(item => item.id !== id));

  toast((t) => (
    <span>
      Deleted "{deletedItem.name}"
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setItems(prevItems => [...prevItems, deletedItem]);
          toast.success(\`Restored "\${deletedItem.name}"\`);
          toast.dismiss(t.id);
        }}
      >
        Undo
      </Button>
    </span>
  ), {
    duration: 5000,
  });
};`);
                      }}
                    >
                      <Trash2Icon size={18} />
                    </Button>
                  </motion.li>
                ))}
              </ul>
            </AnimatePresence>
          </Flex>
        </Flex>
        <CodeHighlight title="Toast Code" language="typescript">
          {selectedToastCode ||
            "// Click on a toast button or delete an item to see its code"}
        </CodeHighlight>
      </div>

      <Toaster
        position={position as any}
        toastOptions={{
          duration: duration,
          style: {
            background: "#040404",
            color: "#909090",
            border: "1px solid #131313",
          },
        }}
      />
    </DesignSystemWrapper>
  );
}
