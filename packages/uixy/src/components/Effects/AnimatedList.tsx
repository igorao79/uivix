"use client";

import React, { useEffect, useState } from "react";
import { cn } from "../../utils/cn";

export interface AnimatedListProps {
  /** Items revealed one by one; newest appears on top */
  children: React.ReactNode;
  /** Delay between items in ms */
  delay?: number;
  /** Start over after the last item */
  loop?: boolean;
  /** Max items shown at once */
  maxVisible?: number;
  className?: string;
}

/** Notification-feed style list: items pop in one after another, pushing older ones down. */
export const AnimatedList: React.FC<AnimatedListProps> = ({
  children,
  delay = 1200,
  loop = true,
  maxVisible = 5,
  className,
}) => {
  const items = React.Children.toArray(children);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!items.length) return;
    if (count >= items.length && !loop) return;
    const t = setTimeout(() => setCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [count, items.length, delay, loop]);

  // with loop, keep cycling through the children; keys stay unique per appearance
  const shown = Array.from({ length: Math.min(count, maxVisible) }, (_, i) => {
    const n = count - 1 - i;
    return { key: n, node: items[n % items.length] };
  });

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <style>{`@keyframes uixy-list-in { from { opacity: 0; transform: translateY(-12px) scale(0.92); } to { opacity: 1; transform: none; } }`}</style>
      {shown.map(({ key, node }) => (
        <div key={key} style={{ animation: "uixy-list-in 400ms cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
          {node}
        </div>
      ))}
    </div>
  );
};

AnimatedList.displayName = "AnimatedList";
