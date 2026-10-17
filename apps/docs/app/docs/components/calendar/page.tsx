"use client";

import { useState } from "react";

import { Calendar } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Calendar } from "@igorao79/uivix";`;


export default function CalendarPage() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Calendar</h1>
      <p className="text-zinc-400 mb-8">Month calendar with date selection, min/max limits, configurable week start and locale-aware labels.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Default" description={date ? `Selected: ${date.toDateString()}` : "Pick a date"} code={`<Calendar value={date} onChange={setDate} />`}>
        <Calendar value={date} onChange={setDate} />
      </ComponentPreview>
      <ComponentPreview title="Future only" description="Past dates disabled, Russian locale" code={`<Calendar min={new Date()} locale="ru-RU" />`}>
        <Calendar min={new Date()} locale="ru-RU" />
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "value", type: "Date | null", default: "-", description: "Controlled selected date" },
          { name: "defaultValue", type: "Date | null", default: "null", description: "Initial date when uncontrolled" },
          { name: "onChange", type: "(date: Date) => void", default: "-", description: "Called when a day is picked" },
          { name: "min", type: "Date", default: "-", description: "Earliest selectable date" },
          { name: "max", type: "Date", default: "-", description: "Latest selectable date" },
          { name: "weekStartsOn", type: "0 | 1", default: "1", description: "0 = Sunday, 1 = Monday" },
          { name: "locale", type: "string", default: "\"en-US\"", description: "Locale for month/weekday names" },
        ]}
      />
    </div>
  );
}
