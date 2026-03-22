"use client";

import { useState } from "react";
import { RetroGridBackground } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { RetroGridBackground } from "@igorao79/uivix";`;

const colorPresets = [
  { label: "Violet", color: "#8b5cf6" },
  { label: "Cyan", color: "#06b6d4" },
  { label: "Rose", color: "#f43f5e" },
  { label: "Green", color: "#22c55e" },
  { label: "Orange", color: "#f97316" },
];

export default function RetroGridBackgroundPage() {
  const [colorIdx, setColorIdx] = useState(0);
  const [cellSize, setCellSize] = useState(60);
  const [speed, setSpeed] = useState(1);
  const [key, setKey] = useState(0);
  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Retro Grid Background</h1>
      <p className="text-zinc-400 mb-8">Synthwave-style 3D perspective grid scrolling into the horizon with a glowing horizon line.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-0 mb-6 overflow-hidden">
        <div className="relative w-full h-[400px] bg-zinc-950 overflow-hidden">
          <RetroGridBackground key={key} lineColor={colorPresets[colorIdx].color} cellSize={cellSize} speed={speed} className="absolute inset-0 w-full h-full" />
        </div>
        <div className="border-t border-zinc-800 p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Color</label>
            <div className="flex flex-wrap gap-2">
              {colorPresets.map((p, i) => (
                <button key={i} onClick={() => { setColorIdx(i); replay(); }} className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${i === colorIdx ? "border-violet-500 bg-violet-500/20 text-violet-300" : "border-zinc-700 text-zinc-400 hover:border-zinc-600"}`}>
                  <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: p.color }} />{p.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <SliderControl label="Cell Size" value={cellSize} onChange={(v) => { setCellSize(v); replay(); }} min={20} max={120} suffix="px" />
            <SliderControl label="Speed" value={speed} onChange={(v) => { setSpeed(v); replay(); }} min={0.2} max={4} step={0.1} suffix="x" />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable props={[
        { name: "angle", type: "number", default: "65", description: "Perspective rotation angle" },
        { name: "cellSize", type: "number", default: "60", description: "Grid cell size in px" },
        { name: "lineColor", type: "string", default: '"#8b5cf6"', description: "Grid line color" },
        { name: "lineOpacity", type: "number", default: "0.25", description: "Line opacity" },
        { name: "speed", type: "number", default: "1", description: "Scroll speed" },
        { name: "fade", type: "boolean", default: "true", description: "Bottom fade gradient" },
        { name: "fadeColor", type: "string", default: '"#09090b"', description: "Fade color" },
        { name: "className", type: "string", default: "fixed inset-0 ...", description: "CSS class" },
      ]} />
    </div>
  );
}
