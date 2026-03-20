import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";

export interface BlurTextProps {
  children: string;
  /** Animate per word or per letter */
  mode?: "word" | "letter";
  /** Delay between each unit in ms */
  delay?: number;
  /** Animation duration in ms */
  duration?: number;
  /** Trigger on scroll into view */
  triggerOnView?: boolean;
  /** HTML tag */
  as?: React.ElementType;
  className?: string;
}

export const BlurText: React.FC<BlurTextProps> = ({
  children,
  mode = "word",
  delay = 100,
  duration = 500,
  triggerOnView = true,
  as: Tag = "span",
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!triggerOnView);

  useEffect(() => {
    if (!triggerOnView) {
      // Small delay so the initial hidden state renders first
      const t = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(t);
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnView]);

  const units =
    mode === "word"
      ? children.split(" ").map((w, i, arr) => (i < arr.length - 1 ? w + " " : w))
      : children.split("");

  return (
    <div ref={containerRef} className="inline">
      <Tag className={cn("inline", className)}>
        {units.map((unit, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              transition: `opacity ${duration}ms ease, filter ${duration}ms ease, transform ${duration}ms ease`,
              transitionDelay: visible ? `${i * delay}ms` : "0ms",
              opacity: visible ? 1 : 0,
              filter: visible ? "blur(0px)" : "blur(10px)",
              transform: visible ? "translateY(0)" : "translateY(12px)",
              whiteSpace: "pre",
            }}
          >
            {unit}
          </span>
        ))}
      </Tag>
    </div>
  );
};

BlurText.displayName = "BlurText";
