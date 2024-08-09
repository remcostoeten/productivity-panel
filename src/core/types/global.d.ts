// src/core/types/global.d.ts
import { ReactNode } from "react";

declare global {
  type PageProps = {
    children?: ReactNode;
  };
}

// It's important to include this line to make it a module
export {};
