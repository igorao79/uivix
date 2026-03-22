"use client";

import { useState } from "react";
import { Toggle } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Toggle } from "@igorao79/uivix";`;

const variants = ["default", "ios", "material", "outline", "glow", "pill", "slim", "labeled"] as const;
const sizes = ["sm", "md", "lg"] as const;

export default function TogglePage() {
  const [variant, setVariant] = useState<string>("default");
  const [size, setSize] = useState<string>("md");
  const [checked, setChecked] = useState(true);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Toggle</h1>
      <p className="text-zinc-400 mb-8">
        A smooth toggle switch with 6 visual variants, 3 sizes, optional label, and customizable color.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <div className="mb-5 flex items-center justify-center min-h-[80px]">
          <Toggle
            variant={variant as any}
            size={size as any}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            label={checked ? "Enabled" : "Disabled"}
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
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-2">State</label>
            <button
              onClick={() => setChecked(!checked)}
              className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                checked
                  ? "border-violet-500 bg-violet-500/20 text-violet-300"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
              }`}
            >
              {checked ? "Checked" : "Unchecked"}
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">All Variants</h2>
      <div className="flex flex-col gap-4 mb-8">
        {variants.map((v) => (
          <ToggleDemo key={v} variant={v} label={`Variant: ${v}`} />
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">All Sizes</h2>
      <div className="flex flex-col gap-4 mb-8">
        {sizes.map((s) => (
          <ToggleDemo key={s} size={s} label={`Size: ${s}`} />
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Usage</h2>
      <CodeBlock code={`const [enabled, setEnabled] = useState(false);

<Toggle
  variant="ios"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
  label="Dark mode"
  size="md"
/>`} />

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "variant", type: '"default" | "ios" | "material" | "outline" | "glow" | "pill"', default: '"default"', description: "Visual style variant of the toggle" },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Size of the toggle switch" },
          { name: "color", type: "string", default: '"#8b5cf6"', description: "Active background color" },
          { name: "label", type: "string", default: "-", description: "Label text displayed beside the toggle" },
          { name: "checked", type: "boolean", default: "false", description: "Whether the toggle is on" },
          { name: "disabled", type: "boolean", default: "false", description: "Whether the toggle is disabled" },
          { name: "onChange", type: "(e: ChangeEvent) => void", default: "-", description: "Called when the toggle value changes" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}

function ToggleDemo({ variant, size, label }: { variant?: string; size?: string; label: string }) {
  const [on, setOn] = useState(false);
  return (
    <Toggle
      variant={variant as any}
      size={size as any}
      checked={on}
      onChange={(e) => setOn(e.target.checked)}
      label={label}
    />
  );
}
