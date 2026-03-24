"use client";

import { useState } from "react";
import { NoiseBackground } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { NoiseBackground } from "@igorao79/uivix";`;

const variants = [
  { name: "perlin", label: "Perlin", description: "Classic flowing Perlin noise" },
  { name: "clouds", label: "Clouds", description: "Layered cloud-like formations" },
  { name: "marble", label: "Marble", description: "Marble/vein texture patterns" },
  { name: "electric", label: "Electric", description: "Crackling electric energy" },
] as const;

const colorPresets = [
  { label: "Violet", colors: ["#8b5cf6", "#6366f1", "#3b82f6", "#06b6d4", "#14b8a6"] },
  { label: "Fire", colors: ["#991b1b", "#dc2626", "#f97316", "#eab308", "#fbbf24"] },
  { label: "Ocean", colors: ["#0c4a6e", "#0369a1", "#0284c7", "#06b6d4", "#22d3ee"] },
  { label: "Forest", colors: ["#14532d", "#166534", "#15803d", "#22c55e", "#4ade80"] },
];

export default function NoiseBackgroundPage() {
  const [variantIdx, setVariantIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [scale, setScale] = useState(1);
  const [key, setKey] = useState(0);
  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Noise Background</h1>
      <p className="text-zinc-400 mb-8">Procedurally generated noise textures — perlin, clouds, marble veins, and electric energy.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-0 mb-6 overflow-hidden">
        <div className="relative w-full h-[400px] bg-zinc-950 overflow-hidden">
          <NoiseBackground key={key} variant={variants[variantIdx].name} colors={colorPresets[colorIdx].colors} speed={speed} scale={scale} className="absolute inset-0 w-full h-full" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <SliderControl label="Speed" value={speed} onChange={(v) => { setSpeed(v); replay(); }} min={0.1} max={3} step={0.1} suffix="x" />
            <SliderControl label="Scale" value={scale} onChange={(v) => { setScale(v); replay(); }} min={0.3} max={3} step={0.1} suffix="x" />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable props={[
        { name: "variant", type: '"perlin" | "clouds" | "marble" | "electric"', default: '"perlin"', description: "Noise generation algorithm" },
        { name: "colors", type: "string[]", default: '["#8b5cf6", ...]', description: "Color palette" },
        { name: "speed", type: "number", default: "1", description: "Animation speed" },
        { name: "scale", type: "number", default: "1", description: "Noise scale (zoom)" },
        { name: "opacity", type: "number", default: "0.8", description: "Overall opacity" },
        { name: "className", type: "string", default: "fixed inset-0 ...", description: "CSS class" },
      ]} />
    </div>
  );
}
