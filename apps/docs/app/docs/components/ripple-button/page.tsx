"use client";

import { RippleButton } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { RippleButton } from "@igorao79/uivix";`;

export default function RippleButtonPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Ripple Button</h1>
      <p className="text-zinc-400 mb-8">Material-style button that emits an ink ripple from the exact click point. Rapid clicks stack ripples.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Variants" description="Click anywhere on the buttons" code={`<RippleButton>Click me</RippleButton>

<RippleButton
  rippleColor="rgba(139, 92, 246, 0.35)"
  className="bg-zinc-800 hover:bg-zinc-700"
>
  Dark
</RippleButton>`}>
        <RippleButton>Click me</RippleButton>
        <RippleButton rippleColor="rgba(139, 92, 246, 0.35)" className="bg-zinc-800 hover:bg-zinc-700">Dark</RippleButton>
        <RippleButton rippleColor="rgba(0, 0, 0, 0.2)" className="bg-zinc-100 text-zinc-900 hover:bg-white">Light</RippleButton>
        <RippleButton duration={1200} className="h-28 w-56 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-base">Big & slow</RippleButton>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "rippleColor", type: "string", default: "rgba(255,255,255,0.45)", description: "Ripple color" },
          { name: "duration", type: "number", default: "600", description: "Ripple duration in ms" },
          { name: "...props", type: "ButtonHTMLAttributes", default: "-", description: "Any native button props" },
        ]}
      />
    </div>
  );
}
