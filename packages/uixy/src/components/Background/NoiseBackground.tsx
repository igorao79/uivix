"use client";

import React, { useEffect, useRef } from "react";

export type NoiseVariant = "perlin" | "clouds" | "marble" | "electric";

export interface NoiseBackgroundProps {
  variant?: NoiseVariant;
  colors?: string[];
  speed?: number;
  scale?: number;
  opacity?: number;
  className?: string;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.substring(0, 2), 16), parseInt(h.substring(2, 4), 16), parseInt(h.substring(4, 6), 16)];
}

// Simple 2D noise (value noise with smooth interpolation)
function createNoiseGen(seed: number) {
  const size = 256;
  const perm = new Uint8Array(size * 2);
  let s = seed;
  const rng = () => { s = (s * 16807 + 0) % 2147483647; return (s & 0x7fffffff) / 0x7fffffff; };
  const vals = new Float32Array(size);
  for (let i = 0; i < size; i++) vals[i] = rng();
  for (let i = 0; i < size; i++) perm[i] = perm[i + size] = Math.floor(rng() * size);

  return (x: number, y: number) => {
    const xi = Math.floor(x) & (size - 1);
    const yi = Math.floor(y) & (size - 1);
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = xf * xf * (3 - 2 * xf);
    const v = yf * yf * (3 - 2 * yf);
    const a = vals[perm[xi + perm[yi]]];
    const b = vals[perm[xi + 1 + perm[yi]]];
    const c = vals[perm[xi + perm[yi + 1]]];
    const d = vals[perm[xi + 1 + perm[yi + 1]]];
    return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
  };
}

function fbm(noiseFn: (x: number, y: number) => number, x: number, y: number, octaves: number): number {
  let val = 0, amp = 0.5, freq = 1;
  for (let i = 0; i < octaves; i++) {
    val += amp * noiseFn(x * freq, y * freq);
    amp *= 0.5;
    freq *= 2;
  }
  return val;
}

export const NoiseBackground: React.FC<NoiseBackgroundProps> = ({
  variant = "perlin",
  colors,
  speed = 1,
  scale = 1,
  opacity = 0.8,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use lower resolution for performance
    const pixelRatio = 0.25;
    const resize = () => {
      canvas.width = Math.ceil(canvas.offsetWidth * pixelRatio);
      canvas.height = Math.ceil(canvas.offsetHeight * pixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const noise1 = createNoiseGen(42);
    const noise2 = createNoiseGen(137);
    const noise3 = createNoiseGen(256);

    const palette = (colors || ["#8b5cf6", "#6366f1", "#3b82f6", "#06b6d4", "#14b8a6"]).map(hexToRgb);

    let t = 0;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;
      const sc = 0.008 / scale;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          let val: number;
          const px = x * sc;
          const py = y * sc;

          if (variant === "perlin") {
            val = fbm(noise1, px + t * 0.3, py + t * 0.2, 5);
          } else if (variant === "clouds") {
            const n1 = fbm(noise1, px + t * 0.15, py + t * 0.1, 4);
            const n2 = fbm(noise2, px * 2 - t * 0.1, py * 2 + t * 0.15, 3) * 0.3;
            val = Math.min(1, Math.max(0, n1 + n2));
          } else if (variant === "marble") {
            const n = fbm(noise1, px, py + t * 0.2, 5);
            val = (Math.sin(px * 8 + n * 20 + t) + 1) * 0.5;
          } else {
            // electric
            const n1 = fbm(noise1, px + t * 0.5, py, 4);
            const n2 = fbm(noise2, px, py + t * 0.5, 4);
            const n3 = fbm(noise3, px + t * 0.3, py + t * 0.3, 3);
            const raw = Math.abs(Math.sin(n1 * 12 + t * 2)) * Math.abs(Math.cos(n2 * 10 - t));
            val = raw * raw + n3 * 0.15;
            val = Math.min(1, val);
          }

          // Map to palette
          const pi = val * (palette.length - 1);
          const idx0 = Math.floor(pi);
          const idx1 = Math.min(idx0 + 1, palette.length - 1);
          const frac = pi - idx0;
          const [r0, g0, b0] = palette[idx0];
          const [r1, g1, b1] = palette[idx1];

          const i = (y * w + x) * 4;
          data[i] = Math.round(r0 + (r1 - r0) * frac);
          data[i + 1] = Math.round(g0 + (g1 - g0) * frac);
          data[i + 2] = Math.round(b0 + (b1 - b0) * frac);
          data[i + 3] = Math.round(opacity * 255);
        }
      }

      ctx.putImageData(imgData, 0, 0);
      t += 0.008 * speed;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [variant, colors, speed, scale, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "fixed inset-0 -z-10 pointer-events-none w-full h-full"}
      style={{ display: "block", imageRendering: "auto", width: "100%", height: "100%" }}
    />
  );
};

NoiseBackground.displayName = "NoiseBackground";
