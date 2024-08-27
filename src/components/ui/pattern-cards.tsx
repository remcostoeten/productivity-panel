import { cn } from "@/core/helpers/cn";
import { React } from 'react'; // Added import statement for React

const cardContent = {
  title: 'Lorem ipsum dolor',
  description:
    'Lorem ipsum dolor, sit amet elit consectetur adipisicing. Nostrum, hic ipsum! dolor, sit amet elit consectetur amete elite!',
};

const CardBody = ({ className = '' }: { className?: string }) => (
  <div className={cn('text-left p-4 md:p-6', className)}>
    <h3 className="text-lg font-bold mb-1 text-zinc-200">
      {cardContent.title}
    </h3>
    <p className="text-wrap text-zinc-500 text-sm">{cardContent.description}</p>
  </div>
);

const PaternCard = ({ 
  children, 
  variant = 'default'
}: { 
  children?: React.ReactNode;
  variant?: 'default' | 'gridEllipsis' | 'ellipsis' | 'circleEllipsis' | 'lines' | 'plus' | 'grid';
}) => {
  const baseClasses = "border w-full rounded-md overflow-hidden dark:border-zinc-900 dark:bg-zinc-950";
  
  const variantClasses = {
    default: "",
    gridEllipsis: "p-1",
    ellipsis: "p-3",
    circleEllipsis: "p-1",
    lines: "p-1",
    plus: "",
    grid: ""
  };

  const backgroundClasses = {
    default: "",
    gridEllipsis: "bg-[url(/public/patterns/grid-ellipsis.svg)] bg-[length:25px_25px]",
    ellipsis: "bg-[url(/public/patterns/ellipsis.svg)] bg-[length:30px_30px]",
    circleEllipsis: "bg-[url(/public/patterns/circle-ellipsis.svg)] bg-[length:30px_30px]",
    lines: "bg-[url(/public/patterns/circle-ellipsis.svg)] bg-[length:30px_30px]",
    plus: "bg-[url(/public/patterns/plus.svg)] bg-[length:65px_65px]",
    grid: "bg-[url(/public/patterns/grid.svg)] bg-[length:50px_50px]"
  };

  const gradientClasses = {
    default: "",
    gridEllipsis: "from-zinc-950 via-zinc-950/70 to-zinc-950",
    ellipsis: "from-zinc-950/90 via-zinc-950/40 to-zinc-950/10",
    circleEllipsis: "from-zinc-950 via-zinc-950/80 to-zinc-900/10",
    lines: "from-zinc-950 via-zinc-950/80 to-zinc-900/10",
    plus: "from-zinc-950 via-zinc-950/[0.93] to-zinc-950",
    grid: "from-zinc-950 via-zinc-950/[.85] to-zinc-950"
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant])}>
      <div className={cn("size-full bg-repeat", backgroundClasses[variant])}>
        <div className={cn("size-full bg-gradient-to-tr", gradientClasses[variant])}>
          {children || <CardBody />}
        </div>
      </div>
    </div>
  );
};

export default PaternCard;
