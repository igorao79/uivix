"use client";

import { useState } from "react";
import { GeometricBackground } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { GeometricBackground } from "@igorao79/uivix";`;

const variants = [
  { name: "triangles", label: "Triangles", description: "Pulsating triangle tessellation" },
  { name: "hexgrid", label: "Hex Grid", description: "Breathing hexagonal grid" },
  { name: "voronoi", label: "Voronoi", description: "Moving Voronoi cell diagram" },
  { name: "circles", label: "Circles", description: "Pulsating circle grid" },
] as const;

const colorPresets = [
  { label: "Violet", colors: ["#8b5cf6", "#6366f1", "#3b82f6", "#06b6d4", "#14b8a6"] },
  { label: "Warm", colors: ["#f43f5e", "#f97316", "#eab308", "#ec4899"] },
  { label: "Mono", colors: ["#52525b", "#71717a", "#a1a1aa", "#d4d4d8"] },
  { label: "Neon", colors: ["#a855f7", "#ec4899", "#14b8a6", "#eab308"] },
];

export default function GeometricBackgroundPage() {
  const [variantIdx, setVariantIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const [cellSize, setCellSize] = useState(60);
  const [speed, setSpeed] = useState(1);
  const [key, setKey] = useState(0);
  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Geometric Background</h1>
      <p className="text-zinc-400 mb-8">Animated geometric patterns — triangles, hexagonal grids, Voronoi diagrams, and circle grids.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-0 mb-6 overflow-hidden">
        <div className="relative w-full h-[400px] bg-zinc-950 overflow-hidden">
          <GeometricBackground key={key} variant={variants[variantIdx].name} colors={colorPresets[colorIdx].colors} cellSize={cellSize} speed={speed} className="absolute inset-0 w-full h-full" />
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
            <SliderControl label="Cell Size" value={cellSize} onChange={(v) => { setCellSize(v); replay(); }} min={20} max={120} suffix="px" />
            <SliderControl label="Speed" value={speed} onChange={(v) => { setSpeed(v); replay(); }} min={0.1} max={3} step={0.1} suffix="x" />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable props={[
        { name: "variant", type: '"triangles" | "hexgrid" | "voronoi" | "circles"', default: '"triangles"', description: "Geometric pattern type" },
        { name: "colors", type: "string[]", default: '["#8b5cf6", ...]', description: "Color palette" },
        { name: "cellSize", type: "number", default: "60", description: "Size of each cell in px" },
        { name: "speed", type: "number", default: "1", description: "Animation speed" },
        { name: "opacity", type: "number", default: "0.5", description: "Overall opacity" },
        { name: "className", type: "string", default: "fixed inset-0 ...", description: "CSS class" },
      ]} />
    </div>
  );
}
