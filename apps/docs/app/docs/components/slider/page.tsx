"use client";

import { useState } from "react";
import { Slider } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Slider } from "@igorao79/uivix";`;

export default function SliderPage() {
  const [volume, setVolume] = useState(60);
  const [price, setPrice] = useState(250);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Slider</h1>
      <p className="text-zinc-400 mb-8">Range slider with a gradient fill and a floating value bubble. Built on a native input, so keyboard and screen readers just work.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Controlled" code={`const [volume, setVolume] = useState(60);

<Slider value={volume} onChange={setVolume} />`}>
        <div className="w-full max-w-md space-y-2 pt-6">
          <Slider value={volume} onChange={setVolume} />
          <div className="text-sm text-zinc-500">Volume: <span className="text-zinc-200">{volume}%</span></div>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Step & format" code={`<Slider min={0} max={1000} step={50} defaultValue={250} formatValue={(v) => \`$\${v}\`} />`}>
        <div className="w-full max-w-md space-y-2 pt-6">
          <Slider min={0} max={1000} step={50} value={price} onChange={setPrice} formatValue={(v) => `$${v}`} />
          <div className="text-sm text-zinc-500">Budget: <span className="text-zinc-200">${price}</span></div>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Disabled" code={`<Slider defaultValue={40} disabled />`}>
        <div className="w-full max-w-md"><Slider defaultValue={40} disabled /></div>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "value", type: "number", default: "-", description: "Controlled value" },
          { name: "defaultValue", type: "number", default: "min", description: "Initial value when uncontrolled" },
          { name: "onChange", type: "(value: number) => void", default: "-", description: "Called on change" },
          { name: "min / max / step", type: "number", default: "0 / 100 / 1", description: "Range and step" },
          { name: "showValue", type: "boolean", default: "true", description: "Show a value bubble on hover/focus" },
          { name: "formatValue", type: "(value: number) => string", default: "String", description: "Format the bubble text" },
          { name: "disabled", type: "boolean", default: "false", description: "Disable the slider" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
