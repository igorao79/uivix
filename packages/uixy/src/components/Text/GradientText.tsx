import React from "react";
import { cn } from "../../utils/cn";

export interface GradientTextProps {
  children: React.ReactNode;
  /** Animate the gradient */
  animate?: boolean;
  /** Animation speed in seconds */
  speed?: number;
  /** Gradient colors — Tailwind from/via/to classes or custom style */
  colors?: string;
  /** HTML tag */
  as?: React.ElementType;
  className?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  animate = true,
  speed = 3,
  colors = "from-violet-500 via-pink-500 to-indigo-500",
  as: Tag = "span",
  className,
}) => {
  return (
    <Tag
      className={cn(
        "inline-block bg-clip-text text-transparent bg-gradient-to-r",
        colors,
        animate && "bg-[length:200%_auto]",
        className
      )}
      style={
        animate
          ? {
              animation: `uixy-gradient ${speed}s linear infinite`,
            }
          : undefined
      }
    >
      <style>{`
        @keyframes uixy-gradient {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
      {children}
    </Tag>
  );
};

GradientText.displayName = "GradientText";
