"use client";

import { FlipCard } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { FlipCard } from "@igorao79/uivix";`;

const Front = ({ label }: { label: string }) => (
  <div className="flex h-full w-full flex-col items-center justify-center gap-2 border border-zinc-800 bg-zinc-900 rounded-xl">
    <span className="text-4xl">🃏</span>
    <span className="text-sm text-zinc-400">{label}</span>
  </div>
);

const Back = ({ text }: { text: string }) => (
  <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 p-6 text-center font-medium text-white">
    {text}
  </div>
);

export default function FlipCardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Flip Card</h1>
      <p className="text-zinc-400 mb-8">A two-sided card that flips in 3D on hover or click. Can be controlled.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Hover & click" description="Left flips on hover, right flips vertically on click" code={`<FlipCard front={<Front />} back={<Back />} />

<FlipCard trigger="click" direction="vertical" front={<Front />} back={<Back />} />`}>
        <div className="flex w-full flex-wrap justify-center gap-6">
          <FlipCard className="h-48 w-64" front={<Front label="Hover me" />} back={<Back text="Hello from the other side 👋" />} />
          <FlipCard className="h-48 w-64" trigger="click" direction="vertical" front={<Front label="Click me" />} back={<Back text="Click again to flip back" />} />
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "front", type: "ReactNode", default: "-", description: "Front face" },
          { name: "back", type: "ReactNode", default: "-", description: "Back face" },
          { name: "trigger", type: '"hover" | "click"', default: '"hover"', description: "What flips the card" },
          { name: "direction", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Flip axis" },
          { name: "flipped", type: "boolean", default: "-", description: "Controlled state" },
          { name: "onFlipChange", type: "(flipped: boolean) => void", default: "-", description: "Called when the card flips" },
          { name: "duration", type: "number", default: "600", description: "Animation duration in ms" },
          { name: "className", type: "string", default: "-", description: "Size and other classes (default h-56 w-80)" },
        ]}
      />
    </div>
  );
}
