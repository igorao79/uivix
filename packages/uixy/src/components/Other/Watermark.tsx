"use client";

import React from "react";
import { cn } from "../../utils/cn";

export interface WatermarkProps {
  /** Position on the page */
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  /** Custom text (default: "Built with UIVIX") */
  text?: string;
  /** Show the UIVIX logo image */
  showLogo?: boolean;
  /** Custom logo URL (defaults to UIVIX logo) */
  logoUrl?: string;
  /** Link URL */
  href?: string;
  /** Size */
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Watermark: React.FC<WatermarkProps> = ({
  position = "bottom-right",
  text = "Built with UIVIX",
  showLogo = true,
  logoUrl,
  href = "https://uivix-docs.vercel.app",
  size = "sm",
  className,
}) => {
  const positions: Record<string, string> = {
    "bottom-left": "fixed bottom-4 left-4",
    "bottom-right": "fixed bottom-4 right-4",
    "top-left": "fixed top-4 left-4",
    "top-right": "fixed top-4 right-4",
  };

  const sizes: Record<string, { text: string; logo: number; pad: string }> = {
    sm: { text: "text-[10px]", logo: 14, pad: "px-2.5 py-1.5 gap-1.5" },
    md: { text: "text-xs", logo: 16, pad: "px-3 py-2 gap-2" },
    lg: { text: "text-sm", logo: 20, pad: "px-4 py-2.5 gap-2.5" },
  };

  const s = sizes[size];
  const defaultLogo = "https://uivix-docs.vercel.app/logo.webp";

  const content = (
    <>
      {showLogo && (
        <img
          src={logoUrl || defaultLogo}
          alt="UIVIX"
          style={{ width: s.logo, height: s.logo }}
          className="rounded-sm shrink-0"
        />
      )}
      <span
        className={cn(
          s.text,
          "font-medium bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent"
        )}
      >
        {text}
      </span>
    </>
  );

  const baseClasses = cn(
    "inline-flex items-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md opacity-60 hover:opacity-100 transition-opacity z-50",
    s.pad,
    positions[position],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return <div className={baseClasses}>{content}</div>;
};

Watermark.displayName = "Watermark";
