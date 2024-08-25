"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@c/ui";
import { cn } from "@core/helpers/cn";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { forwardRef } from "react";

const buttonVariants = cva(
  "bg-transparent inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-col disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-200 hover:bg-zinc-100 hover:scale-105 transition-all duration-300 text-primary-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-body-gradient hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-dark-section hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        shimmer:
          "h-12 animate-shimmer-btn items-center justify-center rounded-md border-primary/40 shimmer-btn bg-[length:200%_100%] bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] px-6 font-medium text-slate-400 transition-colors",
        borderMagic:
          "relative inline-flex h-9 overflow-hidden rounded-full p-[1px]",
        borderMagicAlt:
          "relative inline-flex h-12 overflow-hidden rounded-full p-[1px]",
        iconTooltip:
          "p-2 rounded-full hover:bg-accent hover:text-accent-foreground",
        loading: "pointer-events-none opacity-70", // New loading variant
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    withArrow?: boolean;
    arrowPosition?: "left" | "right";
    href?: string;
    target?: string;
    tooltipContent?: string;
    loading?: boolean; // New loading prop
  };

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      withArrow = false,
      arrowPosition = "right",
      href,
      target,
      tooltipContent,
      loading = false, // New loading prop with default false
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : href ? "a" : "button";
    const isAnchor = !!href;

    const ButtonContent = (
      <Comp
        className={cn(
          buttonVariants({
            variant: loading ? "loading" : variant,
            size,
            className,
          }),
        )}
        ref={ref}
        href={isAnchor ? href : undefined}
        target={isAnchor ? target : undefined}
        {...props}
      >
        {loading ? (
          <span className="flex items-center space-x-2">
            <span className="spinner-border h-4 w-4 border-t-transparent border-2 rounded-full animate-spin"></span>
            <span>Loading...</span>
          </span>
        ) : (
          <>
            {variant === "borderMagic" && (
              <>
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fff_0%,#ffff_50%,#ffff00_100%)] opacity-50" />
                <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white backdrop-blur-3xl">
                  {props.children}
                </span>
              </>
            )}
            {variant === "borderMagicAlt" && (
              <>
                <span className="absolute inset-[-1000%] animate-[spin_22s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  {props.children}
                </span>
              </>
            )}
            {variant === "shimmer" && (
              <>
                {arrowPosition === "left" && withArrow && (
                  <ArrowLeftIcon className="mr-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                )}
                {props.children}
                {arrowPosition === "right" && withArrow && (
                  <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                )}
              </>
            )}
            {variant !== "borderMagic" &&
              variant !== "borderMagicAlt" &&
              variant !== "shimmer" && (
                <>
                  {arrowPosition === "left" && withArrow && (
                    <ArrowLeftIcon className="mr-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                  )}
                  {props.children}
                  {arrowPosition === "right" && withArrow && (
                    <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                  )}
                </>
              )}
          </>
        )}
      </Comp>
    );

    if (variant === "iconTooltip" && tooltipContent) {
      return (
        <Tooltip delayDuration={55}>
          <TooltipTrigger asChild>{ButtonContent}</TooltipTrigger>
          <TooltipContent side="right">{tooltipContent}</TooltipContent>
        </Tooltip>
      );
    }

    return ButtonContent;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
