"use client";

import React, { useEffect, useState } from "react";
import { cn } from "../../utils/cn";

export interface RotatingTextProps {
  /** Words or phrases to cycle through */
  words: string[];
  /** Time each word stays visible in ms */
  interval?: number;
  /** HTML tag */
  as?: React.ElementType;
  className?: string;
}

export const RotatingText: React.FC<RotatingTextProps> = ({
  words,
  interval = 2200,
  as: Tag = "span",
  className,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <Tag className={cn("inline-block relative overflow-hidden align-bottom", className)}>
      <style>{`
        @keyframes uixy-rotate-in {
          0% { transform: translateY(100%); opacity: 0; filter: blur(4px); }
          100% { transform: translateY(0); opacity: 1; filter: blur(0); }
        }
      `}</style>
      <span
        key={index}
        className="inline-block"
        style={{ animation: "uixy-rotate-in 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        {words[index]}
      </span>
    </Tag>
  );
};

RotatingText.displayName = "RotatingText";
