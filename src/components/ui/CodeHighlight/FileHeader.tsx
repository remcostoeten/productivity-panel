import {
  CssIcon,
  JavascriptIcon,
  JsonIcon,
  PythonIcon,
  ReactIcon,
  TypescriptIcon,
} from '@/components/theme/icons';
import { CopyIcon } from 'lucide-react';
import { Button } from '../button';

interface FileHeaderProps {
  title: string;
}

const FileHeader: React.FC<FileHeaderProps> = ({ title }) => {
  let Icon = ReactIcon;
  if (title.endsWith('.js')) {
    Icon = JavascriptIcon;
  } else if (title.endsWith('.ts' || title.endsWith('.tsx'))) {
    Icon = TypescriptIcon;
  } else if (title.endsWith('.py')) {
    Icon = PythonIcon;
  } else if (title.endsWith('.json')) {
    Icon = JsonIcon;
  } else if (title.endsWith('.jsx ')) {
    Icon = ReactIcon;
  } else if (title.endsWith('.css')) {
    Icon = CssIcon;
  }

  return (
    <header className="flex gap-5 justify-between px-4 py-2 w-full whitespace-nowrap bg-black rounded-md bg-blend-normal text-neutral-400 max-md:flex-wrap max-md:max-w-full min-w-[400px]">
      <div className="flex gap-2 my-auto">
        <Icon />
        <div className="my-auto">{title}</div>
      </div>
      <Button size="icon" variant="ghost">
        <CopyIcon width={14} />
      </Button>
    </header>
  );
};

export default FileHeader;

function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7H8V5a2 2 0 012-2h4a2 2 0 012 2v2zM8 7v10a2 2 0 002 2h4a2 2 0 002-2V7M8 7h8"
      />
    </svg>
  );
}
