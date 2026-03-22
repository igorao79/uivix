"use client";

import { useState } from "react";
import { ParticleBackground } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { ParticleBackground } from "@igorao79/uivix";`;

const presets = [
  {
    label: "Text Labels",
    items: ["React", "Next.js", "Tailwind", "TypeScript", "Node.js", "Vite", "ESLint", "Prettier", "Zustand", "SWR"],
    arrows: false,
    color: [110, 120, 220] as [number, number, number],
  },
  {
    label: "Emojis",
    items: ["\u2b50", "\ud83d\ude80", "\ud83d\udd25", "\ud83c\udf1f", "\u26a1", "\ud83c\udf08", "\ud83d\udc8e", "\ud83c\udfaf", "\ud83e\udde0", "\ud83c\udf89"],
    arrows: false,
    color: [180, 130, 80] as [number, number, number],
  },
  {
    label: "Mixed + Arrows",
    items: ["PNG", "JPG", "\u27a1\ufe0f", "WebP", "SVG", "\ud83d\uddbc\ufe0f", "AVIF", "GIF", "\ud83d\udcc1", "PDF"],
    arrows: true,
    color: [100, 160, 180] as [number, number, number],
  },
  {
    label: "File Formats",
    items: [".tsx", ".jsx", ".css", ".html", ".json", ".ts", ".md", ".yaml", ".env", ".lock"],
    arrows: true,
    color: [130, 200, 130] as [number, number, number],
  },
];

export default function ParticleBackgroundPage() {
  const [presetIdx, setPresetIdx] = useState(0);
  const [connectionDist, setConnectionDist] = useState(180);
  const [mouseDist, setMouseDist] = useState(200);
  const [speed, setSpeed] = useState(1);
  const [showArrows, setShowArrows] = useState(false);
  const [key, setKey] = useState(0);

  const preset = presets[presetIdx];
  const currentArrows = presetIdx === 0 ? showArrows : preset.arrows;

  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Particle Background</h1>
      <p className="text-zinc-400 mb-8">
        Animated canvas background with floating text, emojis, or images connected by lines. Supports arrows and mouse interaction.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-0 mb-6 overflow-hidden">
        <div className="relative w-full h-[400px] bg-zinc-950">
          <ParticleBackground
            key={key}
            items={preset.items}
            arrows={currentArrows}
            color={preset.color}
            connectionDistance={connectionDist}
            mouseDistance={mouseDist}
            speed={speed}
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-zinc-600 text-sm">Move your mouse over the canvas</p>
          </div>
        </div>
        <div className="border-t border-zinc-800 p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Preset</label>
            <div className="flex flex-wrap gap-2">
              {presets.map((p, i) => (
                <button
                  key={i}
                  onClick={() => { setPresetIdx(i); replay(); }}
                  className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                    i === presetIdx
                      ? "border-violet-500 bg-violet-500/20 text-violet-300"
                      : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <SliderControl label="Connection Distance" value={connectionDist} onChange={(v) => { setConnectionDist(v); replay(); }} min={80} max={300} suffix="px" />
            <SliderControl label="Mouse Distance" value={mouseDist} onChange={(v) => { setMouseDist(v); replay(); }} min={80} max={350} suffix="px" />
            <SliderControl label="Speed" value={speed} onChange={(v) => { setSpeed(v); replay(); }} min={0.2} max={3} step={0.1} suffix="x" />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setShowArrows(!showArrows); replay(); }}
              className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                currentArrows
                  ? "border-violet-500 bg-violet-500/20 text-violet-300"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
              }`}
            >
              {currentArrows ? "Arrows On" : "Arrows Off"}
            </button>
            <button onClick={replay} className="text-xs text-violet-400 hover:text-violet-300 underline">
              Replay
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Usage</h2>
      <CodeBlock code={`{/* Text labels */}
<ParticleBackground
  items={["React", "Next.js", "Tailwind", "TypeScript"]}
  connectionDistance={180}
  arrows
/>

{/* Emojis */}
<ParticleBackground
  items={["\u2b50", "\ud83d\ude80", "\ud83d\udd25", "\u26a1"]}
  color={[180, 130, 80]}
/>

{/* Mixed with images */}
<ParticleBackground
  items={[
    "PNG",
    { content: "\ud83d\uddbc\ufe0f", type: "emoji" },
    { content: "/logo.png", type: "image" },
  ]}
  arrows
/>`} />

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "items", type: "(string | ParticleNode)[]", default: "-", description: "Array of text, emoji, or image items (required)" },
          { name: "count", type: "number", default: "auto", description: "Max number of particles (auto-scales with screen)" },
          { name: "connectionDistance", type: "number", default: "180", description: "Max distance for connection lines (px)" },
          { name: "arrows", type: "boolean", default: "false", description: "Show arrowheads on connection lines" },
          { name: "mouseDistance", type: "number", default: "200", description: "Mouse interaction distance (px)" },
          { name: "color", type: "[r, g, b]", default: "[110, 120, 220]", description: "Base color for text and lines" },
          { name: "speed", type: "number", default: "1", description: "Movement speed multiplier" },
          { name: "fontSize", type: "[min, max]", default: "[13, 18]", description: "Font size range in px" },
          { name: "imageSize", type: "number", default: "28", description: "Size of image particles in px" },
          { name: "lineWidth", type: "number", default: "0.6", description: "Connection line width" },
          { name: "maxOpacity", type: "number", default: "0.25", description: "Maximum particle opacity" },
          { name: "className", type: "string", default: "fixed inset-0 ...", description: "CSS class for the canvas" },
        ]}
      />

      <h2 className="text-xl font-semibold mb-4 mt-8">ParticleNode</h2>
      <PropsTable
        props={[
          { name: "content", type: "string", default: "-", description: "Text, emoji, or image URL" },
          { name: "type", type: '"text" | "emoji" | "image"', default: '"text"', description: "Content type (auto-detected for strings)" },
        ]}
      />
    </div>
  );
}
