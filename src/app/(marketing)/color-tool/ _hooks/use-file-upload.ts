"use client";

import { useCallback, useEffect, useState } from "react";

export default function useFileUpload() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const savedImageSrc = localStorage.getItem("uploadedImage");
    if (savedImageSrc) {
      setImageSrc(savedImageSrc);
    }
  }, []);

  useEffect(() => {
    if (imageSrc) {
      localStorage.setItem("uploadedImage", imageSrc);
    } else {
      localStorage.removeItem("uploadedImage");
    }
  }, [imageSrc]);

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageSrc(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [],
  );

  const handlePaste = useCallback((event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            const reader = new FileReader();
            reader.onload = (e) => {
              setImageSrc(e.target?.result as string);
            };
            reader.readAsDataURL(blob);
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  return { imageSrc, setImageSrc, handleFileUpload };
}
