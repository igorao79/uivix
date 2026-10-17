"use client";

import { Timeline } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Timeline } from "@igorao79/uivix";`;

const items = [
  { id: "1", title: "v0.1 — First release", time: "Mar 2026", description: "Buttons, inputs and a handful of text effects." },
  { id: "2", title: "17 animated backgrounds", time: "Mar 2026", description: "Aurora, starfield, flow field and more." },
  { id: "3", title: "MCP server", time: "Mar 2026", description: "Let your AI assistant install and use uivix components." },
  { id: "4", title: "Overlays & interactions", time: "Now", description: "Dock, command palette, toasts, dialogs, calendar and friends." },
];

export default function TimelinePage() {

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Timeline</h1>
      <p className="text-zinc-400 mb-8">Vertical timeline whose entries fade in as they scroll into view. Great for changelogs and roadmaps.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Changelog" description="Entries animate in on scroll" code={`<Timeline items={[{ id: "1", title: "v1.0", time: "March 2026", description: "First release" }]} />`}>
        <div className="w-full max-w-md py-2"><Timeline items={items} /></div>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "items", type: "TimelineItem[]", default: "-", description: "{ id, title, description?, time?, icon? }" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
