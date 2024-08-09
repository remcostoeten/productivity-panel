import React from "react";
import CodeContent from "./CodeContent";
import FileHeader from "./FileHeader";
import { CodeHighlightProps } from "./types.code-highlight";

export default function CodeHighlight({
  title,
  children,
  language = "jsx",
}: CodeHighlightProps) {
  const codeString = React.Children.toArray(children).join("\n");

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
    <section className="flex flex-col text-xs rounded-md border border-solid bg-blend-normal border-zinc-800 max-w-[813px]">
      <FileHeader title={title} onCopy={copyToClipboard} />
      <CodeContent language={language}>{children}</CodeContent>
    </section>
  );
}
