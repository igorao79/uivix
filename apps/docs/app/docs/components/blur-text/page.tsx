"use client";

import { useState } from "react";
import { BlurText } from "uixy";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { BlurText } from "uixy";`;

export default function BlurTextPage() {
  const [text, setText] = useState("Build something amazing today");
  const [mode, setMode] = useState<"word" | "letter">("word");
  const [delay, setDelay] = useState(100);
  const [duration, setDuration] = useState(500);
  const [key, setKey] = useState(0);

  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Blur Text</h1>
      <p className="text-zinc-400 mb-8">
        Text that reveals from a blurred state, with staggered animation per word or letter.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <div className="mb-5 flex items-center justify-center min-h-[80px]">
          <BlurText key={key} className="text-3xl font-bold text-white" mode={mode} delay={delay} duration={duration} triggerOnView={false}>
            {text}
          </BlurText>
        </div>
        <div className="border-t border-zinc-800 pt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Your text</label>
            <input type="text" value={text} onChange={(e) => { setText(e.target.value); replay(); }} className="w-full h-9 px-3 text-sm rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Mode</label>
            <div className="flex gap-2">
              {(["word", "letter"] as const).map((m) => (
                <button key={m} onClick={() => { setMode(m); replay(); }} className={`px-3 py-1.5 text-xs rounded-md border transition-colors capitalize ${m === mode ? "border-violet-500 bg-violet-500/20 text-violet-300" : "border-zinc-700 text-zinc-400 hover:border-zinc-600"}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>
          <SliderControl label="Delay" value={delay} onChange={(v) => { setDelay(v); replay(); }} min={30} max={300} suffix="ms" />
          <SliderControl label="Duration" value={duration} onChange={(v) => { setDuration(v); replay(); }} min={200} max={1500} step={50} suffix="ms" />
          <button onClick={replay} className="text-xs text-violet-400 hover:text-violet-300 underline">
            Replay Animation
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "children", type: "string", default: "-", description: "The text content (required)" },
          { name: "mode", type: '"word" | "letter"', default: '"word"', description: "Animate per word or per letter" },
          { name: "delay", type: "number", default: "100", description: "Delay between each unit in ms" },
          { name: "duration", type: "number", default: "500", description: "Animation duration in ms" },
          { name: "triggerOnView", type: "boolean", default: "true", description: "Trigger when scrolled into view" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
