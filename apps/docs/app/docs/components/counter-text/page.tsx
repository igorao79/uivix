"use client";

import { useState } from "react";
import { CounterText } from "uixy";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { CounterText } from "uixy";`;

export default function CounterTextPage() {
  const [target, setTarget] = useState(9999);
  const [duration, setDuration] = useState(2000);
  const [decimals, setDecimals] = useState(0);
  const [prefix, setPrefix] = useState("$");
  const [suffix, setSuffix] = useState("");
  const [key, setKey] = useState(0);

  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Counter</h1>
      <p className="text-zinc-400 mb-8">
        Animated number counter with easing. Supports prefixes, suffixes, and thousands separators.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <div className="mb-5 flex items-center justify-center min-h-[80px]">
          <CounterText key={key} target={target} duration={duration} decimals={decimals} prefix={prefix} suffix={suffix} className="text-5xl font-bold text-white" triggerOnView={false} />
        </div>
        <div className="border-t border-zinc-800 pt-4 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">Target</label>
              <input type="number" value={target} onChange={(e) => { setTarget(Number(e.target.value)); replay(); }} className="w-full h-9 px-3 text-sm rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">Prefix</label>
              <input type="text" value={prefix} onChange={(e) => { setPrefix(e.target.value); replay(); }} className="w-full h-9 px-3 text-sm rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-colors" placeholder='e.g. "$"' />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">Suffix</label>
              <input type="text" value={suffix} onChange={(e) => { setSuffix(e.target.value); replay(); }} className="w-full h-9 px-3 text-sm rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-colors" placeholder='e.g. "+"' />
            </div>
          </div>
          <SliderControl label="Duration" value={duration} onChange={(v) => { setDuration(v); replay(); }} min={500} max={5000} step={250} suffix="ms" />
          <SliderControl label="Decimals" value={decimals} onChange={(v) => { setDecimals(v); replay(); }} min={0} max={4} />
          <button onClick={replay} className="text-xs text-violet-400 hover:text-violet-300 underline">
            Replay Animation
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Stats Dashboard" description="Multiple counters in a row" code={`<CounterText target={9999} prefix="$" />
<CounterText target={99.9} suffix="%" decimals={1} />
<CounterText target={500} suffix="+" />`}>
        <div className="flex gap-12">
          <div className="text-center">
            <CounterText target={9999} prefix="$" className="text-4xl font-bold text-white" triggerOnView={false} />
            <p className="text-xs text-zinc-500 mt-1">Revenue</p>
          </div>
          <div className="text-center">
            <CounterText target={99.9} suffix="%" decimals={1} className="text-4xl font-bold text-emerald-400" triggerOnView={false} />
            <p className="text-xs text-zinc-500 mt-1">Uptime</p>
          </div>
          <div className="text-center">
            <CounterText target={500} suffix="+" className="text-4xl font-bold text-violet-400" triggerOnView={false} />
            <p className="text-xs text-zinc-500 mt-1">Customers</p>
          </div>
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "target", type: "number", default: "-", description: "Target number (required)" },
          { name: "from", type: "number", default: "0", description: "Starting number" },
          { name: "duration", type: "number", default: "2000", description: "Duration in ms" },
          { name: "decimals", type: "number", default: "0", description: "Decimal places" },
          { name: "prefix", type: "string", default: '""', description: 'Prefix (e.g. "$")' },
          { name: "suffix", type: "string", default: '""', description: 'Suffix (e.g. "%")' },
          { name: "separator", type: "string", default: '","', description: "Thousands separator" },
          { name: "triggerOnView", type: "boolean", default: "true", description: "Start when scrolled into view" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
