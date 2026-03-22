"use client";

import { useState } from "react";
import { Tooltip, Button } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { Tooltip } from "@igorao79/uivix";`;

const sides = ["top", "bottom", "left", "right"] as const;
const variants = ["default", "dark", "light", "gradient", "glass", "outlined", "neon", "success", "warning", "error"] as const;

export default function TooltipPage() {
  const [side, setSide] = useState<string>("top");
  const [variant, setVariant] = useState<string>("default");
  const [arrow, setArrow] = useState(true);
  const [delay, setDelay] = useState(200);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Tooltip</h1>
      <p className="text-zinc-400 mb-8">
        A lightweight tooltip with 6 visual variants, optional arrow, configurable placement and delay.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <div className="mb-5 flex items-center justify-center min-h-[120px]">
          <Tooltip content="Hello from tooltip!" side={side as any} variant={variant as any} arrow={arrow} delay={delay}>
            <Button variant="outline">Hover me</Button>
          </Tooltip>
        </div>
        <div className="border-t border-zinc-800 pt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-2">Variant</label>
            <div className="flex flex-wrap gap-2">
              {variants.map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                    v === variant
                      ? "border-violet-500 bg-violet-500/20 text-violet-300"
                      : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-2">Side</label>
            <div className="flex flex-wrap gap-2">
              {sides.map((s) => (
                <button
                  key={s}
                  onClick={() => setSide(s)}
                  className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                    s === side
                      ? "border-violet-500 bg-violet-500/20 text-violet-300"
                      : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-2">Arrow</label>
            <button
              onClick={() => setArrow(!arrow)}
              className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                arrow
                  ? "border-violet-500 bg-violet-500/20 text-violet-300"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
              }`}
            >
              {arrow ? "On" : "Off"}
            </button>
          </div>
          <SliderControl label="Delay" value={delay} onChange={setDelay} min={0} max={1000} step={50} suffix="ms" />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">All Variants</h2>
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
        {variants.map((v) => (
          <Tooltip key={v} content={`${v} variant`} variant={v} side="top">
            <Button variant="secondary" size="sm">{v}</Button>
          </Tooltip>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">All Sides</h2>
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
        {sides.map((s) => (
          <Tooltip key={s} content={`Tooltip on ${s}`} side={s}>
            <Button variant="secondary" size="sm">{s}</Button>
          </Tooltip>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Usage</h2>
      <CodeBlock code={`<Tooltip content="Save changes" side="bottom" variant="gradient" arrow>
  <Button>Save</Button>
</Tooltip>`} />

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "content", type: "ReactNode", default: "-", description: "Tooltip content to display" },
          { name: "variant", type: '"default" | "dark" | "light" | "gradient" | "glass" | "outlined"', default: '"default"', description: "Visual style variant of the tooltip" },
          { name: "side", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "Side of the trigger to show the tooltip" },
          { name: "arrow", type: "boolean", default: "true", description: "Whether to show an arrow pointing to the trigger" },
          { name: "delay", type: "number", default: "200", description: "Delay in ms before showing the tooltip" },
          { name: "children", type: "ReactNode", default: "-", description: "Trigger element" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the tooltip" },
        ]}
      />
    </div>
  );
}
