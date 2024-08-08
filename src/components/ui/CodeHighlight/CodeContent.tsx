import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Import the desired theme
import { toast } from 'sonner';
import { CodeContentProps } from './types.code-highlight';

const CodeContent: React.FC<CodeContentProps> = ({ children, language }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [codeString, setCodeString] = useState(
    React.Children.toArray(children).join('\n'),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            type="text"
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
