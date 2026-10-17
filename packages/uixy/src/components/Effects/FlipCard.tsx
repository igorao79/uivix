"use client";

import React, { useState } from "react";
import { cn } from "../../utils/cn";

export interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  /** Flip on hover or on click */
  trigger?: "hover" | "click";
  /** Flip axis */
  direction?: "horizontal" | "vertical";
  /** Controlled flipped state */
  flipped?: boolean;
  onFlipChange?: (flipped: boolean) => void;
  /** Animation duration in ms */
  duration?: number;
  className?: string;
}

/** Card with two faces that flips in 3D on hover or click. */
export const FlipCard: React.FC<FlipCardProps> = ({
  front,
  back,
  trigger = "hover",
  direction = "horizontal",
  flipped,
  onFlipChange,
  duration = 600,
  className,
}) => {
  const [inner, setInner] = useState(false);
  const isFlipped = flipped ?? inner;
  const set = (v: boolean) => {
    if (flipped === undefined) setInner(v);
    onFlipChange?.(v);
  };
  const axis = direction === "horizontal" ? "rotateY" : "rotateX";
  const face = "absolute inset-0 overflow-hidden rounded-xl [backface-visibility:hidden] [-webkit-backface-visibility:hidden]";

  return (
    <div
      className={cn("relative h-56 w-80 [perspective:1000px]", trigger === "click" && "cursor-pointer", className)}
      onMouseEnter={trigger === "hover" ? () => set(true) : undefined}
      onMouseLeave={trigger === "hover" ? () => set(false) : undefined}
      onClick={trigger === "click" ? () => set(!isFlipped) : undefined}
    >
      <div
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={{
          transform: `${axis}(${isFlipped ? 180 : 0}deg)`,
          transition: `transform ${duration}ms cubic-bezier(0.4, 0.2, 0.2, 1)`,
        }}
      >
        <div className={face}>{front}</div>
        <div className={face} style={{ transform: `${axis}(180deg)` }}>
          {back}
        </div>
      </div>
    </div>
  );
};

FlipCard.displayName = "FlipCard";
