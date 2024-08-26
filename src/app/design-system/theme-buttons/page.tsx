"use client";

import { Button } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import ShinyCircularButton from "~/src/components/effect/button/circular-btn";
import ShimmerButton from "~/src/components/effect/button/shimmer-btn";
import CodeHighlight from "~/src/components/ui/CodeHighlight/CodeHighlight";
import { DesignSystemWrapper } from "../_components/DesignSystemWrapper";

export default function DesignSystemPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [codeContent, setCodeContent] = useState("");

  const handleButtonClick = (code: string) => {
    setCodeContent(code);
    setOpenDialog(true);
  };

  return (
    <DesignSystemWrapper
      title="Design System Showcase"
      description="Explore the different variants, sizes, arrow variations, loading states, and more of our Button component."
    >
      <div>
        <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
        <div className="flex gap-4 items-center flex-wrap">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="default"
                onClick={() =>
                  handleButtonClick(
                    `<Button variant="default">Default</Button>`,
                  )
                }
              >
                Default
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <CodeHighlight
                title="Button Component"
                language="tsx"
                showModal={false}
              >
                {`<Button variant="default">Default</Button>`}
              </CodeHighlight>
            </PopoverContent>
          </Popover>
          <Button
            variant="destructive"
            onClick={() =>
              handleButtonClick(
                `<Button variant="destructive">Destructive</Button>`,
              )
            }
          >
            Destructive
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              handleButtonClick(`<Button variant="outline">Outline</Button>`)
            }
          >
            Outline
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              handleButtonClick(
                `<Button variant="secondary">Secondary</Button>`,
              )
            }
          >
            Secondary
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              handleButtonClick(`<Button variant="ghost">Ghost</Button>`)
            }
          >
            Ghost
          </Button>
          <Button
            variant="link"
            onClick={() =>
              handleButtonClick(`<Button variant="link">Link</Button>`)
            }
          >
            Link
          </Button>
          <Button
            variant="shimmer"
            onClick={() =>
              handleButtonClick(`<Button variant="shimmer">Shimmer</Button>`)
            }
          >
            Shimmer
          </Button>

          <div className="z-10 flex  items-center justify-center">
            <ShimmerButton className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Shimmer Button
              </span>
            </ShimmerButton>
          </div>
          <ShinyCircularButton
            onClick={() =>
              handleButtonClick(
                `<ShinyCircularButton>Shiny Circular Button</ShinyCircularButton>`,
              )
            }
          >
            Shiny Circular Button
          </ShinyCircularButton>
          <Button
            variant="iconTooltip"
            tooltipContent="Tooltip Example"
            onClick={() =>
              handleButtonClick(
                `<Button variant="iconTooltip" tooltipContent="Tooltip Example">Icon Tooltip</Button>`,
              )
            }
          >
            Icon Tooltip
          </Button>
        </div>
      </div>

      {/* Arrow Variants */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Button Arrow Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="default"
            withArrow={true}
            arrowPosition="left"
            onClick={() =>
              handleButtonClick(
                `<Button variant="default" withArrow={true} arrowPosition="left">Left Arrow</Button>`,
              )
            }
          >
            Left Arrow
          </Button>
          <Button
            variant="default"
            withArrow={true}
            arrowPosition="right"
            onClick={() =>
              handleButtonClick(
                `<Button variant="default" withArrow={true} arrowPosition="right">Right Arrow</Button>`,
              )
            }
          >
            Right Arrow
          </Button>
          <Button
            variant="default"
            withArrow={true}
            arrowPosition="left"
            onClick={() =>
              handleButtonClick(
                `<Button variant="default" withArrow={true} arrowPosition="left"><ArrowLeftIcon /></Button>`,
              )
            }
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            variant="default"
            withArrow={true}
            arrowPosition="right"
            onClick={() =>
              handleButtonClick(
                `<Button variant="default" withArrow={true} arrowPosition="right"><ArrowRightIcon /></Button>`,
              )
            }
          >
            <ArrowRightIcon />
          </Button>
        </div>
      </div>

      {/* Loading Variants */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Button Loading States</h3>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="default"
            loading={true}
            onClick={() =>
              handleButtonClick(
                `<Button variant="default" loading>Loading Default</Button>`,
              )
            }
          >
            Save Changes
          </Button>
          <Button
            variant="outline"
            loading={true}
            onClick={() =>
              handleButtonClick(
                `<Button variant="outline" loading>Loading Outline</Button>`,
              )
            }
          >
            Save Changes
          </Button>
          <Button
            variant="shimmer"
            loading={true}
            onClick={() =>
              handleButtonClick(
                `<Button variant="shimmer" loading>Loading Shimmer</Button>`,
              )
            }
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* kbd Variants */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Buttons with Keyboard Shortcut
        </h3>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="default"
            className="flex items-center space-x-2"
            onClick={() =>
              handleButtonClick(
                `<Button variant="default" className="flex items-center space-x-2"><kbd className="kbd primary">Ctrl</kbd><kbd className="kbd primary">K</kbd>Do Something</Button>`,
              )
            }
          >
            <kbd className="kbd primary">Ctrl</kbd>
            <kbd className="kbd primary">K</kbd>
            <span>Do Something</span>
          </Button>
          <Button
            variant="default"
            className="flex items-center space-x-2"
            onClick={() =>
              handleButtonClick(
                `<Button variant="default" className="flex items-center space-x-2"><kbd className="kbd macOS">⌘</kbd><kbd className="kbd macOS">C</kbd>Copy</Button>`,
              )
            }
          >
            <kbd className="kbd macOS">⌘</kbd>
            <kbd className="kbd macOS">C</kbd>
            <span>Copy</span>
          </Button>
          <Button
            variant="default"
            className="flex items-center space-x-2"
            onClick={() =>
              handleButtonClick(
                `<Button variant="default" className="flex items-center space-x-2"><kbd className="kbd glassmorphism">Ctrl</kbd><kbd className="kbd glassmorphism">V</kbd>Paste</Button>`,
              )
            }
          >
            <kbd className="kbd glassmorphism">Ctrl</kbd>
            <kbd className="kbd glassmorphism">V</kbd>
            <span>Paste</span>
          </Button>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
        <div className="flex flex-wrap gap-4">
          <Button
            size="sm"
            onClick={() =>
              handleButtonClick(`<Button size="sm">Small</Button>`)
            }
          >
            Small
          </Button>
          <Button
            size="default"
            onClick={() =>
              handleButtonClick(`<Button size="default">Default</Button>`)
            }
          >
            Default
          </Button>
          <Button
            size="lg"
            onClick={() =>
              handleButtonClick(`<Button size="lg">Large</Button>`)
            }
          >
            Large
          </Button>
          <Button
            size="icon"
            onClick={() =>
              handleButtonClick(
                `<Button size="icon"><ArrowRightIcon /></Button>`,
              )
            }
          >
            <ArrowRightIcon />
          </Button>
        </div>
      </div>

      {/* States */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Button States</h3>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => handleButtonClick(`<Button>Normal</Button>`)}>
            Normal
          </Button>
          <Button
            disabled
            onClick={() =>
              handleButtonClick(`<Button disabled>Disabled</Button>`)
            }
          >
            Disabled
          </Button>
          <Button
            className="hover:bg-red-500"
            onClick={() =>
              handleButtonClick(
                `<Button className="hover:bg-red-500">Hover State</Button>`,
              )
            }
          >
            Hover State
          </Button>
          <Button
            className="active:bg-blue-500"
            onClick={() =>
              handleButtonClick(
                `<Button className="active:bg-blue-500">Active State</Button>`,
              )
            }
          >
            Active State
          </Button>
          <Button
            className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() =>
              handleButtonClick(
                `<Button className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Focused</Button>`,
              )
            }
          >
            Focused
          </Button>
        </div>
      </div>

      {/* Contrasting Backgrounds */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Button on Contrasting Backgrounds
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-black">
            <Button
              variant="default"
              className="bg-white text-black"
              onClick={() =>
                handleButtonClick(
                  `<Button variant="default" className="bg-white text-black">Default on Black</Button>`,
                )
              }
            >
              Default on Black
            </Button>
          </div>
          <div className="p-4 bg-white">
            <Button
              variant="default"
              className="bg-black text-white"
              onClick={() =>
                handleButtonClick(
                  `<Button variant="default" className="bg-black text-white">Default on White</Button>`,
                )
              }
            >
              Default on White
            </Button>
          </div>
          <div className="p-4 bg-gray-800">
            <Button
              variant="outline"
              className="text-white"
              onClick={() =>
                handleButtonClick(
                  `<Button variant="outline" className="text-white">Outline on Dark Gray</Button>`,
                )
              }
            >
              Outline on Dark Gray
            </Button>
          </div>
        </div>
      </div>

      {/* Code Modal */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Code Example</DialogTitle>
          </DialogHeader>
          <CodeHighlight title="Button Component Usage" language="tsx">
            {codeContent}
          </CodeHighlight>
        </DialogContent>
      </Dialog>
    </DesignSystemWrapper>
  );
}
