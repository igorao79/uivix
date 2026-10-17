"use client";

import React from "react";
import { cn } from "../../utils/cn";

export interface OrbitRing {
  /** Items orbiting on this ring */
  items: React.ReactNode[];
  /** Ring radius in px */
  radius: number;
  /** Seconds per full revolution */
  duration?: number;
  /** Spin counter-clockwise */
  reverse?: boolean;
  /** Item box size in px */
  itemSize?: number;
}

export interface OrbitingCirclesProps {
  rings: OrbitRing[];
  /** Content in the middle */
  center?: React.ReactNode;
  /** Draw the orbit paths */
  showPaths?: boolean;
  className?: string;
}

/** Items orbiting a center element on concentric rings. Orbiting items stay upright. */
export const OrbitingCircles: React.FC<OrbitingCirclesProps> = ({ rings, center, showPaths = true, className }) => {
  const max = Math.max(...rings.map((r) => r.radius + (r.itemSize ?? 40) / 2), 0);

  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: max * 2, height: max * 2 }}>
      <style>{`
        @keyframes uixy-orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes uixy-orbit-rev { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
      `}</style>
      <div className="relative z-10">{center}</div>
      {rings.map((ring, ri) => {
        const size = ring.itemSize ?? 40;
        const duration = ring.duration ?? 20;
        const spin = ring.reverse ? "uixy-orbit-rev" : "uixy-orbit";
        const counter = ring.reverse ? "uixy-orbit" : "uixy-orbit-rev";
        return (
          <React.Fragment key={ri}>
            {showPaths && (
              <div
                className="absolute rounded-full border border-white/10"
                style={{ width: ring.radius * 2, height: ring.radius * 2 }}
              />
            )}
            <div
              className="absolute"
              style={{ width: ring.radius * 2, height: ring.radius * 2, animation: `${spin} ${duration}s linear infinite` }}
            >
              {ring.items.map((item, i) => {
                const angle = (i / ring.items.length) * 2 * Math.PI;
                return (
                  <div
                    key={i}
                    className="absolute flex items-center justify-center"
                    style={{
                      width: size,
                      height: size,
                      left: ring.radius + Math.cos(angle) * ring.radius - size / 2,
                      top: ring.radius + Math.sin(angle) * ring.radius - size / 2,
                      animation: `${counter} ${duration}s linear infinite`,
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

OrbitingCircles.displayName = "OrbitingCircles";
