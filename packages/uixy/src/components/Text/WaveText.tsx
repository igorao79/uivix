import React from "react";
import { cn } from "../../utils/cn";

export interface WaveTextProps {
  children: string;
  /** Delay between each letter in ms */
  delay?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Wave height in px */
  height?: number;
  /** HTML tag */
  as?: React.ElementType;
  className?: string;
}

export const WaveText: React.FC<WaveTextProps> = ({
  children,
  delay = 80,
  duration = 1,
  height = 12,
  as: Tag = "span",
  className,
}) => {
  const letters = children.split("");

  return (
    <Tag className={cn("inline-flex", className)}>
      <style>{`
        @keyframes uixy-wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-${height}px); }
        }
      `}</style>
      {letters.map((letter, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            animation: `uixy-wave ${duration}s ease-in-out infinite`,
            animationDelay: `${i * delay}ms`,
            whiteSpace: letter === " " ? "pre" : undefined,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </Tag>
  );
};

WaveText.displayName = "WaveText";
