"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";

export interface SegmentedOption {
  value: string;
  label: React.ReactNode;
}

export interface SegmentedControlProps {
  options: SegmentedOption[];
  /** Controlled value */
  value?: string;
  /** Initial value when uncontrolled (defaults to first) */
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
  /** Stretch to the container width */
  fullWidth?: boolean;
  className?: string;
}

const sizes = { sm: "px-3 py-1 text-xs", md: "px-4 py-1.5 text-sm", lg: "px-5 py-2 text-base" };

/** iOS-style segmented control with a sliding active pill. */
export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  size = "md",
  fullWidth,
  className,
}) => {
  const [inner, setInner] = useState(defaultValue ?? options[0]?.value);
  const current = value ?? inner;
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const el = refs.current[current];
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [current, options, size]);

  return (
    <div
      role="radiogroup"
      className={cn(
        "relative inline-flex rounded-xl border border-zinc-800 bg-zinc-900 p-1",
        fullWidth && "flex w-full",
        className
      )}
    >
      {pill && (
        <span
          aria-hidden
          className="absolute bottom-1 top-1 rounded-lg bg-zinc-700/80 shadow-sm ring-1 ring-white/10 transition-all duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)]"
          style={{ left: pill.left, width: pill.width }}
        />
      )}
      {options.map((opt) => {
        const isActive = opt.value === current;
        return (
          <button
            key={opt.value}
            ref={(el) => {
              refs.current[opt.value] = el;
            }}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => {
              if (value === undefined) setInner(opt.value);
              onChange?.(opt.value);
            }}
            className={cn(
              "relative z-10 rounded-lg font-medium transition-colors",
              sizes[size],
              fullWidth && "flex-1",
              isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

SegmentedControl.displayName = "SegmentedControl";
