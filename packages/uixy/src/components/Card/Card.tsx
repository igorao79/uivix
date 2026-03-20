"use client";

import React, { forwardRef, useEffect, useRef, useState, useCallback } from "react";
import { cn } from "../../utils/cn";

let cardStyleInjected = false;

function injectCardStyles() {
  if (cardStyleInjected) return;
  cardStyleInjected = true;
  const style = document.createElement("style");
  style.textContent = `
    /* ── spotlight ── */
    .uixy-card-spotlight {
      --uixy-mx: 50%; --uixy-my: 50%;
      position: relative; overflow: hidden;
    }
    .uixy-card-spotlight::before {
      content:''; position:absolute; inset:0;
      background: radial-gradient(600px circle at var(--uixy-mx) var(--uixy-my), rgba(139,92,246,0.15), transparent 40%);
      opacity:0; transition:opacity .3s; pointer-events:none; z-index:0;
    }
    .uixy-card-spotlight:hover::before { opacity:1; }

    /* ── neon ── */
    .uixy-card-neon {
      box-shadow: 0 0 5px var(--uixy-neon, rgba(139,92,246,0.4)),
                  0 0 20px var(--uixy-neon, rgba(139,92,246,0.2)),
                  inset 0 0 20px var(--uixy-neon, rgba(139,92,246,0.05));
      transition: box-shadow 0.3s ease;
    }
    .uixy-card-neon:hover {
      box-shadow: 0 0 10px var(--uixy-neon, rgba(139,92,246,0.6)),
                  0 0 40px var(--uixy-neon, rgba(139,92,246,0.3)),
                  0 0 80px var(--uixy-neon, rgba(139,92,246,0.15)),
                  inset 0 0 30px var(--uixy-neon, rgba(139,92,246,0.08));
    }

    /* ── tilt ── */
    .uixy-card-tilt {
      transition: transform 0.15s ease;
      transform-style: preserve-3d;
      perspective: 1000px;
    }

    /* ── animated border ── */
    @keyframes uixy-border-spin {
      to { --uixy-angle: 360deg; }
    }
    @property --uixy-angle { syntax:'<angle>'; initial-value:0deg; inherits:false; }
    .uixy-card-animated-border {
      position:relative; overflow:hidden;
    }
    .uixy-card-animated-border::before {
      content:''; position:absolute; inset:-2px;
      background: conic-gradient(from var(--uixy-angle,0deg), #8b5cf6, #3b82f6, #06b6d4, #8b5cf6);
      animation: uixy-border-spin 3s linear infinite;
      border-radius: inherit;
      z-index: -1;
    }
    .uixy-card-animated-border::after {
      content:''; position:absolute; inset:2px;
      background: rgb(24 24 27);
      border-radius: inherit;
      z-index: -1;
    }

    /* ── noise ── */
    .uixy-card-noise { position:relative; overflow:hidden; }
    .uixy-card-noise::before {
      content:''; position:absolute; inset:-50%;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size: 128px;
      opacity: 0.04;
      pointer-events: none;
      z-index:0;
    }

    /* ── lifted ── */
    .uixy-card-lifted {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .uixy-card-lifted:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.2);
    }
  `;
  document.head.appendChild(style);
}

/* ─────────────── Base Card ─────────────── */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "bordered"
    | "elevated"
    | "ghost"
    | "gradient"
    | "glass"
    | "spotlight"
    | "neon"
    | "tilt"
    | "animated-border"
    | "noise"
    | "lifted";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", className, children, onMouseMove, onMouseLeave, ...props }, ref) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const cardRef = (ref as React.RefObject<HTMLDivElement>) || innerRef;

    useEffect(() => { injectCardStyles(); }, []);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const el = (cardRef as React.RefObject<HTMLDivElement>).current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (variant === "spotlight") {
          el.style.setProperty("--uixy-mx", `${x}px`);
          el.style.setProperty("--uixy-my", `${y}px`);
        }

        if (variant === "tilt") {
          const cx = rect.width / 2;
          const cy = rect.height / 2;
          const rotateX = ((y - cy) / cy) * -8;
          const rotateY = ((x - cx) / cx) * 8;
          el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        }

        onMouseMove?.(e);
      },
      [variant, onMouseMove, cardRef]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (variant === "tilt") {
          const el = (cardRef as React.RefObject<HTMLDivElement>).current;
          if (el) el.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
        }
        onMouseLeave?.(e);
      },
      [variant, onMouseLeave, cardRef]
    );

    const base = "rounded-xl p-6";
    const variants: Record<string, string> = {
      default:          `${base} border border-zinc-800 bg-zinc-900`,
      bordered:         `${base} border-2 border-zinc-600 bg-zinc-900/50`,
      elevated:         `${base} bg-zinc-900 shadow-xl shadow-black/30`,
      ghost:            `${base} hover:bg-zinc-900/50 transition-colors`,
      gradient:         `${base} border border-zinc-800 bg-gradient-to-br from-violet-950/40 via-zinc-900 to-cyan-950/30`,
      glass:            `${base} border border-white/10 bg-white/5 backdrop-blur-lg`,
      spotlight:        `${base} border border-zinc-800 bg-zinc-900 uixy-card-spotlight`,
      neon:             `${base} border border-violet-500/30 bg-zinc-900 uixy-card-neon`,
      tilt:             `${base} border border-zinc-800 bg-zinc-900 uixy-card-tilt cursor-pointer`,
      "animated-border": `${base} bg-zinc-900 uixy-card-animated-border`,
      noise:            `${base} border border-zinc-800 bg-zinc-900 uixy-card-noise`,
      lifted:           `${base} border border-zinc-800 bg-zinc-900 uixy-card-lifted cursor-pointer`,
    };

    const needsZWrap = variant === "spotlight" || variant === "noise" || variant === "animated-border";

    return (
      <div
        ref={cardRef}
        className={cn(variants[variant], className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {needsZWrap ? (
          <div className="relative z-10">{children}</div>
        ) : (
          children
        )}
      </div>
    );
  }
);
Card.displayName = "Card";

/* ─────────────── Card Header ─────────────── */

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-4", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

/* ─────────────── Card Title ─────────────── */

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-semibold text-zinc-100", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

/* ─────────────── Card Description ─────────────── */

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-zinc-400 mt-1", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

/* ─────────────── Card Content ─────────────── */

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

/* ─────────────── Card Footer ─────────────── */

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mt-4 flex items-center gap-2", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";
