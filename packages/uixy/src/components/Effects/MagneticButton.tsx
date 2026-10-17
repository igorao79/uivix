"use client";

import React, { useRef, useState } from "react";
import { cn } from "../../utils/cn";

export interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** How strongly the button follows the cursor (0..1) */
  strength?: number;
  /** Extra distance (px) around the button where the pull starts */
  range?: number;
}

/** Button that is magnetically pulled toward the cursor; the label moves a bit further for depth. */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  strength = 0.4,
  range = 40,
  className,
  children,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const inside = Math.abs(dx) < r.width / 2 + range && Math.abs(dy) < r.height / 2 + range;
    setOffset(inside ? { x: dx * strength, y: dy * strength } : { x: 0, y: 0 });
  };

  const active = offset.x !== 0 || offset.y !== 0;

  return (
    // the wrapper extends the hover area so the pull starts before the cursor touches the button
    <div
      className="inline-block"
      style={{ padding: range, margin: -range }}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
    >
      <button
        ref={ref}
        type="button"
        className={cn(
          "relative inline-flex items-center justify-center rounded-full bg-zinc-100 px-7 py-3 text-sm font-semibold text-zinc-900 shadow-lg",
          active ? "transition-transform duration-150 ease-out" : "transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          className
        )}
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        {...props}
      >
        <span
          className={cn("inline-flex items-center gap-2", active ? "transition-transform duration-150" : "transition-transform duration-500")}
          style={{ transform: `translate(${offset.x * 0.35}px, ${offset.y * 0.35}px)` }}
        >
          {children}
        </span>
      </button>
    </div>
  );
};

MagneticButton.displayName = "MagneticButton";
