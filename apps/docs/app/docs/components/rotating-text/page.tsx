"use client";

import { RotatingText, GradientText } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { RotatingText } from "@igorao79/uivix";`;

export default function RotatingTextPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Rotating Text</h1>
      <p className="text-zinc-400 mb-8">
        Cycles through a list of words with a smooth slide-and-blur transition. Great for hero headlines.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview
        title="Headline"
        description="Inline in a sentence"
        code={`<h2 className="text-3xl font-bold">
  Build <RotatingText words={["faster", "prettier", "smarter"]} className="text-violet-400" />
</h2>`}
      >
        <h2 className="text-3xl font-bold">
          Build <RotatingText words={["faster", "prettier", "smarter"]} className="text-violet-400" />
        </h2>
      </ComponentPreview>
      <ComponentPreview
        title="With gradient"
        description="Combine with GradientText"
        code={`<GradientText className="text-3xl font-bold">
  <RotatingText words={["React", "Tailwind", "TypeScript"]} />
</GradientText>`}
      >
        <GradientText className="text-3xl font-bold">
          <RotatingText words={["React", "Tailwind", "TypeScript"]} />
        </GradientText>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "words", type: "string[]", default: "-", description: "Words or phrases to cycle through" },
          { name: "interval", type: "number", default: "2200", description: "Time each word stays visible in ms" },
          { name: "as", type: "ElementType", default: '"span"', description: "HTML tag" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
