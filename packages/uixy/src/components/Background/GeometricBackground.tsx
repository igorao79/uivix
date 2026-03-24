"use client";

import React, { useEffect, useRef } from "react";

export type GeometricVariant = "triangles" | "hexgrid" | "voronoi" | "circles";

export interface GeometricBackgroundProps {
  variant?: GeometricVariant;
  colors?: string[];
  speed?: number;
  cellSize?: number;
  opacity?: number;
  className?: string;
}

function hexToRGBA(hex: string, a: number): string {
  const h = hex.replace("#", "");
  return `rgba(${parseInt(h.substring(0, 2), 16)},${parseInt(h.substring(2, 4), 16)},${parseInt(h.substring(4, 6), 16)},${a})`;
}

export const GeometricBackground: React.FC<GeometricBackgroundProps> = ({
  variant = "triangles",
  colors,
  speed = 1,
  cellSize = 60,
  opacity = 0.5,
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
    let t = 0;

    // Pre-generate voronoi seeds
    const voronoiCount = Math.max(20, Math.floor((canvas.width * canvas.height) / (cellSize * cellSize * 4)));
    const seeds = Array.from({ length: voronoiCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      color: palette[Math.floor(Math.random() * palette.length)],
    }));

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      if (variant === "triangles") {
        const cs = cellSize;
        const rowH = cs * Math.sin(Math.PI / 3);
        const cols = Math.ceil(w / cs) + 2;
        const rows = Math.ceil(h / rowH) + 2;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const offset = r % 2 === 0 ? 0 : cs / 2;
            const x = c * cs + offset;
            const y = r * rowH;

            // Two triangles per cell
            for (let tri = 0; tri < 2; tri++) {
              const phase = Math.sin(t * 0.5 + c * 0.3 + r * 0.4 + tri) * 0.5 + 0.5;
              const cIdx = Math.floor(phase * (palette.length - 1));
              const alpha = (0.15 + phase * 0.35) * opacity;

              ctx.beginPath();
              if (tri === 0) {
                ctx.moveTo(x, y);
                ctx.lineTo(x + cs, y);
                ctx.lineTo(x + cs / 2, y + rowH);
              } else {
                ctx.moveTo(x + cs / 2, y);
                ctx.lineTo(x + cs * 1.5, y);
                ctx.lineTo(x + cs, y + rowH);
              }
              ctx.closePath();
              ctx.fillStyle = hexToRGBA(palette[cIdx], alpha);
              ctx.fill();
              ctx.strokeStyle = hexToRGBA(palette[cIdx], alpha * 0.5);
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      else if (variant === "hexgrid") {
        const size = cellSize / 2;
        const hSpacing = size * 1.5;
        const vSpacing = size * Math.sqrt(3);
        const cols = Math.ceil(w / hSpacing) + 2;
        const rows = Math.ceil(h / vSpacing) + 2;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const cx = c * hSpacing;
            const cy = r * vSpacing + (c % 2 === 1 ? vSpacing / 2 : 0);
            const phase = Math.sin(t * 0.4 + c * 0.2 + r * 0.3) * 0.5 + 0.5;
            const pulse = 0.85 + Math.sin(t * 0.8 + c * 0.5 + r * 0.7) * 0.15;
            const cIdx = Math.floor(phase * (palette.length - 1));
            const alpha = (0.1 + phase * 0.4) * opacity;

            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (Math.PI / 3) * i - Math.PI / 6;
              const px = cx + size * pulse * Math.cos(angle);
              const py = cy + size * pulse * Math.sin(angle);
              if (i === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fillStyle = hexToRGBA(palette[cIdx], alpha * 0.6);
            ctx.fill();
            ctx.strokeStyle = hexToRGBA(palette[cIdx], alpha);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      else if (variant === "voronoi") {
        // Move seeds
        for (const s of seeds) {
          s.x += s.vx * speed;
          s.y += s.vy * speed;
          if (s.x < 0 || s.x > w) s.vx *= -1;
          if (s.y < 0 || s.y > h) s.vy *= -1;
        }

        // Draw voronoi using brute-force pixel sampling (low res)
        const step = 8;
        for (let y = 0; y < h; y += step) {
          for (let x = 0; x < w; x += step) {
            let minDist = Infinity;
            let secondDist = Infinity;
            let closest = 0;
            for (let i = 0; i < seeds.length; i++) {
              const dx = x - seeds[i].x;
              const dy = y - seeds[i].y;
              const d = dx * dx + dy * dy;
              if (d < minDist) {
                secondDist = minDist;
                minDist = d;
                closest = i;
              } else if (d < secondDist) {
                secondDist = d;
              }
            }
            const edge = Math.sqrt(secondDist) - Math.sqrt(minDist);
            const isEdge = edge < 8;
            const alpha = isEdge ? opacity * 0.8 : opacity * 0.15;
            ctx.fillStyle = hexToRGBA(seeds[closest].color, alpha);
            ctx.fillRect(x, y, step, step);
          }
        }
      }

      else if (variant === "circles") {
        const cs = cellSize;
        const cols = Math.ceil(w / cs) + 1;
        const rows = Math.ceil(h / cs) + 1;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const cx = c * cs + cs / 2;
            const cy = r * cs + cs / 2;
            const phase = Math.sin(t * 0.6 + c * 0.4 + r * 0.5) * 0.5 + 0.5;
            const radius = (cs * 0.3) * (0.3 + phase * 0.7);
            const cIdx = Math.floor(phase * (palette.length - 1));
            const alpha = (0.15 + phase * 0.35) * opacity;

            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fillStyle = hexToRGBA(palette[cIdx], alpha * 0.5);
            ctx.fill();
            ctx.strokeStyle = hexToRGBA(palette[cIdx], alpha);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      t += 0.015 * speed;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [variant, colors, speed, cellSize, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "fixed inset-0 -z-10 pointer-events-none w-full h-full"}
      style={{ display: "block" }}
    />
  );
};

GeometricBackground.displayName = "GeometricBackground";
