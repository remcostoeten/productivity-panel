"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CodeContentProps } from "./types.code-highlight";
import toast from "react-hot-toast";

const CodeContent: React.FC<CodeContentProps> = ({ children, language }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [codeString, setCodeString] = useState("");

  useEffect(() => {
    setCodeString(children as string);
  }, [children]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCodeString(inputText);
    toast(`Input text: ${inputText}`);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Input Text</DialogTitle>
            <DialogDescription>Please enter your text below.</DialogDescription>
          </DialogHeader>
          <textarea
            className="!bg-none mb-4 border-zinc-800"
            value={inputText}
            onChange={handleInputChange}
          />
          <Button onClick={handleDialogClose}>Submit</Button>
        </DialogContent>
      </Dialog>
      <div className="w-full overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          showLineNumbers={true}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

export default CodeContent;
