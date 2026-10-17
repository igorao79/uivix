"use client";

import React, { useRef, useState } from "react";
import { cn } from "../../utils/cn";

export interface LensProps {
  src: string;
  alt?: string;
  /** Magnification factor */
  zoom?: number;
  /** Lens diameter in px */
  size?: number;
  className?: string;
}

/** Image with a circular magnifying glass that follows the cursor. */
export const Lens: React.FC<LensProps> = ({ src, alt = "", zoom = 2.5, size = 160, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  const move = (clientX: number, clientY: number) => {
    const r = ref.current!.getBoundingClientRect();
    setPos({ x: clientX - r.left, y: clientY - r.top, w: r.width, h: r.height });
  };

  return (
    <div
      ref={ref}
      onMouseMove={(e) => move(e.clientX, e.clientY)}
      onMouseLeave={() => setPos(null)}
      onTouchMove={(e) => move(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={() => setPos(null)}
      className={cn("relative cursor-none overflow-hidden rounded-xl", className)}
    >
      <img src={src} alt={alt} draggable={false} className="block h-full w-full object-cover" />
      {pos && (
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-full border-2 border-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
          style={{
            width: size,
            height: size,
            left: pos.x - size / 2,
            top: pos.y - size / 2,
            backgroundImage: `url("${src}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${pos.w * zoom}px ${pos.h * zoom}px`,
            backgroundPosition: `${-(pos.x * zoom - size / 2)}px ${-(pos.y * zoom - size / 2)}px`,
          }}
        />
      )}
    </div>
  );
};

Lens.displayName = "Lens";
