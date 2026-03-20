"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "../../utils/cn";

export interface GlitchTextProps {
  children: string;
  /** Animation speed in seconds */
  speed?: number;
  /** Glitch intensity (1-10) */
  intensity?: number;
  /** HTML tag */
  as?: React.ElementType;
  className?: string;
}

let glitchCounter = 0;

export const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  speed = 3,
  intensity = 5,
  as: Tag = "span",
  className,
}) => {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const idRef = useRef(`uixy-g-${++glitchCounter}`);
  const id = idRef.current;
  const offset = Math.max(1, Math.min(intensity, 10));

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      .${id} { position: relative; display: inline-block; }
      .${id}::before, .${id}::after {
        content: "${children.replace(/"/g, '\\"')}";
        position: absolute; inset: 0; opacity: 0.8;
      }
      .${id}::before {
        color: #0ff; z-index: -1;
        animation: ${id}-a ${speed}s infinite;
      }
      .${id}::after {
        color: #f0f; z-index: -1;
        animation: ${id}-b ${speed}s infinite;
      }
      @keyframes ${id}-a {
        0%, 15%, 40%, 46%, 80%, 86%, 100% { transform: translate(0); clip-path: inset(0 0 100% 0); }
        5%  { transform: translate(${offset}px, 0); clip-path: inset(10% 0 70% 0); }
        10% { transform: translate(-${offset}px, 0); clip-path: inset(50% 0 10% 0); }
        42% { transform: translate(${offset * 0.6}px, 0); clip-path: inset(20% 0 50% 0); }
        44% { transform: translate(-${offset * 0.8}px, 0); clip-path: inset(60% 0 5% 0); }
        82% { transform: translate(-${offset * 0.5}px, 0); clip-path: inset(5% 0 80% 0); }
        84% { transform: translate(${offset}px, 0); clip-path: inset(40% 0 20% 0); }
      }
      @keyframes ${id}-b {
        0%, 15%, 50%, 56%, 85%, 91%, 100% { transform: translate(0); clip-path: inset(0 0 100% 0); }
        5%  { transform: translate(-${offset}px, 0); clip-path: inset(30% 0 40% 0); }
        10% { transform: translate(${offset}px, 0); clip-path: inset(70% 0 0% 0); }
        52% { transform: translate(-${offset * 0.7}px, 0); clip-path: inset(15% 0 60% 0); }
        54% { transform: translate(${offset * 0.5}px, 0); clip-path: inset(75% 0 0% 0); }
        87% { transform: translate(${offset * 0.8}px, 0); clip-path: inset(0% 0 85% 0); }
        89% { transform: translate(-${offset * 0.6}px, 0); clip-path: inset(55% 0 15% 0); }
      }
    `;
    document.head.appendChild(styleEl);
    return () => { document.head.removeChild(styleEl); };
  }, [children, speed, offset, id]);

  return (
    <Tag ref={wrapperRef} className={cn("relative inline-block", className)}>
      <span className={id}>{children}</span>
    </Tag>
  );
};

GlitchText.displayName = "GlitchText";
