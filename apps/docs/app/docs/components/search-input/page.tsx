"use client";

import { useState } from "react";
import { SearchInput } from "uixy";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { SearchInput } from "uixy";`;

export default function SearchInputPage() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Search Input</h1>
      <p className="text-zinc-400 mb-8">
        A search input with a magnifying glass icon and a clear button that appears when text is entered.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      {/* Basic */}
      <h2 className="text-xl font-semibold mb-4">Basic Usage</h2>

      <ComponentPreview
        title="Default"
        description="Type something to see the clear button"
        code={`<SearchInput placeholder="Search..." />`}
      >
        <div className="w-full max-w-sm">
          <SearchInput placeholder="Search..." />
        </div>
      </ComponentPreview>

      {/* Controlled */}
      <ComponentPreview
        title="Controlled"
        description="With controlled value and onClear callback"
        code={`const [query, setQuery] = useState("");

<SearchInput
  placeholder="Search components..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onClear={() => setQuery("")}
/>`}
      >
        <div className="w-full max-w-sm">
          <SearchInput
            placeholder="Search components..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery("")}
          />
          <p className="text-xs text-zinc-500 mt-2">Query: {query || "(empty)"}</p>
        </div>
      </ComponentPreview>

      {/* Sizes */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Sizes</h2>

      <ComponentPreview
        title="All Sizes"
        description="Small, medium, and large"
        code={`<SearchInput inputSize="sm" placeholder="Small search..." />
<SearchInput inputSize="md" placeholder="Medium search..." />
<SearchInput inputSize="lg" placeholder="Large search..." />`}
      >
        <div className="space-y-3 w-full max-w-sm">
          <SearchInput inputSize="sm" placeholder="Small search..." />
          <SearchInput inputSize="md" placeholder="Medium search..." />
          <SearchInput inputSize="lg" placeholder="Large search..." />
        </div>
      </ComponentPreview>

      {/* Props */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "inputSize", type: '"sm" | "md" | "lg"', default: '"md"', description: "The size of the input" },
          { name: "onClear", type: "() => void", default: "-", description: "Callback when clear button is clicked" },
          { name: "wrapperClassName", type: "string", default: "-", description: "Extra classes for the wrapper div" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the input" },
        ]}
      />
    </div>
  );
}
