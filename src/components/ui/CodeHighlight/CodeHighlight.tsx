import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import CodeContent from "./CodeContent";
import FileHeader from "./FileHeader";

interface CodeHighlightProps {
  title?: string;
  children: React.ReactNode;
  language?: string;
  disableMinWidth?: boolean;
  defaultCollapsed?: boolean;
  allowCollapse?: boolean;
  showModal?: boolean;
}

export default function CodeHighlight({
  title,
  children,
  language = "jsx",
  disableMinWidth = false,
  defaultCollapsed = false,
  allowCollapse = false,
  showModal = false,
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
      className={`relative flex flex-col text-xs rounded-md border border-solid bg-blend-normal border-zinc-800 ${
        disableMinWidth ? "" : "max-w-[813px]"
      }`}
    >
      <FileHeader
        title={title}
        onCopy={copyToClipboard}
        disableMinWidth={disableMinWidth}
        allowCollapse={allowCollapse}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        showModal={showModal}
        modalTrigger={
          showModal && (
            <DialogTrigger asChild>
              <button className="text-xs text-gray-400 hover:text-white ml-2">
                Full View
              </button>
            </DialogTrigger>
          )
        }
      />
      {!isCollapsed && (
        <div className="w-full overflow-x-auto">
          <CodeContent language={language}>{codeString}</CodeContent>
        </div>
      )}
      {showModal && (
        <Dialog>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <CodeContent language={language}>{codeString}</CodeContent>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
