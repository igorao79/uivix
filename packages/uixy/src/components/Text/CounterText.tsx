import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";

export interface CounterTextProps {
  /** Target number to count to */
  target: number;
  /** Starting number */
  from?: number;
  /** Duration of animation in ms */
  duration?: number;
  /** Decimal places */
  decimals?: number;
  /** Prefix (e.g. "$") */
  prefix?: string;
  /** Suffix (e.g. "%", "+") */
  suffix?: string;
  /** Separator for thousands */
  separator?: string;
  /** Trigger on scroll into view */
  triggerOnView?: boolean;
  /** HTML tag */
  as?: React.ElementType;
  className?: string;
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export const CounterText: React.FC<CounterTextProps> = ({
  target,
  from = 0,
  duration = 2000,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ",",
  triggerOnView = true,
  as: Tag = "span",
  className,
}) => {
  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState(from);
  const [started, setStarted] = useState(!triggerOnView);

  useEffect(() => {
    if (!triggerOnView) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnView]);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();
    let rafId: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = from + (target - from) * eased;

      setValue(current);

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [started, from, target, duration]);

  const formatNumber = (num: number): string => {
    const fixed = num.toFixed(decimals);
    if (!separator) return fixed;

    const [int, dec] = fixed.split(".");
    const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return dec !== undefined ? `${formatted}.${dec}` : formatted;
  };

  return (
    <Tag ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {formatNumber(value)}
      {suffix}
    </Tag>
  );
};

CounterText.displayName = "CounterText";
