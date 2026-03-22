"use client";

import { useState } from "react";
import { GlitchText } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { GlitchText } from "@igorao79/uivix";`;

export default function GlitchTextPage() {
  const [text, setText] = useState("GLITCH");
  const [speed, setSpeed] = useState(3);
  const [intensity, setIntensity] = useState(5);
  const [key, setKey] = useState(0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Glitch Text</h1>
      <p className="text-zinc-400 mb-8">
        A cyberpunk-inspired glitch effect with RGB color separation and digital distortion.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <div className="mb-5 flex items-center justify-center min-h-[80px]">
          <GlitchText key={key} className="text-5xl font-black text-white" speed={speed} intensity={intensity}>
            {text}
          </GlitchText>
        </div>
        <div className="border-t border-zinc-800 pt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Your text</label>
            <input type="text" value={text} onChange={(e) => { setText(e.target.value); setKey((k) => k + 1); }} className="w-full h-9 px-3 text-sm rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-colors" />
          </div>
          <SliderControl label="Speed" value={speed} onChange={(v) => { setSpeed(v); setKey((k) => k + 1); }} min={0.5} max={6} step={0.5} suffix="s" />
          <SliderControl label="Intensity" value={intensity} onChange={(v) => { setIntensity(v); setKey((k) => k + 1); }} min={1} max={10} suffix="px" />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "children", type: "string", default: "-", description: "The text content (required)" },
          { name: "speed", type: "number", default: "3", description: "Animation speed in seconds" },
          { name: "intensity", type: "number", default: "5", description: "Glitch offset intensity (1-10)" },
          { name: "as", type: "ElementType", default: '"span"', description: "HTML tag to render" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
