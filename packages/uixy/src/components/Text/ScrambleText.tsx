"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";

export interface ScrambleTextProps {
  /** Final text to reveal */
  text: string;
  /** Total reveal duration in ms */
  duration?: number;
  /** Characters used while scrambling */
  chars?: string;
  /** Re-run the effect when hovered */
  replayOnHover?: boolean;
  /** HTML tag */
  as?: React.ElementType;
  className?: string;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  duration = 1200,
  chars = "!<>-_\\/[]{}—=+*^?#________",
  replayOnHover = true,
  as: Tag = "span",
  className,
}) => {
  const [output, setOutput] = useState(text);
  const frame = useRef<number>(0);

  const run = () => {
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const revealed = Math.floor(progress * text.length);
      setOutput(
        text
          .split("")
          .map((ch, i) =>
            i < revealed || ch === " "
              ? ch
              : chars[Math.floor(Math.random() * chars.length)]
          )
          .join("")
      );
      if (progress < 1) frame.current = requestAnimationFrame(tick);
      else setOutput(text);
    };
    frame.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    run();
    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, duration]);

  return (
    <Tag
      className={cn("inline-block font-mono", className)}
      onMouseEnter={replayOnHover ? run : undefined}
      aria-label={text}
    >
      {output}
    </Tag>
  );
};

ScrambleText.displayName = "ScrambleText";
