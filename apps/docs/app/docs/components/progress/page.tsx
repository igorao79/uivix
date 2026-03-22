"use client";

import { useState, useEffect } from "react";
import { Progress } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { Progress } from "@igorao79/uivix";`;

const variants = ["default", "gradient", "striped", "glow"] as const;
const sizes = ["sm", "md", "lg"] as const;

export default function ProgressPage() {
  const [variant, setVariant] = useState<string>("default");
  const [size, setSize] = useState<string>("md");
  const [value, setValue] = useState(65);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!animated) return;
    const interval = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);
    return () => clearInterval(interval);
  }, [animated]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Progress</h1>
      <p className="text-zinc-400 mb-8">
        A progress bar with 4 visual styles, 3 sizes, and optional percentage label.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <div className="mb-5 flex items-center justify-center min-h-[60px] w-full px-4">
          <Progress
            variant={variant as any}
            size={size as any}
            value={value}
            showValue
            className="w-full"
          />
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
            <label className="block text-xs font-medium text-zinc-500 mb-2">Size</label>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                    s === size
                      ? "border-violet-500 bg-violet-500/20 text-violet-300"
                      : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <SliderControl label="Value" value={value} onChange={(v) => { setAnimated(false); setValue(v); }} min={0} max={100} suffix="%" />
          <div>
            <button
              onClick={() => setAnimated(!animated)}
              className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                animated
                  ? "border-violet-500 bg-violet-500/20 text-violet-300"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
              }`}
            >
              {animated ? "Stop Animation" : "Animate"}
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">All Variants</h2>
      <div className="space-y-4 mb-8">
        {variants.map((v) => (
          <div key={v}>
            <p className="text-xs text-zinc-500 mb-1.5">{v}</p>
            <Progress variant={v} value={65} showValue size="md" />
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Usage</h2>
      <CodeBlock code={`<Progress value={65} variant="gradient" showValue />
<Progress value={40} variant="striped" size="lg" />
<Progress value={80} variant="glow" />`} />

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "value", type: "number", default: "0", description: "Progress value from 0 to 100" },
          { name: "variant", type: '"default" | "gradient" | "striped" | "glow"', default: '"default"', description: "Visual style of the progress bar" },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Height of the progress bar" },
          { name: "showValue", type: "boolean", default: "false", description: "Show percentage label" },
          { name: "color", type: "string", default: '"#8b5cf6"', description: "Custom bar color (not used with gradient variant)" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
