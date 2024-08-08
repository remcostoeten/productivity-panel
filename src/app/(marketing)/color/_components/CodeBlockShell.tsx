import { Language } from 'prism-react-renderer';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeBlockProps = {
  code: string;
  language?: Language;
  showLineNumbers?: boolean;
  maxHeight?: string;
};

export default function CodeBlock({
  code,
  language = 'jsx',
  showLineNumbers = true,
  maxHeight = 'auto',
}: CodeBlockProps) {
  return (
    <div
      className="code-block bg-gray-800 rounded-md p-4 overflow-x-auto"
      style={{ maxHeight, overflowY: 'auto' }}
    >
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        wrapLines={true}
        customStyle={{
          margin: 0,
          padding: 0,
          background: 'transparent',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
