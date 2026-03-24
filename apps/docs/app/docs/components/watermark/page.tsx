"use client";

import { useState } from "react";
import { Watermark } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Watermark } from "@igorao79/uivix";`;

const positions = ["bottom-right", "bottom-left", "top-right", "top-left"] as const;
const sizes = ["sm", "md", "lg"] as const;

export default function WatermarkPage() {
  const [position, setPosition] = useState<string>("bottom-right");
  const [size, setSize] = useState<string>("sm");
  const [showLogo, setShowLogo] = useState(true);
  const [text, setText] = useState("Built with UIVIX");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Watermark</h1>
      <p className="text-zinc-400 mb-8">
        A subtle, semi-transparent branding badge that links back to UIVIX. Add it to your project to support the library.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-0 mb-6 overflow-hidden">
        <div className="relative w-full h-[300px] bg-zinc-950 flex items-center justify-center">
          <p className="text-zinc-600 text-sm">Your app content here</p>
          <Watermark
            position={position as any}
            size={size as any}
            showLogo={showLogo}
            text={text}
            className="!fixed !relative"
            href="https://uivix-docs.vercel.app"
          />
          {/* Render in all corners for preview */}
          <div className="absolute" style={{
            [position.includes("bottom") ? "bottom" : "top"]: 16,
            [position.includes("right") ? "right" : "left"]: 16,
          }}>
            <Watermark
              position={undefined as any}
              size={size as any}
              showLogo={showLogo}
              text={text}
              href="https://uivix-docs.vercel.app"
              className="!fixed !relative !static"
            />
          </div>
        </div>
        <div className="border-t border-zinc-800 p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-9 px-3 text-sm rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Position</label>
            <div className="flex flex-wrap gap-2">
              {positions.map((p) => (
                <button key={p} onClick={() => setPosition(p)} className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${p === position ? "border-violet-500 bg-violet-500/20 text-violet-300" : "border-zinc-700 text-zinc-400 hover:border-zinc-600"}`}>{p}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Size</label>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${s === size ? "border-violet-500 bg-violet-500/20 text-violet-300" : "border-zinc-700 text-zinc-400 hover:border-zinc-600"}`}>{s}</button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={showLogo} onChange={(e) => setShowLogo(e.target.checked)} className="accent-violet-500" />
            <span className="text-xs text-zinc-400">Show logo</span>
          </label>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Usage</h2>
      <CodeBlock code={`// Add to your app layout
<Watermark />

// Customize
<Watermark
  position="bottom-left"
  size="md"
  text="Powered by UIVIX"
/>`} />

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable props={[
        { name: "position", type: '"bottom-right" | "bottom-left" | "top-right" | "top-left"', default: '"bottom-right"', description: "Fixed position on the page" },
        { name: "text", type: "string", default: '"Built with UIVIX"', description: "Text to display" },
        { name: "showLogo", type: "boolean", default: "true", description: "Show the UIVIX logo" },
        { name: "logoUrl", type: "string", default: "UIVIX logo", description: "Custom logo image URL" },
        { name: "href", type: "string", default: "uivix-docs.vercel.app", description: "Link destination" },
        { name: "size", type: '"sm" | "md" | "lg"', default: '"sm"', description: "Badge size" },
        { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
      ]} />
    </div>
  );
}
