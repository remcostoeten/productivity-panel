"use client";

import { useEffect, useState } from "react";

type KeyCombination = {
  key: string;
  ctrl: boolean;
  alt: boolean;
  shift: boolean;
  meta: boolean;
};

export function useKeyboard() {
  const [keyCombination, setKeyCombination] = useState<KeyCombination>({
    key: "",
    ctrl: false,
    alt: false,
    shift: false,
    meta: false,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeyCombination({
        key: event.key,
        ctrl: event.ctrlKey,
        alt: event.altKey,
        shift: event.shiftKey,
        meta: event.metaKey,
      });
    };

    const handleKeyUp = () => {
      setKeyCombination({
        key: "",
        ctrl: false,
        alt: false,
        shift: false,
        meta: false,
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keyCombination;
}
