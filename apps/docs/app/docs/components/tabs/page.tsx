"use client";

import { Tabs } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Tabs } from "@igorao79/uivix";`;

const tabs = [
  { id: "overview", label: "Overview", content: "A quick summary of your project." },
  { id: "activity", label: "Activity", content: "Recent commits, deploys and comments." },
  { id: "settings", label: "Settings", content: "Configure your workspace." },
];

export default function TabsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Tabs</h1>
      <p className="text-zinc-400 mb-8">
        Switch between panels of content. Available in underline and pill styles.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview
        title="Underline"
        description="Default style"
        code={`<Tabs tabs={[{ id: "overview", label: "Overview", content: "..." }]} />`}
      >
        <div className="w-full max-w-lg"><Tabs tabs={tabs} /></div>
      </ComponentPreview>
      <ComponentPreview title="Pills" description="Segmented control style" code={`<Tabs variant="pills" tabs={tabs} />`}>
        <div className="w-full max-w-lg"><Tabs tabs={tabs} variant="pills" /></div>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "tabs", type: "{ id: string; label: ReactNode; content: ReactNode }[]", default: "-", description: "Tab definitions" },
          { name: "defaultTab", type: "string", default: "first tab", description: "Initially active tab id" },
          { name: "variant", type: '"underline" | "pills"', default: '"underline"', description: "Visual style" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
