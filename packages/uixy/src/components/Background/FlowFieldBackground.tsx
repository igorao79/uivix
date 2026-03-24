"use client";

import React, { useEffect, useRef } from "react";

export type FlowVariant = "wind" | "magnetic" | "curl" | "spiral";

export interface FlowFieldBackgroundProps {
  variant?: FlowVariant;
  colors?: string[];
  speed?: number;
  particleCount?: number;
  trailLength?: number;
  opacity?: number;
  className?: string;
}

function hexToRGBA(hex: string, a: number): string {
  const h = hex.replace("#", "");
  return `rgba(${parseInt(h.substring(0, 2), 16)},${parseInt(h.substring(2, 4), 16)},${parseInt(h.substring(4, 6), 16)},${a})`;
}

export const FlowFieldBackground: React.FC<FlowFieldBackgroundProps> = ({
  variant = "wind",
  colors,
  speed = 1,
  particleCount = 800,
  trailLength = 0.92,
  opacity = 0.6,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const palette = colors || ["#8b5cf6", "#6366f1", "#3b82f6", "#06b6d4", "#14b8a6"];

    interface Particle {
      x: number;
      y: number;
      prevX: number;
      prevY: number;
      color: string;
      life: number;
      maxLife: number;
    }

    const createParticle = (): Particle => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return {
        x, y, prevX: x, prevY: y,
        color: palette[Math.floor(Math.random() * palette.length)],
        life: 0,
        maxLife: 100 + Math.random() * 200,
      };
    };

    let particles: Particle[] = Array.from({ length: particleCount }, createParticle);
    let t = 0;

    const getAngle = (x: number, y: number): number => {
      const w = canvas.width;
      const h = canvas.height;
      const nx = x / w;
      const ny = y / h;

      if (variant === "wind") {
        return (
          Math.sin(nx * 4 + t * 0.5) * 0.5 +
          Math.cos(ny * 3 - t * 0.3) * 0.3 +
          Math.sin((nx + ny) * 2 + t * 0.2) * 0.2 +
          t * 0.1
        );
      }

      if (variant === "magnetic") {
        // Two magnetic poles
        const p1x = w * 0.3, p1y = h * 0.4;
        const p2x = w * 0.7, p2y = h * 0.6;
        const a1 = Math.atan2(y - p1y, x - p1x);
        const a2 = Math.atan2(y - p2y, x - p2x);
        const d1 = Math.sqrt((x - p1x) ** 2 + (y - p1y) ** 2);
        const d2 = Math.sqrt((x - p2x) ** 2 + (y - p2y) ** 2);
        return (a1 * d2 + (a2 + Math.PI) * d1) / (d1 + d2) + Math.sin(t * 0.3) * 0.2;
      }

      if (variant === "curl") {
        const s = 0.005;
        const n1 = Math.sin(x * s + t * 0.3) * Math.cos(y * s * 1.3 - t * 0.2);
        const n2 = Math.sin(y * s * 0.7 + t * 0.25) * Math.cos(x * s * 1.1 + t * 0.15);
        return Math.atan2(n1 - n2, n1 + n2) + t * 0.05;
      }

      // spiral
      const cx = w / 2 + Math.sin(t * 0.2) * w * 0.1;
      const cy = h / 2 + Math.cos(t * 0.15) * h * 0.1;
      const dx = x - cx;
      const dy = y - cy;
      const angle = Math.atan2(dy, dx);
      const dist = Math.sqrt(dx * dx + dy * dy);
      return angle + Math.PI / 2 + 0.5 / (dist * 0.01 + 1) + t * 0.1;
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Fade trail
      ctx.fillStyle = `rgba(9, 9, 11, ${1 - trailLength})`;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.prevX = p.x;
        p.prevY = p.y;

        const angle = getAngle(p.x, p.y);
        const spd = 1.5 * speed;
        p.x += Math.cos(angle) * spd;
        p.y += Math.sin(angle) * spd;
        p.life++;

        // Fade in/out based on life
        const lifeRatio = p.life / p.maxLife;
        const fadeIn = Math.min(1, p.life / 20);
        const fadeOut = Math.max(0, 1 - (lifeRatio - 0.8) / 0.2);
        const alpha = fadeIn * (lifeRatio > 0.8 ? fadeOut : 1) * opacity;

        // Draw line segment
        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = hexToRGBA(p.color, alpha);
        ctx.lineWidth = 1;
        ctx.stroke();

        // Reset if out of bounds or dead
        if (p.x < -10 || p.x > w + 10 || p.y < -10 || p.y > h + 10 || p.life > p.maxLife) {
          particles[i] = createParticle();
        }
      }

      t += 0.02 * speed;
      rafRef.current = requestAnimationFrame(draw);
    };

    // Clear first
    ctx.fillStyle = "#09090b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [variant, colors, speed, particleCount, trailLength, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "fixed inset-0 -z-10 pointer-events-none w-full h-full"}
      style={{ display: "block" }}
    />
  );
};

FlowFieldBackground.displayName = "FlowFieldBackground";
