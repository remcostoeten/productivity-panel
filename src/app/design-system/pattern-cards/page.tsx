'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Separator
} from "@/components/ui";
import PaternCard from "@/components/ui/pattern-cards";
import { useState } from 'react';
import CodeHighlight from "~/src/components/ui/CodeHighlight/CodeHighlight";
import { DesignSystemWrapper } from "../_components/DesignSystemWrapper";
import Flex from "@/components/atoms/Flex";

const cardVariants = [
  'default',
  'gridEllipsis',
  'ellipsis',
  'circleEllipsis',
  'lines',
  'plus',
  'grid'
];

type DemoTitleAndDescriptionProps = {
  title?: string;
  description?: string;
};

export default function CardComponentShowcase() {
  const [selectedVariant, setSelectedVariant] = useState('default');
  const [selectedCardCode, setSelectedCardCode] = useState('');

  function DemoTitleAndDescription({
    title,
    description,
  }: DemoTitleAndDescriptionProps) {
    return (
      <Flex dir="col" gap={1}>
        <h2 className="text-lg mb-0 font-semibold">{title}</h2>
        <p className="-mt-2 text-muted-foreground">{description}</p>
        <Separator />
      </Flex>
    );
  }

  const handleVariantChange = (variant: string) => {
    setSelectedVariant(variant);
    setSelectedCardCode(`<PaternCard variant="${variant}" />`);
  };

  return (
    <DesignSystemWrapper
      title="Card Component Showcase"
      description="Demonstration of the PaternCard component with various background variants."
    >
      <div className="flex flex-col gap-4 items-start">
        <DemoTitleAndDescription
          title="Select a Card Variant"
          description="Use the select dropdown to choose a card variant."
        />
        <Flex gap="6" className="items-center">
          <Select value={selectedVariant} onValueChange={handleVariantChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select variant" />
            </SelectTrigger>
            <SelectContent>
              {cardVariants.map((variant) => (
                <SelectItem key={variant} value={variant}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Flex>
        
        <DemoTitleAndDescription
          title="Card Preview"
          description="This is how the selected card variant looks."
        />
        <div className="w-full max-w-md">
          <PaternCard variant={selectedVariant as any} />
        </div>
        
        <DemoTitleAndDescription
          title="All Variants"
          description="Here's a preview of all available card variants."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {cardVariants.map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-2">
              <PaternCard variant={variant as any} />
              <span className="text-sm font-medium">{variant}</span>
            </div>
          ))}
        </div>
        
        <CodeHighlight title="Card Usage Code" language="jsx">
          {selectedCardCode || "// Select a variant to see its usage code"}
        </CodeHighlight>
        
        <DemoTitleAndDescription
          title="Full Component Code"
          description="Here's the full code for the PaternCard component with all variants."
        />
        <CodeHighlight title="PaternCard Component Code" language="jsx">
{`import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/core/helpers/cn";

type PaternCardProps = {
  children?: React.ReactNode;
  variant?: 'default' | 'gridEllipsis' | 'ellipsis' | 'circleEllipsis' | 'lines' | 'plus' | 'grid';
};

export default function PaternCard({ 
  children, 
  variant = 'default',
}: PaternCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

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
    gridEllipsis: "bg-[url(/patterns/grid-ellipsis.svg)] bg-[length:25px_25px]",
    ellipsis: "bg-[url(/patterns/ellipsis.svg)] bg-[length:30px_30px]",
    circleEllipsis: "bg-[url(/patterns/circle-ellipsis.svg)] bg-[length:30px_30px]",
    lines: "bg-[url(/patterns/circle-ellipsis.svg)] bg-[length:30px_30px]",
    plus: "bg-[url(/patterns/plus.svg)] bg-[length:65px_65px]",
    grid: "bg-[url(/patterns/grid.svg)] bg-[length:50px_50px]"
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
    <div 
      ref={cardRef}
      className={cn(baseClasses, variantClasses[variant])}
      onMouseMove={handleMouseMove}
    >
      <div className={cn("size-full bg-repeat", backgroundClasses[variant])}>
        <motion.div 
          className={cn("size-full bg-gradient-to-tr", gradientClasses[variant])}
          transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
        >
          {children || <CardBody />}
        </motion.div>
      </div>
    </div>
  );
}`}
        </CodeHighlight>
      </div>
    </DesignSystemWrapper>
  );
}
