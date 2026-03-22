"use client";

import { useState } from "react";
import { PixelBackground } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { PixelBackground } from "@igorao79/uivix";`;

const variants = [
  { name: "rain", label: "Rain", description: "Falling pixel rain columns" },
  { name: "life", label: "Game of Life", description: "Conway's Game of Life cellular automaton" },
  { name: "terrain", label: "Terrain", description: "Animated topographic color map" },
  { name: "noise", label: "Noise", description: "Random sparkling pixel noise" },
] as const;

const colorPresets = [
  { label: "Violet", colors: ["#8b5cf6", "#6366f1", "#3b82f6", "#06b6d4"] },
  { label: "Green", colors: ["#22c55e", "#16a34a", "#15803d"] },
  { label: "Fire", colors: ["#ef4444", "#f97316", "#eab308", "#fbbf24"] },
  { label: "Retro", colors: ["#84cc16", "#22c55e", "#14b8a6", "#06b6d4"] },
];

export default function PixelBackgroundPage() {
  const [variantIdx, setVariantIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const [pixelSize, setPixelSize] = useState(8);
  const [speed, setSpeed] = useState(1);
  const [opacity, setOpacity] = useState(0.6);
  const [key, setKey] = useState(0);
  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Pixel Art Background</h1>
      <p className="text-zinc-400 mb-8">
        Retro pixel art animated backgrounds — rain, Game of Life, terrain maps, and noise.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-0 mb-6 overflow-hidden">
        <div className="relative w-full h-[400px] bg-black overflow-hidden">
          <PixelBackground
            key={key}
            variant={variants[variantIdx].name}
            colors={colorPresets[colorIdx].colors}
            pixelSize={pixelSize}
            speed={speed}
            opacity={opacity}
            className="absolute inset-0 w-full h-full"
          />
        </div>
        <div className="border-t border-zinc-800 p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Variant</label>
            <div className="flex flex-wrap gap-2">
              {variants.map((v, i) => (
                <button key={v.name} onClick={() => { setVariantIdx(i); replay(); }} className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${i === variantIdx ? "border-violet-500 bg-violet-500/20 text-violet-300" : "border-zinc-700 text-zinc-400 hover:border-zinc-600"}`}>{v.label}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Color</label>
            <div className="flex flex-wrap gap-2">
              {colorPresets.map((p, i) => (
                <button key={i} onClick={() => { setColorIdx(i); replay(); }} className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${i === colorIdx ? "border-violet-500 bg-violet-500/20 text-violet-300" : "border-zinc-700 text-zinc-400 hover:border-zinc-600"}`}>{p.label}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <SliderControl label="Pixel Size" value={pixelSize} onChange={(v) => { setPixelSize(v); replay(); }} min={3} max={20} suffix="px" />
            <SliderControl label="Speed" value={speed} onChange={(v) => { setSpeed(v); replay(); }} min={0.2} max={4} step={0.1} suffix="x" />
            <SliderControl label="Opacity" value={opacity} onChange={(v) => { setOpacity(v); replay(); }} min={0.1} max={1} step={0.05} />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable props={[
        { name: "variant", type: '"rain" | "life" | "terrain" | "noise"', default: '"rain"', description: "Pixel art animation style" },
        { name: "pixelSize", type: "number", default: "8", description: "Size of each pixel in px" },
        { name: "colors", type: "string[]", default: "variant-dependent", description: "Color palette" },
        { name: "speed", type: "number", default: "1", description: "Animation speed" },
        { name: "opacity", type: "number", default: "0.6", description: "Pixel opacity" },
        { name: "className", type: "string", default: "fixed inset-0 ...", description: "CSS class" },
      ]} />
    </div>
  );
}
