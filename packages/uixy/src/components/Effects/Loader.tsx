"use client";

import React from "react";
import { cn } from "../../utils/cn";

export type LoaderVariant = "spinner" | "dots" | "bars" | "pulse" | "orbit" | "square";

export interface LoaderProps {
  variant?: LoaderVariant;
  /** Overall size in px */
  size?: number;
  /** Any CSS color */
  color?: string;
  /** Accessible label */
  label?: string;
  className?: string;
}

const keyframes = `
@keyframes uixy-loader-spin { to { transform: rotate(360deg); } }
@keyframes uixy-loader-bounce { 0%, 80%, 100% { transform: scale(0.4); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
@keyframes uixy-loader-bars { 0%, 100% { transform: scaleY(0.35); } 50% { transform: scaleY(1); } }
@keyframes uixy-loader-pulse { from { transform: scale(0); opacity: 0.9; } to { transform: scale(1); opacity: 0; } }
@keyframes uixy-loader-square { 0% { transform: perspective(120px) rotateX(0) rotateY(0); } 50% { transform: perspective(120px) rotateX(-180deg) rotateY(0); } 100% { transform: perspective(120px) rotateX(-180deg) rotateY(-180deg); } }
`;

/** Loading indicators in six styles, sized and colored by props. */
export const Loader: React.FC<LoaderProps> = ({
  variant = "spinner",
  size = 32,
  color = "#a78bfa",
  label = "Loading",
  className,
}) => {
  let content: React.ReactNode;

  switch (variant) {
    case "dots":
      content = (
        <span className="flex items-center justify-between" style={{ width: size * 1.6, height: size }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="rounded-full"
              style={{ width: size * 0.4, height: size * 0.4, background: color, animation: `uixy-loader-bounce 1.2s ${i * 0.16}s infinite ease-in-out both` }}
            />
          ))}
        </span>
      );
      break;
    case "bars":
      content = (
        <span className="flex items-center justify-between" style={{ width: size, height: size }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="h-full rounded-full"
              style={{ width: size / 8, background: color, animation: `uixy-loader-bars 1s ${i * 0.1}s infinite ease-in-out` }}
            />
          ))}
        </span>
      );
      break;
    case "pulse":
      content = (
        <span className="relative block" style={{ width: size, height: size }}>
          {[0, 1].map((i) => (
            <span
              key={i}
              className="absolute inset-0 rounded-full"
              style={{ background: color, animation: `uixy-loader-pulse 1.6s ${i * 0.8}s infinite cubic-bezier(0, 0.2, 0.8, 1)` }}
            />
          ))}
        </span>
      );
      break;
    case "orbit":
      content = (
        <span className="relative block" style={{ width: size, height: size, animation: "uixy-loader-spin 1.4s linear infinite" }}>
          {[0, 1, 2, 3].map((i) => {
            const d = size * (0.28 - i * 0.05);
            const a = (i / 4) * Math.PI * 2;
            return (
              <span
                key={i}
                className="absolute rounded-full"
                style={{
                  width: d,
                  height: d,
                  background: color,
                  opacity: 1 - i * 0.2,
                  left: size / 2 + Math.cos(a) * (size / 2 - d / 2) - d / 2,
                  top: size / 2 + Math.sin(a) * (size / 2 - d / 2) - d / 2,
                }}
              />
            );
          })}
        </span>
      );
      break;
    case "square":
      content = (
        <span
          className="block rounded-sm"
          style={{ width: size * 0.8, height: size * 0.8, background: color, animation: "uixy-loader-square 1.2s infinite ease-in-out" }}
        />
      );
      break;
    default: {
      const ring = Math.max(2, size / 10);
      content = (
        <span className="relative block" style={{ width: size, height: size }}>
          <span className="absolute inset-0 rounded-full opacity-20" style={{ border: `${ring}px solid ${color}` }} />
          <span
            className="absolute inset-0 rounded-full"
            style={{
              border: `${ring}px solid transparent`,
              borderTopColor: color,
              animation: "uixy-loader-spin 0.8s linear infinite",
            }}
          />
        </span>
      );
    }
  }

  return (
    <span role="status" aria-label={label} className={cn("inline-flex items-center justify-center", className)}>
      <style>{keyframes}</style>
      {content}
    </span>
  );
};

Loader.displayName = "Loader";
