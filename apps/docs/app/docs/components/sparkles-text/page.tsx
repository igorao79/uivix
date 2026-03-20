"use client";

import { useState } from "react";
import { SparklesText } from "uixy";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { SparklesText } from "uixy";`;

const colorPresets = [
  { label: "Gold", color: "#FFC700" },
  { label: "Purple", color: "#A855F7" },
  { label: "Cyan", color: "#22D3EE" },
  { label: "Rose", color: "#F43F5E" },
  { label: "White", color: "#FFFFFF" },
];

export default function SparklesTextPage() {
  const [text, setText] = useState("Sparkle");
  const [colorIdx, setColorIdx] = useState(0);
  const [count, setCount] = useState(10);
  const [maxSize, setMaxSize] = useState(12);
  const [key, setKey] = useState(0);

  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Sparkles Text</h1>
      <p className="text-zinc-400 mb-8">
        Text with animated sparkle particles floating around the letters.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <div className="mb-5 flex items-center justify-center min-h-[100px]">
          <SparklesText
            key={key}
            sparkleColor={colorPresets[colorIdx].color}
            count={count}
            maxSize={maxSize}
            className="text-5xl font-bold text-white"
          >
            {text}
          </SparklesText>
        </div>
        <div className="border-t border-zinc-800 pt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Your text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => { setText(e.target.value); replay(); }}
              className="w-full h-9 px-3 text-sm rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-colors"
            />
          </div>
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
                  <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: p.color }} />
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <SliderControl label="Count" value={count} onChange={(v) => { setCount(v); replay(); }} min={3} max={25} />
          <SliderControl label="Max Size" value={maxSize} onChange={(v) => { setMaxSize(v); replay(); }} min={6} max={24} suffix="px" />
          <button onClick={replay} className="text-xs text-violet-400 hover:text-violet-300 underline">
            Replay
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "children", type: "string", default: "-", description: "The text content (required)" },
          { name: "sparkleColor", type: "string", default: '"#FFC700"', description: "Color of the sparkle particles" },
          { name: "count", type: "number", default: "10", description: "Number of sparkles" },
          { name: "minSize", type: "number", default: "4", description: "Minimum sparkle size in px" },
          { name: "maxSize", type: "number", default: "12", description: "Maximum sparkle size in px" },
          { name: "as", type: "ElementType", default: '"span"', description: "HTML tag to render" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
