"use client";

import React, { useState } from "react";
import { cn } from "../../utils/cn";

export interface SliderProps {
  /** Controlled value */
  value?: number;
  /** Initial value when uncontrolled */
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Show a value bubble above the thumb while dragging/hovering */
  showValue?: boolean;
  /** Format the bubble text */
  formatValue?: (value: number) => string;
  disabled?: boolean;
  className?: string;
}

/** Range slider with a gradient fill and a floating value bubble. Built on a native input, so keyboard works. */
export const Slider: React.FC<SliderProps> = ({
  value,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  formatValue = (v) => String(v),
  disabled,
  className,
}) => {
  const [inner, setInner] = useState(defaultValue ?? min);
  const [active, setActive] = useState(false);
  const current = value ?? inner;
  const pct = max === min ? 0 : ((current - min) / (max - min)) * 100;

  return (
    <div
      className={cn("group relative flex h-6 w-full items-center", disabled && "pointer-events-none opacity-50", className)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="relative h-1.5 w-full rounded-full bg-zinc-800">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-violet-500 shadow-[0_0_0_4px_rgba(139,92,246,0.25)] transition-transform group-active:scale-125"
        style={{ left: `${pct}%` }}
      >
        {showValue && (
          <span
            className={cn(
              "absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-900 transition-all duration-150",
              active ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
            )}
          >
            {formatValue(current)}
          </span>
        )}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        disabled={disabled}
        onChange={(e) => {
          const v = Number(e.target.value);
          if (value === undefined) setInner(v);
          onChange?.(v);
        }}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </div>
  );
};

Slider.displayName = "Slider";
