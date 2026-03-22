"use client";

import { useState } from "react";
import { GridBackground } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { GridBackground } from "@igorao79/uivix";`;

const variants = [
  { name: "grid", label: "Grid" },
  { name: "dots", label: "Dots" },
  { name: "cross", label: "Cross" },
] as const;

export default function GridBackgroundPage() {
  const [variantIdx, setVariantIdx] = useState(0);
  const [size, setSize] = useState(40);
  const [followMouse, setFollowMouse] = useState(true);
  const [maskRadius, setMaskRadius] = useState(300);
  const [key, setKey] = useState(0);

  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Grid Background</h1>
      <p className="text-zinc-400 mb-8">
        CSS-based grid, dot, or cross pattern with optional mouse-following radial mask.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-0 mb-6 overflow-hidden">
        <div className="relative w-full h-[400px] bg-zinc-950">
          <GridBackground
            key={key}
            variant={variants[variantIdx].name}
            size={size}
            followMouse={followMouse}
            maskRadius={maskRadius}
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-zinc-600 text-sm">Move your mouse over the area</p>
          </div>
        </div>
        <div className="border-t border-zinc-800 p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Variant</label>
            <div className="flex flex-wrap gap-2">
              {variants.map((v, i) => (
                <button
                  key={v.name}
                  onClick={() => { setVariantIdx(i); replay(); }}
                  className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                    i === variantIdx
                      ? "border-violet-500 bg-violet-500/20 text-violet-300"
                      : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <SliderControl label="Cell Size" value={size} onChange={(v) => { setSize(v); replay(); }} min={15} max={80} suffix="px" />
            <SliderControl label="Mask Radius" value={maskRadius} onChange={(v) => { setMaskRadius(v); replay(); }} min={100} max={600} suffix="px" />
          </div>
          <button
            onClick={() => { setFollowMouse(!followMouse); replay(); }}
            className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
              followMouse
                ? "border-violet-500 bg-violet-500/20 text-violet-300"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
            }`}
          >
            {followMouse ? "Mouse Follow On" : "Mouse Follow Off"}
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "variant", type: '"grid" | "dots" | "cross"', default: '"grid"', description: "Pattern style" },
          { name: "size", type: "number", default: "40", description: "Grid cell size in px" },
          { name: "color", type: "string", default: '"rgba(255,255,255,0.08)"', description: "Line/dot color" },
          { name: "opacity", type: "number", default: "1", description: "Pattern opacity" },
          { name: "followMouse", type: "boolean", default: "false", description: "Enable mouse-following radial mask" },
          { name: "maskRadius", type: "number", default: "300", description: "Radial mask radius in px" },
          { name: "className", type: "string", default: "fixed inset-0 ...", description: "CSS class" },
        ]}
      />
    </div>
  );
}
