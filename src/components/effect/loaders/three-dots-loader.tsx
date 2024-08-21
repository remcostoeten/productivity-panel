import { twMerge } from "tailwind-merge";

export interface LoadingDotProps {
  variant?: "dot" | "bar" | "pulse" | "wave" | "spinner" | "bounce";
  size?: "sm" | "md" | "lg";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "text-muted"
    | "white"
    | "black";
  speed?: "slow" | "normal" | "fast";
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  className?: string;
}

const LoadingDot: React.FC<LoadingDotProps> = ({
  variant = "dot",
  size = "md",
  color = "white",
  speed = "normal",
  easing = "ease-in-out",
  className,
}) => {
  const sizeClasses = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  };

  const colorClasses = {
    primary: "bg-blue-500",
    secondary: "bg-gray-500",
    accent: "bg-purple-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    "text-muted": "text-gray-500",
    white: "bg-white",
    black: "bg-black",
  };

  const speedClasses = {
    slow: "animate-[loading_2s_infinite]",
    normal: "animate-[loading_1.5s_infinite]",
    fast: "animate-[loading_1s_infinite]",
  };

  const easingClasses = {
    linear: "ease-linear",
    "ease-in": "ease-in",
    "ease-out": "ease-out",
    "ease-in-out": "ease-in-out",
  };

  const baseClasses = twMerge(
    "inline-block",
    colorClasses[color],
    speedClasses[speed],
    easingClasses[easing],
    className,
  );

  const renderVariant = () => {
    switch (variant) {
      case "dot":
        return (
          <div className="flex items-center">
            <div
              className={`${baseClasses} ${sizeClasses[size]} rounded-full mx-0.5 animate-delay-0`}
            ></div>
            <div
              className={`${baseClasses} ${sizeClasses[size]} rounded-full mx-0.5 animate-delay-300`}
            ></div>
            <div
              className={`${baseClasses} ${sizeClasses[size]} rounded-full mx-0.5 animate-delay-600`}
            ></div>
          </div>
        );
      case "bar":
        return (
          <div className="flex items-center space-x-1">
            <div
              className={`${baseClasses} w-1 h-6 animate-[loading-bar_1s_infinite]`}
            ></div>
            <div
              className={`${baseClasses} w-1 h-6 animate-[loading-bar_1s_infinite_300ms]`}
            ></div>
            <div
              className={`${baseClasses} w-1 h-6 animate-[loading-bar_1s_infinite_600ms]`}
            ></div>
          </div>
        );
      case "pulse":
        return (
          <div
            className={`${baseClasses} ${sizeClasses[size]} rounded-full animate-[loading-pulse_1.5s_infinite]`}
          ></div>
        );
      case "wave":
        return (
          <div className="flex items-center space-x-1">
            <div
              className={`${baseClasses} w-1 h-6 animate-[loading-wave_1.2s_infinite_ease-in-out]`}
            ></div>
            <div
              className={`${baseClasses} w-1 h-6 animate-[loading-wave_1.2s_infinite_ease-in-out_100ms]`}
            ></div>
            <div
              className={`${baseClasses} w-1 h-6 animate-[loading-wave_1.2s_infinite_ease-in-out_200ms]`}
            ></div>
            <div
              className={`${baseClasses} w-1 h-6 animate-[loading-wave_1.2s_infinite_ease-in-out_300ms]`}
            ></div>
            <div
              className={`${baseClasses} w-1 h-6 animate-[loading-wave_1.2s_infinite_ease-in-out_400ms]`}
            ></div>
          </div>
        );
      case "spinner":
        return (
          <div
            className={`${baseClasses} w-6 h-6 border-2 border-t-transparent rounded-full animate-[loading-spinner_0.8s_linear_infinite]`}
          ></div>
        );
      case "bounce":
        return (
          <div className="flex items-center space-x-1">
            <div
              className={`${baseClasses} ${sizeClasses[size]} rounded-full animate-[loading-bounce_0.6s_infinite_alternate]`}
            ></div>
            <div
              className={`${baseClasses} ${sizeClasses[size]} rounded-full animate-[loading-bounce_0.6s_infinite_alternate_200ms]`}
            ></div>
            <div
              className={`${baseClasses} ${sizeClasses[size]} rounded-full animate-[loading-bounce_0.6s_infinite_alternate_400ms]`}
            ></div>
          </div>
        );
      default:
        return null;
    }
  };

  return renderVariant();
};

export default LoadingDot;
