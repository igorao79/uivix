"use client";

import { useState } from "react";
import { ShimmerText } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { ShimmerText } from "@igorao79/uivix";`;

const colorPresets = [
  { label: "Silver", base: "rgba(255,255,255,0.4)", shimmer: "rgba(255,255,255,0.9)" },
  { label: "Gold", base: "rgba(180,140,60,0.5)", shimmer: "rgba(255,215,0,1)" },
  { label: "Rose", base: "rgba(244,63,94,0.4)", shimmer: "rgba(251,113,133,1)" },
  { label: "Cyan", base: "rgba(34,211,238,0.4)", shimmer: "rgba(103,232,249,1)" },
];

export default function ShimmerTextPage() {
  const [text, setText] = useState("Premium Quality");
  const [speed, setSpeed] = useState(2);
  const [preset, setPreset] = useState(0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Shimmer Text</h1>
      <p className="text-zinc-400 mb-8">
        A lustrous shimmer effect that sweeps across text, creating a metallic or glossy appearance.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <div className="mb-5 flex items-center justify-center min-h-[80px]">
          <ShimmerText className="text-4xl font-bold" speed={speed} baseColor={colorPresets[preset].base} shimmerColor={colorPresets[preset].shimmer}>
            {text}
          </ShimmerText>
        </div>
        <div className="border-t border-zinc-800 pt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Your text</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full h-9 px-3 text-sm rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Color</label>
            <div className="flex flex-wrap gap-2">
              {colorPresets.map((p, i) => (
                <button key={i} onClick={() => setPreset(i)} className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${i === preset ? "border-violet-500 bg-violet-500/20 text-violet-300" : "border-zinc-700 text-zinc-400 hover:border-zinc-600"}`}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <SliderControl label="Speed" value={speed} onChange={setSpeed} min={0.5} max={5} step={0.5} suffix="s" />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "children", type: "ReactNode", default: "-", description: "The text content" },
          { name: "speed", type: "number", default: "2", description: "Animation speed in seconds" },
          { name: "shimmerColor", type: "string", default: '"rgba(255,255,255,0.8)"', description: "Color of the shimmer highlight" },
          { name: "baseColor", type: "string", default: '"rgba(255,255,255,0.4)"', description: "Base text color" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
