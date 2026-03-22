"use client";

import { useState } from "react";
import { GradientMeshBackground } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { GradientMeshBackground } from "@igorao79/uivix";`;

const colorPresets = [
  { label: "Violet-Blue", colors: ["#8b5cf6", "#3b82f6", "#06b6d4", "#ec4899"] },
  { label: "Sunset", colors: ["#f43f5e", "#f97316", "#eab308", "#ec4899"] },
  { label: "Ocean", colors: ["#0ea5e9", "#06b6d4", "#14b8a6", "#3b82f6"] },
  { label: "Neon", colors: ["#a855f7", "#f43f5e", "#22d3ee", "#84cc16"] },
];

export default function GradientMeshBackgroundPage() {
  const [colorIdx, setColorIdx] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [intensity, setIntensity] = useState(1);
  const [key, setKey] = useState(0);
  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Gradient Mesh Background</h1>
      <p className="text-zinc-400 mb-8">Soft animated gradient blobs that drift and blend like a mesh gradient.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-0 mb-6 overflow-hidden">
        <div className="relative w-full h-[400px] bg-zinc-950 overflow-hidden">
          <GradientMeshBackground key={key} colors={colorPresets[colorIdx].colors} speed={speed} intensity={intensity} className="absolute inset-0 w-full h-full" />
        </div>
        <div className="border-t border-zinc-800 p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Color Theme</label>
            <div className="flex flex-wrap gap-2">
              {colorPresets.map((p, i) => (
                <button key={i} onClick={() => { setColorIdx(i); replay(); }} className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${i === colorIdx ? "border-violet-500 bg-violet-500/20 text-violet-300" : "border-zinc-700 text-zinc-400 hover:border-zinc-600"}`}>{p.label}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <SliderControl label="Speed" value={speed} onChange={(v) => { setSpeed(v); replay(); }} min={0.2} max={4} step={0.1} suffix="x" />
            <SliderControl label="Intensity" value={intensity} onChange={(v) => { setIntensity(v); replay(); }} min={0.3} max={2} step={0.1} />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable props={[
        { name: "colors", type: "string[]", default: '["#8b5cf6", "#3b82f6", "#06b6d4", "#ec4899"]', description: "4 gradient blob colors" },
        { name: "speed", type: "number", default: "1", description: "Animation speed" },
        { name: "intensity", type: "number", default: "1", description: "Opacity/contrast multiplier" },
        { name: "className", type: "string", default: "fixed inset-0 ...", description: "CSS class" },
      ]} />
    </div>
  );
}
