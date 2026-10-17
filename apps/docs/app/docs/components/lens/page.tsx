"use client";

import { Lens } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Lens } from "@igorao79/uivix";`;

export default function LensPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Lens</h1>
      <p className="text-zinc-400 mb-8">An image with a circular magnifying glass that follows the cursor (or finger). Great for product shots and detailed artwork.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Default" description="Hover the image — try the bottom-right corner" code={`<Lens src="/photo.jpg" alt="Synthwave sunset" />`}>
        <Lens src="/lens-demo.svg" alt="Synthwave sunset" className="w-full max-w-xl" />
      </ComponentPreview>

      <ComponentPreview title="Strong zoom" code={`<Lens src="/photo.jpg" zoom={5} size={120} />`}>
        <Lens src="/lens-demo.svg" alt="Synthwave sunset" zoom={5} size={120} className="w-full max-w-sm" />
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "src", type: "string", default: "-", description: "Image URL" },
          { name: "alt", type: "string", default: '""', description: "Alt text" },
          { name: "zoom", type: "number", default: "2.5", description: "Magnification factor" },
          { name: "size", type: "number", default: "160", description: "Lens diameter in px" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
