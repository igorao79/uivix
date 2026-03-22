"use client";

import { useState } from "react";
import { HighlightText } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { HighlightText } from "@igorao79/uivix";`;

const variants = [
  { name: "marker", label: "Marker" },
  { name: "underline", label: "Underline" },
  { name: "box", label: "Box" },
  { name: "strikethrough", label: "Strikethrough" },
  { name: "gradient", label: "Gradient" },
  { name: "glow", label: "Glow" },
  { name: "bracket", label: "Bracket" },
] as const;

const colorPresets = [
  { label: "Violet", color: "rgba(139, 92, 246, 0.4)" },
  { label: "Yellow", color: "rgba(250, 204, 21, 0.4)" },
  { label: "Green", color: "rgba(34, 197, 94, 0.4)" },
  { label: "Rose", color: "rgba(244, 63, 94, 0.4)" },
  { label: "Cyan", color: "rgba(34, 211, 238, 0.4)" },
];

export default function HighlightTextPage() {
  const [text, setText] = useState("important concept");
  const [variantIdx, setVariantIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const [duration, setDuration] = useState(800);
  const [key, setKey] = useState(0);

  const replay = () => setKey((k) => k + 1);
  const v = variants[variantIdx].name;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Highlight Text</h1>
      <p className="text-zinc-400 mb-8">
        7 animated highlight styles — marker, underline, box, strikethrough, gradient, glow, and bracket.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <div className="mb-5 flex items-center justify-center min-h-[80px]">
          <p className="text-2xl text-zinc-100">
            This is an{" "}
            <HighlightText
              key={key}
              variant={v}
              color={colorPresets[colorIdx].color}
              colorTo={v === "gradient" ? "rgba(59,130,246,0.4)" : undefined}
              duration={duration}
              triggerOnView={false}
              className="text-2xl font-semibold text-white"
            >
              {text}
            </HighlightText>{" "}
            in UI design.
          </p>
        </div>
        <div className="border-t border-zinc-800 pt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Highlighted text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => { setText(e.target.value); replay(); }}
              className="w-full h-9 px-3 text-sm rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Variant</label>
            <div className="flex flex-wrap gap-2">
              {variants.map((vr, i) => (
                <button
                  key={vr.name}
                  onClick={() => { setVariantIdx(i); replay(); }}
                  className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                    i === variantIdx
                      ? "border-violet-500 bg-violet-500/20 text-violet-300"
                      : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {vr.label}
                </button>
              ))}
            </div>
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
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <SliderControl label="Duration" value={duration} onChange={(v) => { setDuration(v); replay(); }} min={200} max={2000} step={100} suffix="ms" />
          <button onClick={replay} className="text-xs text-violet-400 hover:text-violet-300 underline">
            Replay Animation
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">All Variants</h2>
      <div className="grid gap-4 mb-8">
        {variants.map((vr) => (
          <div key={vr.name} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5 flex items-center gap-4">
            <span className="text-xs text-zinc-500 w-28 shrink-0 font-mono">{vr.name}</span>
            <p className="text-lg text-zinc-200">
              This uses the{" "}
              <HighlightText
                variant={vr.name}
                color={colorPresets[0].color}
                colorTo={vr.name === "gradient" ? "rgba(59,130,246,0.4)" : undefined}
                duration={800}
                triggerOnView={true}
                className="font-semibold text-white"
              >
                {`${vr.label.toLowerCase()} highlight`}
              </HighlightText>{" "}
              variant
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "children", type: "string", default: "-", description: "The text content (required)" },
          { name: "variant", type: '"marker" | "underline" | "box" | "strikethrough" | "gradient" | "glow" | "bracket"', default: '"marker"', description: "Highlight style" },
          { name: "color", type: "string", default: '"rgba(139,92,246,0.35)"', description: "Primary highlight color" },
          { name: "colorTo", type: "string", default: "-", description: "Second color for gradient variant" },
          { name: "duration", type: "number", default: "800", description: "Animation duration in ms" },
          { name: "delay", type: "number", default: "0", description: "Delay before animation in ms" },
          { name: "triggerOnView", type: "boolean", default: "true", description: "Trigger when scrolled into view" },
          { name: "as", type: "ElementType", default: '"span"', description: "HTML tag to render" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
