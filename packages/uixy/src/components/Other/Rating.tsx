"use client";

import React, { useState } from "react";
import { cn } from "../../utils/cn";

export interface RatingProps {
  /** Controlled value */
  value?: number;
  defaultValue?: number;
  /** Number of stars */
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  /** Star size in px */
  size?: number;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  defaultValue = 0,
  max = 5,
  onChange,
  readOnly = false,
  size = 24,
  className,
}) => {
  const [internal, setInternal] = useState(defaultValue);
  const [hover, setHover] = useState<number | null>(null);
  const current = value ?? internal;
  const shown = hover ?? current;

  const select = (n: number) => {
    if (readOnly) return;
    setInternal(n);
    onChange?.(n);
  };

  return (
    <div
      role="radiogroup"
      className={cn("inline-flex items-center gap-1", className)}
      onMouseLeave={() => setHover(null)}
    >
      {Array.from({ length: max }, (_, i) => {
        const n = i + 1;
        const filled = n <= shown;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={n === current}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            disabled={readOnly}
            onMouseEnter={() => !readOnly && setHover(n)}
            onClick={() => select(n)}
            className={cn(
              "transition-transform duration-150",
              !readOnly && "hover:scale-125 active:scale-95",
              readOnly && "cursor-default"
            )}
          >
            <svg
              viewBox="0 0 24 24"
              width={size}
              height={size}
              className={cn(
                "transition-colors duration-150",
                filled ? "fill-amber-400 stroke-amber-400" : "fill-transparent stroke-zinc-600"
              )}
              strokeWidth={1.5}
              strokeLinejoin="round"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

Rating.displayName = "Rating";
