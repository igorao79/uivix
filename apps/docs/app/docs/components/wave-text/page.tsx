"use client";

import { useState } from "react";
import { WaveText } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { WaveText } from "@igorao79/uivix";`;

export default function WaveTextPage() {
  const [text, setText] = useState("Hello World");
  const [height, setHeight] = useState(12);
  const [duration, setDuration] = useState(1);
  const [delay, setDelay] = useState(80);
  const [key, setKey] = useState(0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Wave Text</h1>
      <p className="text-zinc-400 mb-8">
        Letters animate up and down in a wave pattern with staggered delays.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <div className="mb-5 flex items-center justify-center min-h-[80px]">
          <WaveText key={key} className="text-4xl font-bold text-white" height={height} duration={duration} delay={delay}>
            {text}
          </WaveText>
        </div>
        <div className="border-t border-zinc-800 pt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Your text</label>
            <input type="text" value={text} onChange={(e) => { setText(e.target.value); setKey((k) => k + 1); }} className="w-full h-9 px-3 text-sm rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-colors" />
          </div>
          <SliderControl label="Height" value={height} onChange={(v) => { setHeight(v); setKey((k) => k + 1); }} min={4} max={30} suffix="px" />
          <SliderControl label="Duration" value={duration} onChange={(v) => { setDuration(v); setKey((k) => k + 1); }} min={0.3} max={3} step={0.1} suffix="s" />
          <SliderControl label="Letter Delay" value={delay} onChange={(v) => { setDelay(v); setKey((k) => k + 1); }} min={20} max={200} suffix="ms" />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "children", type: "string", default: "-", description: "The text content (required)" },
          { name: "delay", type: "number", default: "80", description: "Delay between each letter in ms" },
          { name: "duration", type: "number", default: "1", description: "Animation duration in seconds" },
          { name: "height", type: "number", default: "12", description: "Wave height in px" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
