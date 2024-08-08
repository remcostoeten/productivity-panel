import CodeContent from './CodeContent';
import FileHeader from './FileHeader';
import { CodeHighlightProps } from './types.code-highlight';

export default function CodeHighlight({
  title,
  children,
  language = 'jsx',
}: CodeHighlightProps) {
  return (
    <section className="flex flex-col text-xs rounded-md border border-solid bg-blend-normal border-zinc-800 max-w-[813px]">
      <FileHeader title={title} />

      <CodeContent language={language}>{children}</CodeContent>
    </section>
  );
}
