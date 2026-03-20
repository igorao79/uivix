"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "../../utils/cn";

let shimmerStyleInjected = false;

export interface ShimmerTextProps {
  children: React.ReactNode;
  /** Animation speed in seconds */
  speed?: number;
  /** Shimmer color */
  shimmerColor?: string;
  /** Base text color */
  baseColor?: string;
  /** HTML tag */
  as?: React.ElementType;
  className?: string;
}

export const ShimmerText: React.FC<ShimmerTextProps> = ({
  children,
  speed = 2,
  shimmerColor = "rgba(255,255,255,0.8)",
  baseColor = "rgba(255,255,255,0.4)",
  as: Tag = "span",
  className,
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!shimmerStyleInjected) {
      shimmerStyleInjected = true;
      const style = document.createElement("style");
      style.textContent = `
        @keyframes uixy-shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .uixy-shimmer-text {
          -webkit-background-clip: text !important;
          background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          color: transparent !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("uixy-shimmer-text inline-block", className)}
      style={{
        backgroundImage: `linear-gradient(90deg, ${baseColor} 0%, ${baseColor} 35%, ${shimmerColor} 50%, ${baseColor} 65%, ${baseColor} 100%)`,
        backgroundSize: "200% 100%",
        animation: `uixy-shimmer ${speed}s linear infinite`,
      }}
    >
      {children}
    </Tag>
  );
};

ShimmerText.displayName = "ShimmerText";
