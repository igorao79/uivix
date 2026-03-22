"use client";

import { useState } from "react";
import { GradientText } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { Playground, SliderControl } from "@/components/Playground";

const importCode = `import { GradientText } from "@igorao79/uivix";`;

const presets = [
  { label: "Violet-Pink", value: "from-violet-500 via-pink-500 to-indigo-500" },
  { label: "Ocean", value: "from-emerald-400 via-cyan-400 to-blue-500" },
  { label: "Sunset", value: "from-red-500 via-orange-500 to-yellow-500" },
  { label: "Galaxy", value: "from-pink-500 via-purple-500 to-indigo-500" },
  { label: "Lime", value: "from-lime-400 via-green-500 to-emerald-600" },
];

export default function GradientTextPage() {
  const [text, setText] = useState("Beautiful Gradient");
  const [speed, setSpeed] = useState(3);
  const [colorIdx, setColorIdx] = useState(0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Gradient Text</h1>
      <p className="text-zinc-400 mb-8">
        Text with an animated gradient that flows through, creating dynamic color transitions.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      {/* Playground */}
      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <div className="mb-5 flex items-center justify-center min-h-[80px]">
          <GradientText className="text-4xl font-bold" colors={presets[colorIdx].value} speed={speed}>
            {text}
          </GradientText>
        </div>
        <div className="border-t border-zinc-800 pt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Your text</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full h-9 px-3 text-sm rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Color Preset</label>
            <div className="flex flex-wrap gap-2">
              {presets.map((p, i) => (
                <button key={i} onClick={() => setColorIdx(i)} className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${i === colorIdx ? "border-violet-500 bg-violet-500/20 text-violet-300" : "border-zinc-700 text-zinc-400 hover:border-zinc-600"}`}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <SliderControl label="Speed" value={speed} onChange={setSpeed} min={0.5} max={8} step={0.5} suffix="s" />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Examples</h2>

      <ComponentPreview title="Static" description="Gradient without animation" code={`<GradientText animate={false}>Static</GradientText>`}>
        <GradientText className="text-3xl font-bold" animate={false}>Static Gradient</GradientText>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "children", type: "ReactNode", default: "-", description: "The text content" },
          { name: "animate", type: "boolean", default: "true", description: "Animate the gradient" },
          { name: "speed", type: "number", default: "3", description: "Animation speed in seconds" },
          { name: "colors", type: "string", default: '"from-violet-500 via-pink-500 to-indigo-500"', description: "Tailwind gradient classes" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
