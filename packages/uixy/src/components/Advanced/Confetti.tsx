"use client";

import React, { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "../../utils/cn";

export interface ConfettiHandle {
  /** Fire a burst. x/y are in px relative to the canvas; defaults to center-bottom. */
  fire: (opts?: { x?: number; y?: number; count?: number }) => void;
}

export interface ConfettiProps {
  colors?: string[];
  /** Pieces per burst */
  count?: number;
  /** Initial velocity */
  power?: number;
  className?: string;
}

interface Piece {
  x: number; y: number; vx: number; vy: number;
  size: number; color: string; rot: number; vr: number; life: number;
}

/**
 * Canvas confetti overlay. Place it absolutely over a container and call `ref.current.fire()`.
 * Pointer events are disabled so it never blocks the UI beneath.
 */
export const Confetti = forwardRef<ConfettiHandle, ConfettiProps>(
  ({ colors = ["#8b5cf6", "#ec4899", "#22d3ee", "#facc15", "#34d399"], count = 120, power = 14, className }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pieces = useRef<Piece[]>([]);
    const raf = useRef(0);

    const loop = useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.current = pieces.current.filter((p) => p.life > 0 && p.y < canvas.height + 20);
      for (const p of pieces.current) {
        p.vy += 0.35; // gravity
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 1;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.min(1, p.life / 30);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }
      raf.current = pieces.current.length ? requestAnimationFrame(loop) : 0;
    }, []);

    useImperativeHandle(ref, () => ({
      fire: (opts = {}) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        const x = opts.x ?? rect.width / 2;
        const y = opts.y ?? rect.height * 0.8;
        const n = opts.count ?? count;
        for (let i = 0; i < n; i++) {
          const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
          const speed = power * (0.4 + Math.random() * 0.8);
          pieces.current.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: 6 + Math.random() * 6,
            color: colors[Math.floor(Math.random() * colors.length)],
            rot: Math.random() * Math.PI,
            vr: (Math.random() - 0.5) * 0.4,
            life: 90 + Math.random() * 60,
          });
        }
        if (!raf.current) raf.current = requestAnimationFrame(loop);
      },
    }));

    return <canvas ref={canvasRef} className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} />;
  }
);
Confetti.displayName = "Confetti";
