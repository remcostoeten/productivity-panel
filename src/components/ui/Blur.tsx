import { cn } from "@/core/helpers/cn";

type BlurProps = {
  className?: string;
};

export default function Blur({ className }: BlurProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 pointer-events-none",
        className,
      )}
    >
      <div className="fix-safari-blur blur-[106px] h-56 bg-gradient-to-br from-violet-200 to-theme-primary dark:from-theme-primary"></div>
      <div className="fix-safari-blur blur-[106px] h-32 bg-gradient-to-r from-fuchsia-200 to-ptheme-primary dark:to-theme-primary"></div>
    </div>
  );
}
