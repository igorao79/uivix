"use client";

import React from "react";
import { cn } from "../../utils/cn";

export interface BorderBeamProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Beam gradient start color */
  colorFrom?: string;
  /** Beam gradient end color */
  colorTo?: string;
  /** Seconds per lap */
  duration?: number;
  /** Border width in px */
  borderWidth?: number;
  /** Beam length as a share of the perimeter, 0..1 */
  beamLength?: number;
}

/** Container with a beam of light that keeps travelling around its border. */
export const BorderBeam: React.FC<BorderBeamProps> = ({
  colorFrom = "#a78bfa",
  colorTo = "#22d3ee",
  duration = 4,
  borderWidth = 1.5,
  beamLength = 0.2,
  className,
  children,
  style,
  ...props
}) => {
  const deg = Math.round(beamLength * 360);

  return (
    <div
      className={cn("relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-6", className)}
      style={style}
      {...props}
    >
      <style>{`@keyframes uixy-beam-spin { to { transform: translate(-50%, -50%) rotate(360deg); } }`}</style>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          padding: borderWidth,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      >
        {/* a big rotating conic gradient; the mask leaves only the border ring visible */}
        <div
          className="absolute left-1/2 top-1/2 aspect-square w-[200%]"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, transparent ${360 - deg}deg, ${colorFrom} ${360 - deg / 2}deg, ${colorTo} 360deg)`,
            transform: "translate(-50%, -50%)",
            animation: `uixy-beam-spin ${duration}s linear infinite`,
          }}
        />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};

BorderBeam.displayName = "BorderBeam";
