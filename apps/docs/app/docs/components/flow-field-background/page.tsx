"use client";

import { useState } from "react";
import { FlowFieldBackground } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { FlowFieldBackground } from "@igorao79/uivix";`;

const variants = [
  { name: "wind", label: "Wind", description: "Smooth wind-like flowing particles" },
  { name: "magnetic", label: "Magnetic", description: "Two magnetic pole field lines" },
  { name: "curl", label: "Curl", description: "Turbulent curl noise flow" },
  { name: "spiral", label: "Spiral", description: "Particles spiraling around center" },
] as const;

const colorPresets = [
  { label: "Violet", colors: ["#8b5cf6", "#6366f1", "#3b82f6", "#06b6d4", "#14b8a6"] },
  { label: "Fire", colors: ["#dc2626", "#f97316", "#eab308", "#fbbf24"] },
  { label: "Aurora", colors: ["#22c55e", "#14b8a6", "#06b6d4", "#8b5cf6"] },
  { label: "Mono", colors: ["#71717a", "#a1a1aa", "#d4d4d8", "#e4e4e7"] },
];

export default function FlowFieldBackgroundPage() {
  const [variantIdx, setVariantIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [particleCount, setParticleCount] = useState(800);
  const [key, setKey] = useState(0);
  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Flow Field Background</h1>
      <p className="text-zinc-400 mb-8">Particles following vector fields — wind streams, magnetic poles, curl noise, and spirals.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-0 mb-6 overflow-hidden">
        <div className="relative w-full h-[400px] bg-[#09090b] overflow-hidden">
          <FlowFieldBackground key={key} variant={variants[variantIdx].name} colors={colorPresets[colorIdx].colors} speed={speed} particleCount={particleCount} className="absolute inset-0 w-full h-full" />
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
            <SliderControl label="Speed" value={speed} onChange={(v) => { setSpeed(v); replay(); }} min={0.2} max={3} step={0.1} suffix="x" />
            <SliderControl label="Particles" value={particleCount} onChange={(v) => { setParticleCount(v); replay(); }} min={200} max={2000} step={100} />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable props={[
        { name: "variant", type: '"wind" | "magnetic" | "curl" | "spiral"', default: '"wind"', description: "Flow field pattern" },
        { name: "colors", type: "string[]", default: '["#8b5cf6", ...]', description: "Particle colors" },
        { name: "speed", type: "number", default: "1", description: "Animation speed" },
        { name: "particleCount", type: "number", default: "800", description: "Number of particles" },
        { name: "trailLength", type: "number", default: "0.92", description: "Trail fade (0-1, higher = longer)" },
        { name: "opacity", type: "number", default: "0.6", description: "Particle opacity" },
        { name: "className", type: "string", default: "fixed inset-0 ...", description: "CSS class" },
      ]} />
    </div>
  );
}
