"use client";

import React, { useCallback, useRef, useState } from "react";
import { cn } from "../../utils/cn";

export interface ImageComparisonProps {
  /** Shown on the left of the handle (e.g. "before") */
  before: React.ReactNode;
  /** Shown on the right of the handle (e.g. "after") */
  after: React.ReactNode;
  /** Initial handle position, 0–100 */
  initial?: number;
  className?: string;
}

/** Drag-to-reveal comparison. Accepts images or any React content. */
export const ImageComparison: React.FC<ImageComparisonProps> = ({ before, after, initial = 50, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(initial);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative aspect-video w-full select-none overflow-hidden rounded-xl border border-zinc-800 touch-none", className)}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
    >
      <div className="absolute inset-0">{after}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {before}
      </div>
      <div className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white/80 shadow-[0_0_12px_rgba(255,255,255,.6)]" style={{ left: `${pos}%` }}>
        <div
          role="slider"
          tabIndex={0}
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 2));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 2));
          }}
          className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-white/40 bg-zinc-900/80 text-white backdrop-blur"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

ImageComparison.displayName = "ImageComparison";
