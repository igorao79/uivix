"use client";

import { useState } from "react";
import { WaveBackground } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { WaveBackground } from "@igorao79/uivix";`;

const colorPresets = [
  { label: "Violet", colors: ["rgba(139,92,246,0.15)", "rgba(59,130,246,0.12)", "rgba(6,182,212,0.1)"] },
  { label: "Ocean", colors: ["rgba(6,182,212,0.18)", "rgba(59,130,246,0.14)", "rgba(99,102,241,0.1)"] },
  { label: "Sunset", colors: ["rgba(244,63,94,0.15)", "rgba(249,115,22,0.12)", "rgba(234,179,8,0.1)"] },
  { label: "Forest", colors: ["rgba(34,197,94,0.15)", "rgba(20,184,166,0.12)", "rgba(6,182,212,0.1)"] },
];

export default function WaveBackgroundPage() {
  const [colorIdx, setColorIdx] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [amplitude, setAmplitude] = useState(40);
  const [layers, setLayers] = useState(3);
  const [key, setKey] = useState(0);

  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Wave Background</h1>
      <p className="text-zinc-400 mb-8">
        Layered sine wave animation with smooth organic motion.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-0 mb-6 overflow-hidden">
        <div className="relative w-full h-[400px] bg-zinc-950 overflow-hidden">
          <WaveBackground
            key={key}
            colors={colorPresets[colorIdx].colors}
            speed={speed}
            amplitude={amplitude}
            layers={layers}
            className="absolute inset-0 w-full h-full"
          />
        </div>
        <div className="border-t border-zinc-800 p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Color Theme</label>
            <div className="flex flex-wrap gap-2">
              {colorPresets.map((p, i) => (
                <button
                  key={i}
                  onClick={() => { setColorIdx(i); replay(); }}
                  className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                    i === colorIdx
                      ? "border-violet-500 bg-violet-500/20 text-violet-300"
                      : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <SliderControl label="Speed" value={speed} onChange={(v) => { setSpeed(v); replay(); }} min={0.2} max={4} step={0.1} suffix="x" />
            <SliderControl label="Amplitude" value={amplitude} onChange={(v) => { setAmplitude(v); replay(); }} min={10} max={100} suffix="px" />
            <SliderControl label="Layers" value={layers} onChange={(v) => { setLayers(v); replay(); }} min={1} max={6} />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "colors", type: "string[]", default: '["rgba(139,92,246,0.15)", ...]', description: "Wave layer colors" },
          { name: "layers", type: "number", default: "3", description: "Number of wave layers" },
          { name: "speed", type: "number", default: "1", description: "Animation speed multiplier" },
          { name: "amplitude", type: "number", default: "40", description: "Wave height in px" },
          { name: "frequency", type: "number", default: "0.008", description: "Wave frequency" },
          { name: "className", type: "string", default: "fixed inset-0 ...", description: "CSS class" },
        ]}
      />
    </div>
  );
}
