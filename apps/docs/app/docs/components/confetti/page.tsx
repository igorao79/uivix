"use client";

import { useRef } from "react";

import { Confetti, Button, type ConfettiHandle } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Confetti, Button, type ConfettiHandle } from "@igorao79/uivix";`;


export default function ConfettiPage() {
  const ref = useRef<ConfettiHandle>(null);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Confetti</h1>
      <p className="text-zinc-400 mb-8">Canvas confetti burst you fire imperatively through a ref. Overlays any container without blocking clicks.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Celebrate" description="Click the button" code={`const ref = useRef<ConfettiHandle>(null);

<div className="relative">
  <Confetti ref={ref} />
  <Button onClick={() => ref.current?.fire()}>Celebrate</Button>
</div>`}>
        <div className="relative flex h-56 w-full items-end justify-center overflow-hidden rounded-lg pb-6">
          <Confetti ref={ref} />
          <Button variant="gradient" onClick={() => ref.current?.fire()}>🎉 Celebrate</Button>
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "ref", type: "ConfettiHandle", default: "-", description: "Call ref.current.fire({ x?, y?, count? })" },
          { name: "colors", type: "string[]", default: "violet/pink/cyan/yellow/green", description: "Piece colors" },
          { name: "count", type: "number", default: "120", description: "Pieces per burst" },
          { name: "power", type: "number", default: "14", description: "Initial velocity" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
