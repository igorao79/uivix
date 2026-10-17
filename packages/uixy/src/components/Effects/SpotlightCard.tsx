"use client";

import React, { useRef, useState } from "react";
import { cn } from "../../utils/cn";

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spotlight color (any CSS color) */
  color?: string;
  /** Border highlight color under the cursor */
  borderColor?: string;
  /** Spotlight radius in px */
  radius?: number;
  /** Also light up the border under the cursor */
  borderGlow?: boolean;
}

/** Card with a soft radial spotlight that follows the cursor. */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  color = "rgba(139, 92, 246, 0.25)",
  borderColor = "rgba(167, 139, 250, 0.9)",
  radius = 320,
  borderGlow = true,
  className,
  children,
  onMouseMove,
  onMouseLeave,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const gradient = (c: string) =>
    pos ? `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, ${c}, transparent 70%)` : "none";

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        onMouseMove?.(e);
      }}
      onMouseLeave={(e) => {
        setPos(null);
        onMouseLeave?.(e);
      }}
      className={cn("relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-6", className)}
      {...props}
    >
      {borderGlow && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] p-px transition-opacity duration-300"
          style={{
            background: gradient(borderColor),
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            opacity: pos ? 1 : 0,
          }}
        />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ background: gradient(color), opacity: pos ? 1 : 0 }}
      />
      <div className="relative">{children}</div>
    </div>
  );
};

SpotlightCard.displayName = "SpotlightCard";
