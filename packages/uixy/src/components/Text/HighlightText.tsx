"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";

let highlightStyleInjected = false;

export type HighlightVariant =
  | "marker"
  | "underline"
  | "box"
  | "strikethrough"
  | "gradient"
  | "glow"
  | "bracket";

export interface HighlightTextProps {
  children: string;
  /** Highlight style variant */
  variant?: HighlightVariant;
  /** Primary highlight color */
  color?: string;
  /** Second color (for gradient variant) */
  colorTo?: string;
  /** Animation duration in ms */
  duration?: number;
  /** Delay before animation starts in ms */
  delay?: number;
  /** Whether to trigger when scrolled into view */
  triggerOnView?: boolean;
  /** HTML tag */
  as?: React.ElementType;
  className?: string;
}

export const HighlightText: React.FC<HighlightTextProps> = ({
  children,
  variant = "marker",
  color = "rgba(139, 92, 246, 0.35)",
  colorTo,
  duration = 800,
  delay = 0,
  triggerOnView = true,
  as: Tag = "span",
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!highlightStyleInjected) {
      highlightStyleInjected = true;
      const style = document.createElement("style");
      style.textContent = `
        /* ── marker ── */
        .uixy-hl-marker {
          background-size: 0% 100%;
          background-repeat: no-repeat;
          background-position: left center;
          padding: 0.05em 0.15em;
          margin: -0.05em -0.15em;
          border-radius: 0.15em;
        }
        .uixy-hl-marker.uixy-hl-on { background-size: 100% 100%; }

        /* ── underline ── */
        .uixy-hl-underline {
          background-size: 0% 3px;
          background-repeat: no-repeat;
          background-position: left bottom;
          padding-bottom: 4px;
        }
        .uixy-hl-underline.uixy-hl-on { background-size: 100% 3px; }

        /* ── box ── */
        .uixy-hl-box {
          border: 2px solid transparent;
          border-radius: 4px;
          padding: 0.05em 0.25em;
          margin: -0.05em -0.25em;
        }
        .uixy-hl-box.uixy-hl-on { border-color: var(--uixy-hl-c); }

        /* ── strikethrough ── */
        .uixy-hl-strikethrough {
          position: relative;
        }
        .uixy-hl-strikethrough::after {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          height: 2.5px;
          background: var(--uixy-hl-c);
          width: 0%;
          transition: width var(--uixy-hl-dur) cubic-bezier(0.25, 0.1, 0.25, 1);
          border-radius: 2px;
        }
        .uixy-hl-strikethrough.uixy-hl-on::after { width: 100%; }

        /* ── gradient ── */
        .uixy-hl-gradient {
          background-size: 0% 100%;
          background-repeat: no-repeat;
          background-position: left center;
          padding: 0.05em 0.15em;
          margin: -0.05em -0.15em;
          border-radius: 0.15em;
        }
        .uixy-hl-gradient.uixy-hl-on { background-size: 100% 100%; }

        /* ── glow ── */
        .uixy-hl-glow {
          text-shadow: none;
          transition: text-shadow var(--uixy-hl-dur) ease;
        }
        .uixy-hl-glow.uixy-hl-on {
          text-shadow:
            0 0 8px var(--uixy-hl-c),
            0 0 20px var(--uixy-hl-c),
            0 0 40px var(--uixy-hl-c);
        }

        /* ── bracket ── */
        .uixy-hl-bracket {
          position: relative;
          padding: 0 0.3em;
          margin: 0 -0.3em;
        }
        .uixy-hl-bracket::before,
        .uixy-hl-bracket::after {
          position: absolute;
          top: -2px;
          bottom: -2px;
          width: 6px;
          border: 2px solid transparent;
          transition: border-color var(--uixy-hl-dur) ease;
          content: '';
        }
        .uixy-hl-bracket::before {
          left: 0;
          border-right: none;
          border-radius: 3px 0 0 3px;
        }
        .uixy-hl-bracket::after {
          right: 0;
          border-left: none;
          border-radius: 0 3px 3px 0;
        }
        .uixy-hl-bracket.uixy-hl-on::before,
        .uixy-hl-bracket.uixy-hl-on::after {
          border-color: var(--uixy-hl-c);
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    if (!triggerOnView) {
      const timer = setTimeout(() => setActive(true), Math.max(delay, 50));
      return () => clearTimeout(timer);
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setActive(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnView, delay]);

  // Build the background-image for marker/underline/gradient
  const gradientBg =
    variant === "gradient" && colorTo
      ? `linear-gradient(120deg, ${color}, ${colorTo})`
      : `linear-gradient(${color}, ${color})`;

  const transitionProp =
    variant === "box"
      ? `border-color ${duration}ms cubic-bezier(0.25,0.1,0.25,1)`
      : variant === "glow" || variant === "bracket"
      ? undefined
      : `background-size ${duration}ms cubic-bezier(0.25,0.1,0.25,1)`;

  return (
    <div ref={containerRef} className="inline">
      <Tag
        className={cn(
          `uixy-hl-${variant}`,
          active && "uixy-hl-on",
          className
        )}
        style={{
          ...(["marker", "underline", "gradient"].includes(variant)
            ? { backgroundImage: gradientBg }
            : {}),
          "--uixy-hl-c": color,
          "--uixy-hl-dur": `${duration}ms`,
          ...(transitionProp ? { transition: transitionProp } : {}),
        } as React.CSSProperties}
      >
        {children}
      </Tag>
    </div>
  );
};

HighlightText.displayName = "HighlightText";
