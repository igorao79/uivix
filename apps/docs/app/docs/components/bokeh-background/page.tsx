"use client";

import { useState } from "react";
import { BokehBackground } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { BokehBackground } from "@igorao79/uivix";`;

const shapes = ["circle", "hexagon", "diamond", "triangle", "star", "ring", "mixed"] as const;

const colorPresets = [
  { label: "Mixed", colors: ["#8b5cf6", "#3b82f6", "#06b6d4", "#ec4899", "#f97316"] },
  { label: "Warm", colors: ["#f43f5e", "#f97316", "#eab308", "#ec4899"] },
  { label: "Cool", colors: ["#3b82f6", "#06b6d4", "#8b5cf6", "#14b8a6"] },
  { label: "Mono", colors: ["#a1a1aa", "#71717a", "#d4d4d8"] },
];

export default function BokehBackgroundPage() {
  const [colorIdx, setColorIdx] = useState(0);
  const [shapeIdx, setShapeIdx] = useState(0);
  const [count, setCount] = useState(15);
  const [speed, setSpeed] = useState(1);
  const [key, setKey] = useState(0);
  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Bokeh Background</h1>
      <p className="text-zinc-400 mb-8">Soft, blurred floating shapes — circles, hexagons, diamonds, triangles, stars, rings, or a mix of all.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-0 mb-6 overflow-hidden">
        <div className="relative w-full h-[400px] bg-zinc-950 overflow-hidden">
          <BokehBackground key={key} colors={colorPresets[colorIdx].colors} shape={shapes[shapeIdx]} count={count} speed={speed} className="absolute inset-0 w-full h-full" />
        </div>
        <div className="border-t border-zinc-800 p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Shape</label>
            <div className="flex flex-wrap gap-2">
              {shapes.map((s, i) => (
                <button key={s} onClick={() => { setShapeIdx(i); replay(); }} className={`px-3 py-1.5 text-xs rounded-md border transition-colors capitalize ${i === shapeIdx ? "border-violet-500 bg-violet-500/20 text-violet-300" : "border-zinc-700 text-zinc-400 hover:border-zinc-600"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Color Theme</label>
            <div className="flex flex-wrap gap-2">
              {colorPresets.map((p, i) => (
                <button key={i} onClick={() => { setColorIdx(i); replay(); }} className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${i === colorIdx ? "border-violet-500 bg-violet-500/20 text-violet-300" : "border-zinc-700 text-zinc-400 hover:border-zinc-600"}`}>{p.label}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <SliderControl label="Count" value={count} onChange={(v) => { setCount(v); replay(); }} min={5} max={30} />
            <SliderControl label="Speed" value={speed} onChange={(v) => { setSpeed(v); replay(); }} min={0.2} max={3} step={0.1} suffix="x" />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable props={[
        { name: "count", type: "number", default: "15", description: "Number of shapes" },
        { name: "shape", type: '"circle" | "hexagon" | "diamond" | "triangle" | "star" | "ring" | "mixed"', default: '"circle"', description: "Shape of bokeh elements" },
        { name: "colors", type: "string[]", default: '["#8b5cf6", ...]', description: "Shape colors" },
        { name: "speed", type: "number", default: "1", description: "Animation speed" },
        { name: "sizeRange", type: "[min, max]", default: "[40, 200]", description: "Size range in px" },
        { name: "className", type: "string", default: "fixed inset-0 ...", description: "CSS class" },
      ]} />
    </div>
  );
}
