import React from 'react';
import CodeContent from './CodeContent';
import FileHeader from './FileHeader';
import { CodeHighlightProps } from './types.code-highlight';

const CodeHighlight: React.FC<CodeHighlightProps> = ({ title, children }) => {
  return (
    <section className="flex flex-col text-xs rounded-md border border-solid bg-blend-normal border-zinc-800 max-w-[813px]">
      <FileHeader title={title} />

      <CodeContent>{children}</CodeContent>
    </section>
  );
};

export default CodeHighlight;
