"use client";

import React, { useRef, useState } from "react";
import { cn } from "../../utils/cn";

export interface SwipeCardItem {
  id: string;
  content: React.ReactNode;
}

export type SwipeDirection = "left" | "right";

export interface SwipeCardsProps {
  /** Initial stack, top card first (change `key` to reset the stack) */
  cards: SwipeCardItem[];
  /** Called after a card leaves the stack */
  onSwipe?: (card: SwipeCardItem, direction: SwipeDirection) => void;
  /** Drag distance (px) needed to swipe a card away */
  threshold?: number;
  /** Put swiped cards back at the bottom of the stack */
  loop?: boolean;
  /** Shown when the stack is empty */
  emptyState?: React.ReactNode;
  /** How many cards are visible behind the top one */
  visible?: number;
  className?: string;
}

/** Tinder-style stack: drag the top card left or right to swipe it away. */
export const SwipeCards: React.FC<SwipeCardsProps> = ({
  cards,
  onSwipe,
  threshold = 110,
  loop = false,
  emptyState,
  visible = 3,
  className,
}) => {
  const [stack, setStack] = useState(cards);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [leaving, setLeaving] = useState<SwipeDirection | null>(null);
  const start = useRef({ x: 0, y: 0 });

  const top = stack[0];

  const finish = (dir: SwipeDirection) => {
    setLeaving(dir);
    setTimeout(() => {
      setStack((s) => (loop ? [...s.slice(1), s[0]] : s.slice(1)));
      setLeaving(null);
      setDrag({ x: 0, y: 0 });
      onSwipe?.(top, dir);
    }, 300);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (leaving) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDrag({ x: e.clientX - start.current.x, y: e.clientY - start.current.y });
  };

  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (Math.abs(drag.x) > threshold) finish(drag.x > 0 ? "right" : "left");
    else setDrag({ x: 0, y: 0 });
  };

  if (!top) {
    return <div className={cn("relative flex h-80 w-64 items-center justify-center", className)}>{emptyState}</div>;
  }

  const progress = Math.min(Math.abs(drag.x) / threshold, 1);

  return (
    <div className={cn("relative h-80 w-64 select-none", className)}>
      {stack
        .slice(0, visible + 1)
        .map((card, i) => {
          const isTop = i === 0;
          // cards behind move up as the top one is dragged away
          const depth = isTop ? 0 : Math.max(i - progress, 0);
          let transform = `translateY(${depth * 16}px) scale(${1 - depth * 0.04})`;
          let transition = dragging ? "none" : "transform 300ms ease-out, opacity 300ms ease-out";
          if (isTop) {
            const x = leaving ? (leaving === "right" ? 1 : -1) * 600 : drag.x;
            transform = `translate(${x}px, ${drag.y * 0.3}px) rotate(${x * 0.06}deg)`;
            if (leaving) transition = "transform 300ms ease-in";
          }
          return (
            <div
              key={card.id}
              onPointerDown={isTop ? onPointerDown : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerUp={isTop ? onPointerUp : undefined}
              onPointerCancel={isTop ? onPointerUp : undefined}
              className={cn(
                "absolute inset-0 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl",
                isTop && "cursor-grab touch-none active:cursor-grabbing"
              )}
              style={{ transform, transition, zIndex: visible + 1 - i, opacity: i > visible - 1 ? 0 : 1 }}
            >
              {card.content}
              {isTop && (
                <>
                  <span
                    className="pointer-events-none absolute left-4 top-4 rotate-[-12deg] rounded-md border-2 border-emerald-400 px-2 py-0.5 text-sm font-bold uppercase text-emerald-400"
                    style={{ opacity: drag.x > 0 ? progress : 0 }}
                  >
                    Like
                  </span>
                  <span
                    className="pointer-events-none absolute right-4 top-4 rotate-12 rounded-md border-2 border-rose-400 px-2 py-0.5 text-sm font-bold uppercase text-rose-400"
                    style={{ opacity: drag.x < 0 ? progress : 0 }}
                  >
                    Nope
                  </span>
                </>
              )}
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

SwipeCards.displayName = "SwipeCards";
