"use client";

import { Kbd } from "@/components/atoms/Kbd";
import { Button } from "@/components/ui/button";
import CodeHighlight from "@/components/ui/CodeHighlight/CodeHighlight";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useKeyboard } from "@/core/hooks/useKbdKeyyboard";
import { useCallback, useEffect, useState } from "react";
import { DesignSystemWrapper } from "../../_components/DesignSystemWrapper";

const shortcuts = [
  { name: "Copy", combination: ["Ctrl", "C"], variant: "default" },
  { name: "Paste", combination: ["Ctrl", "V"], variant: "default" },
  { name: "Cut", combination: ["Ctrl", "X"], variant: "default" },
  { name: "Save", combination: ["Ctrl", "S"], variant: "accent" },
  { name: "Undo", combination: ["Ctrl", "Z"], variant: "accent" },
  { name: "Redo", combination: ["Ctrl", "Y"], variant: "accent" },
  { name: "Find", combination: ["Ctrl", "F"], variant: "ghost" },
  { name: "Replace", combination: ["Ctrl", "H"], variant: "ghost" },
  { name: "Select All", combination: ["Ctrl", "A"], variant: "ghost" },
  { name: "New Tab", combination: ["Ctrl", "T"], variant: "default" },
  { name: "Close Tab", combination: ["Ctrl", "W"], variant: "default" },
  {
    name: "Reopen Tab",
    combination: ["Ctrl", "Shift", "T"],
    variant: "accent",
  },
  {
    name: "Task Manager",
    combination: ["Ctrl", "Shift", "Esc"],
    variant: "accent",
  },
  { name: "Lock PC", combination: ["Win", "L"], variant: "ghost" },
  { name: "Run", combination: ["Win", "R"], variant: "ghost" },
];

const example = `const [showHookModal, setShowHookModal] = useState(false);
const { key, shift, resetKeyState } = useKeyboard();

useEffect(() => {
  if (shift && key === "E") {
    setShowHookModal(true);
    resetKeyState();
  }
}, [shift, key, resetKeyState]);`;

export default function KbdShowcase() {
  const [showHookModal, setShowHookModal] = useState(false);
  const { key, ctrl, alt, shift, meta, resetKeyState } = useKeyboard();

  useEffect(() => {
    if (key || ctrl || alt || shift || meta) {
      const timer = setTimeout(() => {
        if (resetKeyState) resetKeyState();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [key, ctrl, alt, shift, meta, resetKeyState]);

  useEffect(() => {
    if (shift && key === "E") {
      setShowHookModal(true);
      if (resetKeyState) resetKeyState();
    }
  }, [shift, key, resetKeyState]);

  const handleShortcutClick = useCallback((name: string) => {
    console.log(`Shortcut clicked: ${name}`);
    // Add any additional logic here if needed
  }, []);

  const renderKeyboardState = useCallback(
    () => (
      <div className="flex flex-wrap gap-2">
        {ctrl && <Kbd variant="default">Ctrl</Kbd>}
        {alt && <Kbd variant="default">Alt</Kbd>}
        {shift && <Kbd variant="default">Shift</Kbd>}
        {meta && <Kbd variant="accent">Cmd</Kbd>}
        {key && <Kbd variant="ghost">{key}</Kbd>}
      </div>
    ),
    [ctrl, alt, shift, meta, key],
  );

  return (
    <DesignSystemWrapper
      title="Keyboard Shortcuts (KBD) Component"
      description="A sleek and accessible keyboard shortcut component for displaying key combinations, "
    >
      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-semibold mb-4 text-gray-200">
            Keyboard Hook Demo
          </h3>
          <p className="mb-2 text-gray-400">Press any key combination:</p>
          <div className="flex flex-wrap gap-2 bg-dark-section--lighter p-4 rounded-lg">
            {renderKeyboardState()}
          </div>
        </section>
        <section>
          <h3 className="text-lg font-semibold mb-4 text-gray-200">
            Common Shortcuts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {shortcuts.map((shortcut) => (
              <div
                key={shortcut.name}
                className="flex items-center justify-between bg-dark-section border-dark-section--lighter border shadow-sm hover:shadow-brand trans-all-500 p-3 rounded-lg"
              >
                <span className="text-gray-300">{shortcut.name}</span>
                <Kbd
                  variant={shortcut.variant as any}
                  combination={shortcut.combination}
                  onClick={() => handleShortcutClick(shortcut.name)}
                  className="cursor-pointer hover:scale-105 transition-transform"
                >
                  {shortcut.combination.join(" + ")}
                </Kbd>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4 text-gray-200">
            Keyboard Hook Action Demo
          </h3>
          <p className="mb-2 text-gray-400">
            Press <Kbd variant="default">Shift</Kbd> +{" "}
            <Kbd variant="default">E</Kbd> to open a modal
          </p>
          <div className="flex flex-wrap gap-2 bg-dark-section--lighter p-4 rounded-lg">
            <Button onClick={() => setShowHookModal(true)}>
              Open Modal Manually
            </Button>
          </div>
        </section>
      </div>

      <Dialog open={showHookModal} onOpenChange={setShowHookModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-gray-200">
              Keyboard Hook Triggered Modal
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              This modal was opened by pressing Shift + E or clicking the
              button.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h4 className="text-sm font-medium mb-2 text-gray-300">
              Current pressed keys:
            </h4>
            {renderKeyboardState()}
          </div>
          <CodeHighlight title="useKeyboard Hook">{example}</CodeHighlight>
          <DialogFooter>
            <Button onClick={() => setShowHookModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DesignSystemWrapper>
  );
}
