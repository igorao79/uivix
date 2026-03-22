"use client";

import { useState } from "react";
import { RippleBackground } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { RippleBackground } from "@igorao79/uivix";`;

const colorPresets = [
  { label: "Violet", color: "rgba(139, 92, 246, 0.15)" },
  { label: "Cyan", color: "rgba(34, 211, 238, 0.15)" },
  { label: "Rose", color: "rgba(244, 63, 94, 0.15)" },
  { label: "White", color: "rgba(255, 255, 255, 0.1)" },
];

export default function RippleBackgroundPage() {
  const [colorIdx, setColorIdx] = useState(0);
  const [count, setCount] = useState(6);
  const [duration, setDuration] = useState(4);
  const [key, setKey] = useState(0);
  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Ripple Background</h1>
      <p className="text-zinc-400 mb-8">Expanding concentric ripple circles radiating from the center.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-0 mb-6 overflow-hidden">
        <div className="relative w-full h-[400px] bg-zinc-950 overflow-hidden">
          <RippleBackground key={key} color={colorPresets[colorIdx].color} count={count} duration={duration} className="absolute inset-0 w-full h-full" />
        </div>
        <div className="border-t border-zinc-800 p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Color</label>
            <div className="flex flex-wrap gap-2">
              {colorPresets.map((p, i) => (
                <button key={i} onClick={() => { setColorIdx(i); replay(); }} className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${i === colorIdx ? "border-violet-500 bg-violet-500/20 text-violet-300" : "border-zinc-700 text-zinc-400 hover:border-zinc-600"}`}>{p.label}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <SliderControl label="Rings" value={count} onChange={(v) => { setCount(v); replay(); }} min={3} max={12} />
            <SliderControl label="Duration" value={duration} onChange={(v) => { setDuration(v); replay(); }} min={2} max={10} step={0.5} suffix="s" />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable props={[
        { name: "count", type: "number", default: "6", description: "Number of ripple rings" },
        { name: "color", type: "string", default: '"rgba(139,92,246,0.15)"', description: "Ring color" },
        { name: "duration", type: "number", default: "4", description: "Animation duration per ring (seconds)" },
        { name: "className", type: "string", default: "fixed inset-0 ...", description: "CSS class" },
      ]} />
    </div>
  );
}
