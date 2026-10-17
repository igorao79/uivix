"use client";

import React, { useRef, useState } from "react";
import { cn } from "../../utils/cn";

export interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export interface DockProps {
  items: DockItem[];
  /** Base icon size in px */
  size?: number;
  /** Max icon size at the cursor in px */
  magnification?: number;
  /** Distance (px) over which magnification fades out */
  distance?: number;
  className?: string;
}

/** macOS-style dock: icons grow smoothly as the cursor approaches. */
export const Dock: React.FC<DockProps> = ({
  items,
  size = 44,
  magnification = 76,
  distance = 120,
  className,
}) => {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const sizeFor = (i: number) => {
    const el = refs.current[i];
    if (mouseX === null || !el) return size;
    const rect = el.getBoundingClientRect();
    const d = Math.abs(mouseX - (rect.left + rect.width / 2));
    if (d > distance) return size;
    // cosine falloff for a smooth bell curve
    const t = Math.cos((d / distance) * (Math.PI / 2));
    return size + (magnification - size) * t;
  };

  return (
    <div
      onMouseMove={(e) => setMouseX(e.clientX)}
      onMouseLeave={() => {
        setMouseX(null);
        setHovered(null);
      }}
      className={cn(
        "inline-flex items-end gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 pb-2 pt-2 backdrop-blur-xl",
        className
      )}
      style={{ height: magnification + 20 }}
    >
      {items.map((item, i) => {
        const s = sizeFor(i);
        return (
          <button
            key={item.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            aria-label={item.label}
            onClick={item.onClick}
            onMouseEnter={() => setHovered(item.id)}
            className="relative flex items-center justify-center rounded-xl bg-zinc-800/80 text-zinc-100 shadow-lg ring-1 ring-white/10 transition-[width,height] duration-75 ease-out"
            style={{ width: s, height: s }}
          >
            {hovered === item.id && (
              <span className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs text-zinc-200">
                {item.label}
              </span>
            )}
            <span
              className="flex items-center justify-center [&>svg]:h-full [&>svg]:w-full"
              style={{ width: s * 0.55, height: s * 0.55 }}
            >
              {item.icon}
            </span>
          </button>
        );
      })}
    </div>
  );
};

Dock.displayName = "Dock";
