"use client";

import { MagneticButton } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { MagneticButton } from "@igorao79/uivix";`;

export default function MagneticButtonPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Magnetic Button</h1>
      <p className="text-zinc-400 mb-8">A button that is pulled toward the cursor and springs back on leave. The label moves a little further for a sense of depth.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Default" description="Bring the cursor close to the buttons" code={`<MagneticButton>Get started →</MagneticButton>

<MagneticButton strength={0.7} className="bg-violet-600 text-white">Strong pull</MagneticButton>`}>
        <div className="flex w-full flex-wrap items-center justify-center gap-16 py-10">
          <MagneticButton>Get started →</MagneticButton>
          <MagneticButton strength={0.7} range={60} className="bg-violet-600 text-white">Strong pull</MagneticButton>
          <MagneticButton aria-label="Like" className="h-14 w-14 bg-zinc-800 p-0 text-xl text-white ring-1 ring-white/10">♥</MagneticButton>
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "strength", type: "number", default: "0.4", description: "How strongly the button follows the cursor (0..1)" },
          { name: "range", type: "number", default: "40", description: "Extra distance around the button where the pull starts" },
          { name: "...props", type: "ButtonHTMLAttributes", default: "-", description: "Any native button props" },
        ]}
      />
    </div>
  );
}
