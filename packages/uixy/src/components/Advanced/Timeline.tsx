"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";

export interface TimelineItem {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Date or label shown next to the title */
  time?: React.ReactNode;
  icon?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const Entry: React.FC<{ item: TimelineItem; last: boolean }> = ({ item, last }) => {
  const ref = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setVisible(true), io.disconnect()), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <li
      ref={ref}
      className={cn("relative pb-8 pl-10 transition-all duration-700", last && "pb-0", visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}
    >
      {!last && <span className="absolute left-[15px] top-8 h-full w-px bg-gradient-to-b from-violet-500/60 to-zinc-800" />}
      <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-violet-500/40 bg-zinc-900 text-violet-300 shadow-[0_0_12px_rgba(139,92,246,.3)] [&>svg]:h-4 [&>svg]:w-4">
        {item.icon ?? <span className="h-2 w-2 rounded-full bg-violet-400" />}
      </span>
      <div className="flex flex-wrap items-baseline gap-x-3">
        <h3 className="text-sm font-semibold text-zinc-100">{item.title}</h3>
        {item.time && <span className="text-xs text-zinc-500">{item.time}</span>}
      </div>
      {item.description && <p className="mt-1 text-sm text-zinc-400">{item.description}</p>}
    </li>
  );
};

/** Vertical timeline whose entries fade in as they scroll into view. */
export const Timeline: React.FC<TimelineProps> = ({ items, className }) => (
  <ol className={cn("w-full", className)}>
    {items.map((item, i) => (
      <Entry key={item.id} item={item} last={i === items.length - 1} />
    ))}
  </ol>
);

Timeline.displayName = "Timeline";
