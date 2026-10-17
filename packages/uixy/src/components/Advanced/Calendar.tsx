"use client";

import React, { useState } from "react";
import { cn } from "../../utils/cn";

export interface CalendarProps {
  /** Controlled selected date */
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date) => void;
  /** Dates before this are disabled */
  min?: Date;
  /** Dates after this are disabled */
  max?: Date;
  /** 0 = Sunday, 1 = Monday */
  weekStartsOn?: 0 | 1;
  locale?: string;
  className?: string;
}

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const Calendar: React.FC<CalendarProps> = ({
  value,
  defaultValue = null,
  onChange,
  min,
  max,
  weekStartsOn = 1,
  locale = "en-US",
  className,
}) => {
  const [internal, setInternal] = useState<Date | null>(defaultValue);
  const selected = value !== undefined ? value : internal;
  const [view, setView] = useState(() => {
    const base = selected ?? new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const today = new Date();

  const shift = (n: number) => setView((v) => new Date(v.getFullYear(), v.getMonth() + n, 1));

  // Offset of the 1st within the first week row
  const offset = (view.getDay() - weekStartsOn + 7) % 7;
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array<null>(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1)),
  ];

  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Date(2024, 0, 7 + ((i + weekStartsOn) % 7)).toLocaleDateString(locale, { weekday: "short" }).slice(0, 2)
  );

  const isDisabled = (d: Date) =>
    (min && startOfDay(d) < startOfDay(min)) || (max && startOfDay(d) > startOfDay(max));

  const select = (d: Date) => {
    if (isDisabled(d)) return;
    setInternal(d);
    onChange?.(d);
  };

  const arrow = (dir: 1 | -1) => (
    <button
      type="button"
      aria-label={dir === 1 ? "Next month" : "Previous month"}
      onClick={() => shift(dir)}
      className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d={dir === 1 ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  return (
    <div className={cn("w-72 rounded-xl border border-zinc-800 bg-zinc-900 p-3", className)}>
      <div className="mb-2 flex items-center justify-between">
        {arrow(-1)}
        <span className="text-sm font-medium text-zinc-100">
          {view.toLocaleDateString(locale, { month: "long", year: "numeric" })}
        </span>
        {arrow(1)}
      </div>
      <div className="grid grid-cols-7 text-center text-[11px] text-zinc-600">
        {weekdays.map((w, i) => (
          <span key={i} className="py-1">{w}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((d, i) =>
          d ? (
            <button
              key={i}
              type="button"
              disabled={!!isDisabled(d)}
              onClick={() => select(d)}
              className={cn(
                "mx-auto flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors",
                selected && sameDay(d, selected)
                  ? "bg-violet-600 font-semibold text-white shadow-[0_0_12px_rgba(139,92,246,.5)]"
                  : sameDay(d, today)
                  ? "border border-violet-500/50 text-violet-300 hover:bg-zinc-800"
                  : "text-zinc-300 hover:bg-zinc-800",
                isDisabled(d) && "cursor-not-allowed opacity-30 hover:bg-transparent"
              )}
            >
              {d.getDate()}
            </button>
          ) : (
            <span key={i} />
          )
        )}
      </div>
    </div>
  );
};

Calendar.displayName = "Calendar";
