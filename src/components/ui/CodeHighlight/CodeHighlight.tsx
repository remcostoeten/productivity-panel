"use client";

import React, { useEffect, useState } from "react";
import CodeContent from "./CodeContent";
import FileHeader from "./FileHeader";
import { CodeHighlightProps } from "./types.code-highlight";

interface CodeHighlightProps {
  title?: string;
  children: React.ReactNode;
  language?: string;
  disableMinWidth?: boolean;
  defaultCollapsed?: boolean;
  allowCollapse?: boolean;
}

export default function CodeHighlight({
  title,
  children,
  language = "jsx",
  center = true,
  my = 0,
  mx = 0,
  disableMinWidth = false,
  defaultCollapsed = false,
  allowCollapse = false,
}: CodeHighlightProps) {
  const [codeString, setCodeString] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  useEffect(() => {
    setCodeString(React.Children.toArray(children).join("\n"));
  }, [children]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(codeString)
      .then(() => {
        console.log("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy!", err);
      });
  };
  return (
    <section
      className={`flex flex-col text-xs rounded-md border border-solid bg-blend-normal border-zinc-800 my-${my} mx-${mx} ${center ? 'mx-auto' : ''} ${disableMinWidth ? "" : "max-w-[813px]"}`}
    >
      <FileHeader title={title} onCopy={copyToClipboard} />
      {allowCollapse && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)} // Toggle collapse
          className="text-blue-400 hover:text-blue-300 p-2"
        >
          {isCollapsed ? "Show Code" : "Hide Code"}
        </button>
      )}
      {!isCollapsed && (
        <CodeContent language={language}>{codeString}</CodeContent>
      )}
    </section>
  );
}
