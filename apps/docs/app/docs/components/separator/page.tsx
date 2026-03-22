"use client";

import { useState } from "react";
import { Separator } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Separator } from "@igorao79/uivix";`;

const variants = ["default", "dashed", "dotted", "gradient"] as const;

export default function SeparatorPage() {
  const [variant, setVariant] = useState<string>("default");
  const [showLabel, setShowLabel] = useState(true);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Separator</h1>
      <p className="text-zinc-400 mb-8">
        A visual divider with 4 style variants and optional centered label text.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <div className="mb-5 flex items-center justify-center min-h-[80px] w-full px-4">
          <div className="w-full">
            <p className="text-sm text-zinc-300 mb-4">Content above</p>
            <Separator
              variant={variant as any}
              label={showLabel ? "Section" : undefined}
            />
            <p className="text-sm text-zinc-300 mt-4">Content below</p>
          </div>
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
            <label className="block text-xs font-medium text-zinc-500 mb-2">Label</label>
            <button
              onClick={() => setShowLabel(!showLabel)}
              className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                showLabel
                  ? "border-violet-500 bg-violet-500/20 text-violet-300"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
              }`}
            >
              {showLabel ? "With Label" : "No Label"}
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">All Variants</h2>
      <div className="space-y-6 mb-8">
        {variants.map((v) => (
          <div key={v}>
            <p className="text-xs text-zinc-500 mb-2">{v}</p>
            <Separator variant={v} label={v !== "gradient" ? v : undefined} />
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Usage</h2>
      <CodeBlock code={`<Separator variant="dashed" label="or" />
<Separator variant="gradient" />
<Separator variant="dotted" />`} />

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direction of the separator" },
          { name: "variant", type: '"default" | "dashed" | "dotted" | "gradient"', default: '"default"', description: "Visual style of the line" },
          { name: "label", type: "string", default: "-", description: "Centered label text (horizontal only)" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
