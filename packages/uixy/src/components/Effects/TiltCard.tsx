"use client";

import React, { useRef, useState } from "react";
import { cn } from "../../utils/cn";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max rotation in degrees */
  maxTilt?: number;
  /** Scale while hovered */
  scale?: number;
  /** Show a moving glare highlight */
  glare?: boolean;
  /** CSS perspective in px */
  perspective?: number;
}

/** 3D card that tilts toward the cursor, with an optional glare highlight. */
export const TiltCard: React.FC<TiltCardProps> = ({
  maxTilt = 12,
  scale = 1.03,
  glare = true,
  perspective = 900,
  className,
  children,
  style,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // normalized cursor position, 0..1
  const [p, setP] = useState<{ x: number; y: number } | null>(null);

  const rotX = p ? (0.5 - p.y) * 2 * maxTilt : 0;
  const rotY = p ? (p.x - 0.5) * 2 * maxTilt : 0;

  return (
    <div style={{ perspective }} className="inline-block">
      <div
        ref={ref}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          setP({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
        }}
        onMouseLeave={() => setP(null)}
        className={cn(
          "relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-6 will-change-transform",
          p ? "transition-transform duration-75 ease-out" : "transition-transform duration-500 ease-out",
          className
        )}
        style={{
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${p ? scale : 1})`,
          transformStyle: "preserve-3d",
          ...style,
        }}
        {...props}
      >
        {children}
        {glare && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: p ? 1 : 0,
              background: p
                ? `radial-gradient(circle at ${p.x * 100}% ${p.y * 100}%, rgba(255,255,255,0.18), transparent 60%)`
                : undefined,
            }}
          />
        )}
      </div>
    </div>
  );
};

TiltCard.displayName = "TiltCard";
