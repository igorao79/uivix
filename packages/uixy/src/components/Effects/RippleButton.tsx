"use client";

import React, { useState } from "react";
import { cn } from "../../utils/cn";

export interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ripple color */
  rippleColor?: string;
  /** Ripple duration in ms */
  duration?: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

let rippleId = 0;

/** Button that emits a Material-style ink ripple from the click point. */
export const RippleButton: React.FC<RippleButtonProps> = ({
  rippleColor = "rgba(255, 255, 255, 0.45)",
  duration = 600,
  className,
  children,
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2;
    const id = ++rippleId;
    setRipples((prev) => [...prev, { id, x: e.clientX - r.left - size / 2, y: e.clientY - r.top - size / 2, size }]);
    setTimeout(() => setRipples((prev) => prev.filter((rp) => rp.id !== id)), duration);
    onClick?.(e);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500",
        className
      )}
      {...props}
    >
      <style>{`@keyframes uixy-ripple { from { transform: scale(0); opacity: 1; } to { transform: scale(1); opacity: 0; } }`}</style>
      {ripples.map((rp) => (
        <span
          key={rp.id}
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{
            left: rp.x,
            top: rp.y,
            width: rp.size,
            height: rp.size,
            background: rippleColor,
            animation: `uixy-ripple ${duration}ms ease-out forwards`,
          }}
        />
      ))}
      <span className="relative">{children}</span>
    </button>
  );
};

RippleButton.displayName = "RippleButton";
