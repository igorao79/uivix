"use client";

import { useState } from "react";
import { SegmentedControl } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { SegmentedControl } from "@igorao79/uivix";`;

const periods = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

export default function SegmentedControlPage() {
  const [period, setPeriod] = useState("week");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Segmented Control</h1>
      <p className="text-zinc-400 mb-8">iOS-style segmented control. The active pill slides between options with a slight spring.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Controlled" code={`const [period, setPeriod] = useState("week");

<SegmentedControl
  value={period}
  onChange={setPeriod}
  options={[
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
  ]}
/>`}>
        <div className="flex flex-col items-start gap-3">
          <SegmentedControl options={periods} value={period} onChange={setPeriod} />
          <span className="text-sm text-zinc-500">Showing stats for: <span className="text-zinc-200">{period}</span></span>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Sizes" code={`<SegmentedControl size="sm" options={...} />
<SegmentedControl size="lg" options={...} />`}>
        <div className="flex flex-col items-start gap-4">
          <SegmentedControl size="sm" options={[{ value: "list", label: "List" }, { value: "grid", label: "Grid" }]} />
          <SegmentedControl options={[{ value: "monthly", label: "Monthly" }, { value: "yearly", label: "Yearly −20%" }]} />
          <SegmentedControl size="lg" options={[{ value: "light", label: "☀️ Light" }, { value: "dark", label: "🌙 Dark" }, { value: "auto", label: "💻 Auto" }]} />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Full width" code={`<SegmentedControl fullWidth options={...} />`}>
        <SegmentedControl fullWidth options={periods} defaultValue="month" />
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "options", type: "SegmentedOption[]", default: "-", description: "{ value, label } for each segment" },
          { name: "value", type: "string", default: "-", description: "Controlled value" },
          { name: "defaultValue", type: "string", default: "first option", description: "Initial value when uncontrolled" },
          { name: "onChange", type: "(value: string) => void", default: "-", description: "Called on change" },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Size" },
          { name: "fullWidth", type: "boolean", default: "false", description: "Stretch to the container width" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
