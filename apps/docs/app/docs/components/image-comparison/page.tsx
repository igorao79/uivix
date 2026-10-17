"use client";

import { ImageComparison } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { ImageComparison } from "@igorao79/uivix";`;


export default function ImageComparisonPage() {

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Image Comparison</h1>
      <p className="text-zinc-400 mb-8">Drag-to-reveal before/after slider. Works with images or any React content, supports touch and arrow keys.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Default" description="Drag the handle" code={`<ImageComparison before={<img src="before.jpg" />} after={<img src="after.jpg" />} />`}>
        <div className="w-full max-w-xl">
          <ImageComparison
            before={<div className="flex h-full w-full items-center justify-center bg-zinc-800 text-2xl font-bold text-zinc-500">Before</div>}
            after={<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-600 text-2xl font-bold text-white">After</div>}
          />
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "before", type: "ReactNode", default: "-", description: "Content on the left of the handle" },
          { name: "after", type: "ReactNode", default: "-", description: "Content on the right of the handle" },
          { name: "initial", type: "number", default: "50", description: "Initial handle position (0–100)" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
