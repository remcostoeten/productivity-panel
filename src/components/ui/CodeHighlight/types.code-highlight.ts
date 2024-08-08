import { ReactNode } from 'react';

export type CodeContentProps = {
  children: ReactNode;
  language?:
    | 'jsx'
    | 'tsx'
    | 'javascript'
    | 'typescript'
    | 'json'
    | 'bash'
    | 'shell'
    | 'python'
    | 'java'
    | 'csharp'
    | 'cpp'
    | 'css'
    | 'scss'
    | 'sass';
};

export type CodeHighlightProps = {
  title: string;
  fileIcon: string;
  avatarSrc: string;
  children?: React.ReactNode;
};
