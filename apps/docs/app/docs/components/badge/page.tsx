"use client";

import { useState } from "react";
import { Badge } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Badge } from "@igorao79/uivix";`;

const variants = ["default", "secondary", "outline", "success", "warning", "destructive", "glow", "gradient", "glass", "neon", "shimmer", "soft", "info", "premium", "new", "beta"] as const;
const sizes = ["sm", "md", "lg"] as const;

export default function BadgePage() {
  const [variant, setVariant] = useState<string>("default");
  const [size, setSize] = useState<string>("md");
  const [dot, setDot] = useState(false);
  const [pill, setPill] = useState(false);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Badge</h1>
      <p className="text-zinc-400 mb-8">
        A small status descriptor with 12 color variants, 3 sizes, optional pulsing dot indicator, and pill shape.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <div className="mb-5 flex items-center justify-center min-h-[80px]">
          <Badge variant={variant as any} size={size as any} dot={dot} pill={pill}>
            Badge Label
          </Badge>
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
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-2">Dot</label>
            <button
              onClick={() => setDot(!dot)}
              className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                dot
                  ? "border-violet-500 bg-violet-500/20 text-violet-300"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
              }`}
            >
              {dot ? "On" : "Off"}
            </button>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-2">Pill</label>
            <button
              onClick={() => setPill(!pill)}
              className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                pill
                  ? "border-violet-500 bg-violet-500/20 text-violet-300"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
              }`}
            >
              {pill ? "On" : "Off"}
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">All Variants</h2>
      <div className="flex flex-wrap gap-3 mb-8">
        {variants.map((v) => (
          <Badge key={v} variant={v}>
            {v}
          </Badge>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">With Dot</h2>
      <div className="flex flex-wrap gap-3 mb-8">
        <Badge variant="success" dot>Active</Badge>
        <Badge variant="warning" dot>Pending</Badge>
        <Badge variant="destructive" dot>Error</Badge>
        <Badge variant="default" dot>Live</Badge>
      </div>

      <h2 className="text-xl font-semibold mb-4">Usage</h2>
      <CodeBlock code={`<Badge variant="success" dot>Active</Badge>
<Badge variant="warning" size="lg">Pending</Badge>
<Badge variant="glow">Featured</Badge>
<Badge variant="gradient" pill>Premium</Badge>
<Badge variant="neon">Neon</Badge>
<Badge variant="shimmer">Shimmer</Badge>`} />

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "variant", type: '"default" | "secondary" | "outline" | "success" | "warning" | "destructive" | "glow" | "gradient" | "glass" | "neon" | "shimmer" | "soft"', default: '"default"', description: "Color variant of the badge" },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Size of the badge" },
          { name: "pill", type: "boolean", default: "false", description: "Use fully rounded pill shape" },
          { name: "dot", type: "boolean", default: "false", description: "Show a pulsing dot indicator" },
          { name: "dotColor", type: "string", default: "-", description: "Custom CSS color for the dot" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
