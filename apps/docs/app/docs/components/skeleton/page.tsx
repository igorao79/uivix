"use client";

import { useState } from "react";
import { Skeleton } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Skeleton } from "@igorao79/uivix";`;

const variantOptions = ["rectangle", "circle", "text"] as const;
const animationOptions = ["pulse", "shimmer", "none"] as const;

export default function SkeletonPage() {
  const [variant, setVariant] = useState<string>("rectangle");
  const [animation, setAnimation] = useState<string>("shimmer");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Skeleton</h1>
      <p className="text-zinc-400 mb-8">
        Placeholder loading shapes with shimmer, pulse, or static animations.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <div className="mb-5 flex items-center justify-center min-h-[80px]">
          <Skeleton
            variant={variant as any}
            animation={animation as any}
            width={variant === "circle" ? 64 : 200}
            height={variant === "circle" ? 64 : variant === "text" ? 16 : 40}
          />
        </div>
        <div className="border-t border-zinc-800 pt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-2">Variant</label>
            <div className="flex flex-wrap gap-2">
              {variantOptions.map((v) => (
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
            <label className="block text-xs font-medium text-zinc-500 mb-2">Animation</label>
            <div className="flex flex-wrap gap-2">
              {animationOptions.map((a) => (
                <button
                  key={a}
                  onClick={() => setAnimation(a)}
                  className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                    a === animation
                      ? "border-violet-500 bg-violet-500/20 text-violet-300"
                      : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Card Skeleton</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton variant="circle" width={48} height={48} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="40%" height={14} />
            <Skeleton variant="text" width="25%" height={12} />
          </div>
        </div>
        <Skeleton variant="rectangle" width="100%" height={120} className="mb-3" />
        <div className="space-y-2">
          <Skeleton variant="text" width="100%" height={12} />
          <Skeleton variant="text" width="100%" height={12} />
          <Skeleton variant="text" width="60%" height={12} />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Usage</h2>
      <CodeBlock code={`{/* Card skeleton */}
<div className="flex items-center gap-3">
  <Skeleton variant="circle" width={48} height={48} />
  <div className="space-y-2">
    <Skeleton variant="text" width="40%" />
    <Skeleton variant="text" width="25%" />
  </div>
</div>
<Skeleton variant="rectangle" width="100%" height={120} />`} />

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "variant", type: '"rectangle" | "circle" | "text"', default: '"rectangle"', description: "Shape of the skeleton" },
          { name: "animation", type: '"pulse" | "shimmer" | "none"', default: '"shimmer"', description: "Animation style" },
          { name: "width", type: "string | number", default: '"100%" (circle: 40)', description: "Width of the skeleton" },
          { name: "height", type: "string | number", default: "20 (circle: 40, text: 16)", description: "Height of the skeleton" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
