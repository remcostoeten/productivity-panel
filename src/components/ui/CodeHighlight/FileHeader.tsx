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

type FileHeaderProps = {
  title?: string;
  onCopy: () => void;
};

export default function FileHeader({ title, onCopy }: FileHeaderProps) {
  if (typeof title !== 'string') {
    console.error('Invalid title prop');
    return null;
  }

  let Icon = ReactIcon;

  if (title.endsWith('.js')) {
    Icon = JavascriptIcon;
  } else if (title.endsWith('.ts') || title.endsWith('.tsx')) {
    Icon = TypescriptIcon;
  } else if (title.endsWith('.py')) {
    Icon = PythonIcon;
  } else if (title.endsWith('.json')) {
    Icon = JsonIcon;
  } else if (title.endsWith('.jsx')) {
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
      <Button size="icon" variant="ghost" onClick={onCopy}>
        <CopyIcon width={14} />
      </Button>
    </header>
  );
}
