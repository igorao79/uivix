"use client";

import { Loader, type LoaderVariant } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Loader } from "@igorao79/uivix";`;

const variants: LoaderVariant[] = ["spinner", "dots", "bars", "pulse", "orbit", "square"];

export default function LoaderPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Loader</h1>
      <p className="text-zinc-400 mb-8">Loading indicators in six styles. Pure CSS animations, any size and color.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Variants" code={variants.map((v) => `<Loader variant="${v}" />`).join("\n")}>
        <div className="grid w-full grid-cols-3 gap-8 sm:grid-cols-6">
          {variants.map((v) => (
            <div key={v} className="flex flex-col items-center gap-3">
              <div className="flex h-12 items-center"><Loader variant={v} /></div>
              <span className="text-xs text-zinc-500">{v}</span>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview title="Sizes & colors" code={`<Loader size={20} color="#22d3ee" />
<Loader variant="dots" size={24} color="#f472b6" />
<Loader variant="orbit" size={56} color="#facc15" />`}>
        <Loader size={20} color="#22d3ee" />
        <Loader variant="dots" size={24} color="#f472b6" />
        <Loader variant="bars" size={40} color="#34d399" />
        <Loader variant="orbit" size={56} color="#facc15" />
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "variant", type: '"spinner" | "dots" | "bars" | "pulse" | "orbit" | "square"', default: '"spinner"', description: "Animation style" },
          { name: "size", type: "number", default: "32", description: "Size in px" },
          { name: "color", type: "string", default: '"#a78bfa"', description: "Any CSS color" },
          { name: "label", type: "string", default: '"Loading"', description: "Accessible label" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
