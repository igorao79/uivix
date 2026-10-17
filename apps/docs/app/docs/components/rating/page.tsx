"use client";

import { useState } from "react";
import { Rating } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Rating } from "@igorao79/uivix";`;

export default function RatingPage() {
  const [value, setValue] = useState(3);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Rating</h1>
      <p className="text-zinc-400 mb-8">
        Interactive star rating with hover preview. Works controlled or uncontrolled, and can be read-only.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview
        title="Controlled"
        description="Value managed by state"
        code={`const [value, setValue] = useState(3);

<Rating value={value} onChange={setValue} />`}
      >
        <div className="flex flex-col items-center gap-2">
          <Rating value={value} onChange={setValue} />
          <span className="text-xs text-zinc-500">{value} / 5</span>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Read only" description="Display a score" code={`<Rating defaultValue={4} readOnly size={18} />`}>
        <Rating defaultValue={4} readOnly size={18} />
      </ComponentPreview>
      <ComponentPreview title="Custom max" description="10 stars" code={`<Rating max={10} size={16} />`}>
        <Rating max={10} size={16} />
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "value", type: "number", default: "-", description: "Controlled value" },
          { name: "defaultValue", type: "number", default: "0", description: "Initial value when uncontrolled" },
          { name: "max", type: "number", default: "5", description: "Number of stars" },
          { name: "onChange", type: "(value: number) => void", default: "-", description: "Called when a star is selected" },
          { name: "readOnly", type: "boolean", default: "false", description: "Disable interaction" },
          { name: "size", type: "number", default: "24", description: "Star size in px" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
