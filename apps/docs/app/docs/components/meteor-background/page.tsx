"use client";

import { useState } from "react";
import { MeteorBackground } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { MeteorBackground } from "@igorao79/uivix";`;

const colorPresets = [
  { label: "Silver", color: "#a1a1aa" },
  { label: "Violet", color: "#8b5cf6" },
  { label: "Gold", color: "#eab308" },
  { label: "Cyan", color: "#06b6d4" },
  { label: "White", color: "#ffffff" },
];

export default function MeteorBackgroundPage() {
  const [colorIdx, setColorIdx] = useState(0);
  const [count, setCount] = useState(20);
  const [angle, setAngle] = useState(215);
  const [speed, setSpeed] = useState(1);
  const [tailLength, setTailLength] = useState(80);
  const [key, setKey] = useState(0);
  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Meteor Background</h1>
      <p className="text-zinc-400 mb-8">Shooting stars streaking across the screen with glowing heads and gradient tails.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-0 mb-6 overflow-hidden">
        <div className="relative w-full h-[400px] bg-zinc-950 overflow-hidden">
          <MeteorBackground key={key} color={colorPresets[colorIdx].color} count={count} angle={angle} speed={speed} tailLength={tailLength} className="absolute inset-0 w-full h-full" />
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
            <SliderControl label="Count" value={count} onChange={(v) => { setCount(v); replay(); }} min={5} max={50} />
            <SliderControl label="Angle" value={angle} onChange={(v) => { setAngle(v); replay(); }} min={180} max={270} suffix="deg" />
            <SliderControl label="Tail Length" value={tailLength} onChange={(v) => { setTailLength(v); replay(); }} min={20} max={200} suffix="px" />
            <SliderControl label="Speed" value={speed} onChange={(v) => { setSpeed(v); replay(); }} min={0.3} max={4} step={0.1} suffix="x" />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable props={[
        { name: "count", type: "number", default: "20", description: "Number of meteors" },
        { name: "angle", type: "number", default: "215", description: "Meteor angle in degrees" },
        { name: "color", type: "string", default: '"#a1a1aa"', description: "Meteor color" },
        { name: "tailLength", type: "number", default: "80", description: "Tail length in px" },
        { name: "speed", type: "number", default: "1", description: "Speed multiplier" },
        { name: "className", type: "string", default: "fixed inset-0 ...", description: "CSS class" },
      ]} />
    </div>
  );
}
