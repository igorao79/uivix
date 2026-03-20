"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { cn } from "../../utils/cn";

let sparklesStyleInjected = false;

export interface SparklesTextProps {
  children: string;
  /** Color of sparkles */
  sparkleColor?: string;
  /** Number of sparkles visible at once */
  count?: number;
  /** Min size of sparkles in px */
  minSize?: number;
  /** Max size of sparkles in px */
  maxSize?: number;
  /** Speed — lower = faster new sparkles (ms) */
  speed?: number;
  /** HTML tag */
  as?: React.ElementType;
  className?: string;
}

export const SparklesText: React.FC<SparklesTextProps> = ({
  children,
  sparkleColor = "#FFC700",
  count = 12,
  minSize = 4,
  maxSize = 14,
  speed = 450,
  as: Tag = "span",
  className,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  const injectStyles = useCallback(() => {
    if (sparklesStyleInjected) return;
    sparklesStyleInjected = true;
    const style = document.createElement("style");
    style.textContent = `
      @keyframes uixy-sparkle-life {
        0%   { transform: scale(0) rotate(0deg); opacity: 0; }
        20%  { transform: scale(0.6) rotate(60deg); opacity: 0.8; }
        50%  { transform: scale(1) rotate(140deg); opacity: 1; }
        80%  { transform: scale(0.6) rotate(240deg); opacity: 0.8; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    injectStyles();
    const container = containerRef.current;
    if (!container) return;

    const createSparkleSVG = () => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const size = minSize + Math.random() * (maxSize - minSize);
      const duration = 1.2 + Math.random() * 1.2;
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", sparkleColor);
      svg.innerHTML = `<path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z"/>`;
      Object.assign(svg.style, {
        position: "absolute",
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        pointerEvents: "none",
        animation: `uixy-sparkle-life ${duration}s ease-in-out forwards`,
        zIndex: "1",
      });
      container.appendChild(svg);
      // Remove after animation finishes
      setTimeout(() => {
        if (svg.parentNode === container) {
          container.removeChild(svg);
        }
      }, duration * 1000);
    };

    // Stagger initial burst
    for (let i = 0; i < count; i++) {
      setTimeout(() => createSparkleSVG(), Math.random() * speed * 2);
    }

    // Continuously spawn new sparkles
    const interval = setInterval(() => {
      createSparkleSVG();
    }, speed);

    return () => {
      clearInterval(interval);
      // Clean up any remaining SVGs
      const svgs = container.querySelectorAll("svg");
      svgs.forEach((s) => s.remove());
    };
  }, [sparkleColor, count, minSize, maxSize, speed, injectStyles]);

  return (
    <Tag ref={containerRef} className={cn("relative inline-block", className)}>
      <span className="relative z-[2]">{children}</span>
    </Tag>
  );
};

SparklesText.displayName = "SparklesText";
