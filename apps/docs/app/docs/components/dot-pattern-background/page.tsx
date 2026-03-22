"use client";

import { useState } from "react";
import { DotPatternBackground } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { DotPatternBackground } from "@igorao79/uivix";`;

export default function DotPatternBackgroundPage() {
  const [spacing, setSpacing] = useState(24);
  const [radius, setRadius] = useState(1.2);
  const [glow, setGlow] = useState(false);
  const [mouseReactive, setMouseReactive] = useState(true);
  const [key, setKey] = useState(0);
  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dot Pattern Background</h1>
      <p className="text-zinc-400 mb-8">Grid of dots that react to your cursor and optionally pulse with a glow effect.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-0 mb-6 overflow-hidden">
        <div className="relative w-full h-[400px] bg-zinc-950 overflow-hidden">
          <DotPatternBackground key={key} spacing={spacing} radius={radius} glow={glow} mouseReactive={mouseReactive} className="absolute inset-0 w-full h-full" />
        </div>
        <div className="border-t border-zinc-800 p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Features</label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Mouse Reactive", active: mouseReactive, toggle: () => { setMouseReactive(!mouseReactive); replay(); } },
                { label: "Glow Pulse", active: glow, toggle: () => { setGlow(!glow); replay(); } },
              ].map((f) => (
                <button key={f.label} onClick={f.toggle} className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${f.active ? "border-violet-500 bg-violet-500/20 text-violet-300" : "border-zinc-700 text-zinc-400 hover:border-zinc-600"}`}>{f.label}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <SliderControl label="Spacing" value={spacing} onChange={(v) => { setSpacing(v); replay(); }} min={12} max={48} suffix="px" />
            <SliderControl label="Dot Radius" value={radius} onChange={(v) => { setRadius(v); replay(); }} min={0.5} max={4} step={0.1} suffix="px" />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable props={[
        { name: "spacing", type: "number", default: "24", description: "Space between dots" },
        { name: "radius", type: "number", default: "1.2", description: "Dot radius" },
        { name: "color", type: "string", default: '"rgba(161,161,170,0.25)"', description: "Dot color" },
        { name: "glow", type: "boolean", default: "false", description: "Enable pulsing glow" },
        { name: "mouseReactive", type: "boolean", default: "true", description: "Dots grow near cursor" },
        { name: "mouseRadius", type: "number", default: "120", description: "Cursor influence radius" },
        { name: "className", type: "string", default: "fixed inset-0 ...", description: "CSS class" },
      ]} />
    </div>
  );
}
