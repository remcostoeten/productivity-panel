import { cn } from "@/core/helpers/cn";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const containerVariants = cva("w-full", {
  variants: {
    layout: {
      default: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mx-auto",
      full: "w-full",
      centered: "flex items-center justify-center",
    },
    padding: {
      none: "",
      sm: "py-2",
      md: "py-4",
      lg: "py-8",
      xl: "py-16",
    },
    margin: {
      none: "",
      sm: "my-2",
      md: "my-4",
      lg: "my-8",
      xl: "my-16",
    },
    roundedness: {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    layout: "default",
    padding: "none",
    margin: "none",
    roundedness: "none",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
  children: React.ReactNode;
  isTopContainer?: boolean;
  marketingHeaderHeight?: number;
  minHeight?: string;
  maxWidth?: string;
  bgColor?: string;
  textColor?: string;
  center?: boolean; // Added center prop
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      as: Component = "div",
      className,
      children,
      layout,
      padding,
      margin,
      roundedness,
      isTopContainer = false,
      marketingHeaderHeight = 0,
      minHeight,
      maxWidth,
      bgColor,
      textColor,
      center = true, // Updated center prop default value
      style,
      ...props
    },
    ref,
  ) => {
    const containerClass = containerVariants({
      layout,
      padding,
      margin,
      roundedness,
    });

    const combinedStyle = {
      ...style,
      ...(minHeight && { minHeight }),
      ...(maxWidth && { maxWidth }),
      ...(bgColor && { backgroundColor: bgColor }),
      ...(textColor && { color: textColor }),
      ...(center && { marginLeft: 'auto', marginRight: 'auto' }), // Added center prop logic
    };

    if (isTopContainer && marketingHeaderHeight > 0) {
      combinedStyle.marginTop = `${marketingHeaderHeight}px`;
    }

    return (
      <Component
        ref={ref}
        className={cn(containerClass, className)}
        style={combinedStyle}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Container.displayName = "Container";

export default Container;
