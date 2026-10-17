"use client";

import { Accordion } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Accordion } from "@igorao79/uivix";`;

const items = [
  { id: "a", title: "What is uivix?", content: "A React + Tailwind CSS component library with animated text, backgrounds and more." },
  { id: "b", title: "Is it typed?", content: "Yes, everything ships with full TypeScript definitions." },
  { id: "c", title: "Can I customize it?", content: "Every component accepts className so you can override any style." },
];

export default function AccordionPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Accordion</h1>
      <p className="text-zinc-400 mb-8">
        Collapsible content sections with smooth height animation. Supports single or multiple open items.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview
        title="Single"
        description="Only one item open at a time"
        code={`<Accordion
  defaultOpen={["a"]}
  items={[
    { id: "a", title: "What is uivix?", content: "..." },
    { id: "b", title: "Is it typed?", content: "..." },
  ]}
/>`}
      >
        <div className="w-full max-w-lg"><Accordion items={items} defaultOpen={["a"]} /></div>
      </ComponentPreview>
      <ComponentPreview title="Multiple" description="Several items can stay open" code={`<Accordion multiple items={items} />`}>
        <div className="w-full max-w-lg"><Accordion items={items} multiple /></div>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "items", type: "{ id: string; title: ReactNode; content: ReactNode }[]", default: "-", description: "Accordion sections" },
          { name: "multiple", type: "boolean", default: "false", description: "Allow several items open at once" },
          { name: "defaultOpen", type: "string[]", default: "[]", description: "Ids open by default" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
