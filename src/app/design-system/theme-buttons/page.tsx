"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";
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
      actionButtons={[
        {
          label: "Primary Action",
          onClick: () =>
            handleButtonClick(
              `<Button variant="default">Primary Action</Button>`,
            ),
        },
        {
          label: "Secondary Action",
          onClick: () =>
            handleButtonClick(
              `<Button variant="outline">Secondary Action</Button>`,
            ),
        },
      ]}
    >
      <div className="p-8 space-y-8">
        {/* Variants */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
          <div className="flex flex-wrap gap-4">
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
              disabled
              className="flex items-center space-x-2"
              onClick={() =>
                handleButtonClick(
                  `<Button variant="default" className="loading flex items-center space-x-2"><span className="spinner-border h-4 w-4 border-t-transparent border-2 rounded-full animate-spin"></span>Loading Default</Button>`,
                )
              }
            >
              <span className="spinner-border h-4 w-4 border-t-transparent border-2 rounded-full animate-spin"></span>
              <span>Loading Default</span>
            </Button>
            <Button
              variant="outline"
              disabled
              className="flex items-center space-x-2"
              onClick={() =>
                handleButtonClick(
                  `<Button variant="outline" className="loading flex items-center space-x-2"><span className="spinner-border h-4 w-4 border-t-transparent border-2 rounded-full animate-spin"></span>Loading Outline</Button>`,
                )
              }
            >
              <span className="spinner-border h-4 w-4 border-t-transparent border-2 rounded-full animate-spin"></span>
              <span>Loading Outline</span>
            </Button>
            <Button
              variant="shimmer"
              disabled
              className="flex items-center space-x-2"
              onClick={() =>
                handleButtonClick(
                  `<Button variant="shimmer" className="loading flex items-center space-x-2"><span className="spinner-border h-4 w-4 border-t-transparent border-2 rounded-full animate-spin"></span>Loading Shimmer</Button>`,
                )
              }
            >
              <span className="spinner-border h-4 w-4 border-t-transparent border-2 rounded-full animate-spin"></span>
              <span>Loading Shimmer</span>
            </Button>
            <Button
              variant="borderMagic"
              disabled
              className="flex items-center space-x-2"
              onClick={() =>
                handleButtonClick(
                  `<Button variant="borderMagic" className="loading flex items-center space-x-2"><span className="spinner-border h-4 w-4 border-t-transparent border-2 rounded-full animate-spin"></span>Loading Border Magic</Button>`,
                )
              }
            >
              <span className="spinner-border h-4 w-4 border-t-transparent border-2 rounded-full animate-spin"></span>
              <span>Loading Border Magic</span>
            </Button>
          </div>
        </div>

        {/* kbd Variant */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Button with Keyboard Shortcut
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="default"
              className="flex items-center space-x-2"
              onClick={() =>
                handleButtonClick(
                  `<Button variant="default" className="flex items-center space-x-2"><kbd className="kbd">Ctrl</kbd><kbd className="kbd">K</kbd>Do Something</Button>`,
                )
              }
            >
              <kbd className="kbd">Ctrl</kbd>
              <kbd className="kbd">K</kbd>
              <span>Do Something</span>
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
            <Button
              onClick={() => handleButtonClick(`<Button>Normal</Button>`)}
            >
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
