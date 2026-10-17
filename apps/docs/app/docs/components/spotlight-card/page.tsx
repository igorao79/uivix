"use client";

import { SpotlightCard } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { SpotlightCard } from "@igorao79/uivix";`;

const features = [
  { title: "Lightning fast", text: "Zero runtime dependencies besides clsx and tailwind-merge." },
  { title: "Accessible", text: "Keyboard support and ARIA roles out of the box." },
  { title: "Themeable", text: "Every component accepts className and is built on Tailwind." },
];

export default function SpotlightCardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Spotlight Card</h1>
      <p className="text-zinc-400 mb-8">A card lit by a soft radial spotlight that follows the cursor, with an optional glowing border.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Feature grid" description="Move the cursor over the cards" code={`<SpotlightCard>
  <h3 className="font-semibold">Lightning fast</h3>
  <p className="text-sm text-zinc-400">Zero runtime dependencies.</p>
</SpotlightCard>`}>
        <div className="grid w-full gap-4 sm:grid-cols-3">
          {features.map((f) => (
            <SpotlightCard key={f.title}>
              <h3 className="font-semibold text-zinc-100">{f.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{f.text}</p>
            </SpotlightCard>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview title="Custom colors" code={`<SpotlightCard color="rgba(34, 211, 238, 0.2)" borderColor="#22d3ee" radius={200} />`}>
        <SpotlightCard color="rgba(34, 211, 238, 0.2)" borderColor="#22d3ee" radius={200} className="w-full max-w-sm">
          <h3 className="font-semibold text-zinc-100">Cyan glow</h3>
          <p className="mt-2 text-sm text-zinc-400">Smaller radius, cyan border highlight.</p>
        </SpotlightCard>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "color", type: "string", default: "rgba(139,92,246,0.25)", description: "Spotlight color" },
          { name: "borderColor", type: "string", default: "rgba(167,139,250,0.9)", description: "Border highlight color" },
          { name: "radius", type: "number", default: "320", description: "Spotlight radius in px" },
          { name: "borderGlow", type: "boolean", default: "true", description: "Light up the border under the cursor" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
