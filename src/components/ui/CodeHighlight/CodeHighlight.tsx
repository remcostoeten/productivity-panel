"use client";

import React, { useEffect, useState } from "react";
import CodeContent from "./CodeContent";
import FileHeader from "./FileHeader";
import { CodeHighlightProps } from "./types.code-highlight";

export default function CodeHighlight({
  title,
  children,
  language = "jsx",
  center = true,
  my = 0,
  mx = 0,
}: CodeHighlightProps) {
  const [codeString, setCodeString] = useState("");

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
    <section className={`flex flex-col text-xs rounded-md border border-solid bg-blend-normal border-zinc-800 max-w-[813px] my-${my} mx-${mx} ${center ? 'mx-auto' : ''}`}>
      <FileHeader title={title} onCopy={copyToClipboard} />
      <CodeContent language={language}>{codeString}</CodeContent>
    </section>
  );
}
