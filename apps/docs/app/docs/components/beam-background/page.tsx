"use client";

import { useState } from "react";
import { BeamsBackground } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { BeamsBackground } from "@igorao79/uivix";`;

const colorPresets = [
  { label: "Mixed", colors: ["#8b5cf6", "#3b82f6", "#06b6d4", "#ec4899"] },
  { label: "Warm", colors: ["#f43f5e", "#f97316", "#eab308"] },
  { label: "Cool", colors: ["#3b82f6", "#06b6d4", "#8b5cf6"] },
  { label: "Green", colors: ["#22c55e", "#14b8a6", "#06b6d4"] },
  { label: "Mono", colors: ["#d4d4d8", "#a1a1aa", "#71717a"] },
];

export default function BeamBackgroundPage() {
  const [colorIdx, setColorIdx] = useState(0);
  const [count, setCount] = useState(8);
  const [speed, setSpeed] = useState(1);
  const [opacity, setOpacity] = useState(0.12);
  const [beamWidth, setBeamWidth] = useState(300);
  const [key, setKey] = useState(0);
  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Beams Background</h1>
      <p className="text-zinc-400 mb-8">Soft light beams radiating upward with gentle swaying motion.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-0 mb-6 overflow-hidden">
        <div className="relative w-full h-[400px] bg-zinc-950 overflow-hidden">
          <BeamsBackground key={key} colors={colorPresets[colorIdx].colors} count={count} speed={speed} opacity={opacity} beamWidth={beamWidth} className="absolute inset-0 w-full h-full" />
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
            <SliderControl label="Beams" value={count} onChange={(v) => { setCount(v); replay(); }} min={3} max={15} />
            <SliderControl label="Speed" value={speed} onChange={(v) => { setSpeed(v); replay(); }} min={0.3} max={3} step={0.1} suffix="x" />
            <SliderControl label="Opacity" value={opacity} onChange={(v) => { setOpacity(v); replay(); }} min={0.05} max={0.4} step={0.01} />
            <SliderControl label="Width" value={beamWidth} onChange={(v) => { setBeamWidth(v); replay(); }} min={100} max={600} suffix="px" />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable props={[
        { name: "count", type: "number", default: "8", description: "Number of beams" },
        { name: "colors", type: "string[]", default: '["#8b5cf6", ...]', description: "Beam colors" },
        { name: "speed", type: "number", default: "1", description: "Animation speed" },
        { name: "opacity", type: "number", default: "0.12", description: "Beam max opacity" },
        { name: "beamWidth", type: "number", default: "300", description: "Beam width in px" },
        { name: "className", type: "string", default: "fixed inset-0 ...", description: "CSS class" },
      ]} />
    </div>
  );
}
