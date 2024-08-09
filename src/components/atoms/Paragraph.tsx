import { ElementType, HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TextAlign = 'left' | 'center' | 'right' | 'justify';
type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';
type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';

type ParagraphProps<T extends ElementType = 'p'> = {
  as?: T;
  align?: TextAlign;
  weight?: FontWeight;
  size?: TextSize;
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLParagraphElement>;

export default function Paragraph<T extends ElementType = 'p'>({
  as,
  align = 'left',
  weight = 'normal',
  size = 'base',
  className,
  children,
  ...props
}: ParagraphProps<T>) {
  const Component = as || 'p';

  const classes = twMerge(
    `text-${align}`,
    `font-${weight}`,
    `text-${size}`,
    className,
  );

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
