"use client";

import { Combobox } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Combobox } from "@igorao79/uivix";`;

const frameworks = ["React", "Next.js", "Remix", "Vue", "Nuxt", "Svelte", "SvelteKit", "Angular", "Solid", "Astro", "Qwik"].map((f) => ({ value: f.toLowerCase(), label: f }));

export default function ComboboxPage() {

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Combobox</h1>
      <p className="text-zinc-400 mb-8">Searchable select with filtering, keyboard navigation and click-outside close.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Default" description="Type to filter, arrows + Enter to choose" code={`<Combobox options={frameworks} placeholder="Pick a framework" />`}>
        <div className="flex h-72 w-full justify-center"><Combobox options={frameworks} placeholder="Pick a framework" /></div>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "options", type: "{ value: string; label: string }[]", default: "-", description: "Available options" },
          { name: "value", type: "string | null", default: "-", description: "Controlled value" },
          { name: "defaultValue", type: "string | null", default: "null", description: "Initial value when uncontrolled" },
          { name: "onChange", type: "(value: string) => void", default: "-", description: "Called when an option is chosen" },
          { name: "placeholder", type: "string", default: "\"Select\u2026\"", description: "Trigger placeholder" },
          { name: "searchPlaceholder", type: "string", default: "\"Search\u2026\"", description: "Search input placeholder" },
          { name: "emptyText", type: "string", default: "\"Nothing found.\"", description: "Shown when nothing matches" },
        ]}
      />
    </div>
  );
}
