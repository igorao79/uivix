"use client";

import { TiltCard } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { TiltCard } from "@igorao79/uivix";`;

export default function TiltCardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Tilt Card</h1>
      <p className="text-zinc-400 mb-8">3D card that tilts toward the cursor with a moving glare highlight, and springs back when the cursor leaves.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Credit card" description="Hover to tilt" code={`<TiltCard className="h-48 w-80 bg-gradient-to-br from-violet-600 to-fuchsia-600">
  ...
</TiltCard>`}>
        <div className="flex w-full justify-center py-6">
          <TiltCard className="flex h-48 w-80 flex-col justify-between border-white/10 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-500">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold tracking-wide text-white">UIVIX</span>
              <span className="h-8 w-11 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500" />
            </div>
            <div>
              <div className="font-mono text-base tracking-[0.12em] text-white/90">4242 4242 4242 4242</div>
              <div className="mt-2 flex justify-between text-xs uppercase text-white/70">
                <span>Jane Doe</span>
                <span>12/29</span>
              </div>
            </div>
          </TiltCard>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Subtle" description="Smaller tilt, no glare" code={`<TiltCard maxTilt={5} scale={1.01} glare={false}>...</TiltCard>`}>
        <TiltCard maxTilt={5} scale={1.01} glare={false} className="w-72">
          <h3 className="font-semibold text-zinc-100">Subtle tilt</h3>
          <p className="mt-2 text-sm text-zinc-400">Good for dense grids of cards.</p>
        </TiltCard>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "maxTilt", type: "number", default: "12", description: "Max rotation in degrees" },
          { name: "scale", type: "number", default: "1.03", description: "Scale while hovered" },
          { name: "glare", type: "boolean", default: "true", description: "Show a moving glare highlight" },
          { name: "perspective", type: "number", default: "900", description: "CSS perspective in px" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
