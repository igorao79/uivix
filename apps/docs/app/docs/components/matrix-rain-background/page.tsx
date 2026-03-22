"use client";

import { useState } from "react";
import { MatrixRainBackground } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { MatrixRainBackground } from "@igorao79/uivix";`;

const colorPresets = [
  { label: "Green", color: "#22c55e" },
  { label: "Cyan", color: "#06b6d4" },
  { label: "Violet", color: "#8b5cf6" },
  { label: "Red", color: "#ef4444" },
  { label: "Gold", color: "#eab308" },
];

export default function MatrixRainBackgroundPage() {
  const [colorIdx, setColorIdx] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [fontSize, setFontSize] = useState(14);
  const [key, setKey] = useState(0);
  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Matrix Rain Background</h1>
      <p className="text-zinc-400 mb-8">Classic falling code rain effect inspired by The Matrix.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-0 mb-6 overflow-hidden">
        <div className="relative w-full h-[400px] bg-black overflow-hidden">
          <MatrixRainBackground key={key} color={colorPresets[colorIdx].color} speed={speed} fontSize={fontSize} className="absolute inset-0 w-full h-full" />
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
            <SliderControl label="Speed" value={speed} onChange={(v) => { setSpeed(v); replay(); }} min={0.3} max={4} step={0.1} suffix="x" />
            <SliderControl label="Font Size" value={fontSize} onChange={(v) => { setFontSize(v); replay(); }} min={8} max={24} suffix="px" />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable props={[
        { name: "charset", type: "string", default: '"abcdef...&*<>{}"', description: "Characters to rain" },
        { name: "columnWidth", type: "number", default: "20", description: "Column spacing in px" },
        { name: "speed", type: "number", default: "1", description: "Fall speed multiplier" },
        { name: "color", type: "string", default: '"#22c55e"', description: "Text color" },
        { name: "fontSize", type: "number", default: "14", description: "Character size in px" },
        { name: "className", type: "string", default: "fixed inset-0 ...", description: "CSS class" },
      ]} />
    </div>
  );
}
