"use client";

import { useState } from "react";
import { StarfieldBackground } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { StarfieldBackground } from "@igorao79/uivix";`;

const colorPresets = [
  { label: "White", color: [200, 200, 255] as [number, number, number] },
  { label: "Warm", color: [255, 200, 150] as [number, number, number] },
  { label: "Cyan", color: [100, 220, 255] as [number, number, number] },
  { label: "Purple", color: [200, 150, 255] as [number, number, number] },
];

export default function StarfieldBackgroundPage() {
  const [colorIdx, setColorIdx] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [count, setCount] = useState(300);
  const [warp, setWarp] = useState(false);
  const [key, setKey] = useState(0);

  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Starfield Background</h1>
      <p className="text-zinc-400 mb-8">
        3D perspective starfield flying through space, with optional warp speed streaks.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-0 mb-6 overflow-hidden">
        <div className="relative w-full h-[400px] bg-black overflow-hidden">
          <StarfieldBackground
            key={key}
            count={count}
            speed={speed}
            color={colorPresets[colorIdx].color}
            warp={warp}
            className="absolute inset-0 w-full h-full"
          />
        </div>
        <div className="border-t border-zinc-800 p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Color</label>
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
            <SliderControl label="Speed" value={speed} onChange={(v) => { setSpeed(v); replay(); }} min={0.2} max={5} step={0.1} suffix="x" />
            <SliderControl label="Stars" value={count} onChange={(v) => { setCount(v); replay(); }} min={50} max={800} />
          </div>
          <button
            onClick={() => { setWarp(!warp); replay(); }}
            className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
              warp
                ? "border-violet-500 bg-violet-500/20 text-violet-300"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
            }`}
          >
            {warp ? "Warp On" : "Warp Off"}
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "count", type: "number", default: "300", description: "Number of stars" },
          { name: "speed", type: "number", default: "1", description: "Speed multiplier" },
          { name: "color", type: "[r, g, b]", default: "[200, 200, 255]", description: "Star color as RGB" },
          { name: "maxSize", type: "number", default: "2.5", description: "Max star dot size" },
          { name: "warp", type: "boolean", default: "false", description: "Enable warp speed streak effect" },
          { name: "className", type: "string", default: "fixed inset-0 ...", description: "CSS class" },
        ]}
      />
    </div>
  );
}
