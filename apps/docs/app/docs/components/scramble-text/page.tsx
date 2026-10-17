"use client";

import { ScrambleText } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { ScrambleText } from "@igorao79/uivix";`;

export default function ScrambleTextPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Scramble Text</h1>
      <p className="text-zinc-400 mb-8">
        Decoder-style text that scrambles random characters and resolves into the final text. Replays on hover.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Default" description="Hover to replay" code={`<ScrambleText text="Hack the planet" />`}>
        <ScrambleText className="text-3xl font-bold text-violet-400" text="Hack the planet" />
      </ComponentPreview>
      <ComponentPreview title="Slow" description="Longer duration" code={`<ScrambleText text="Decrypting..." duration={3000} />`}>
        <ScrambleText className="text-2xl text-emerald-400" text="Decrypting..." duration={3000} />
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "text", type: "string", default: "-", description: "Final text to reveal" },
          { name: "duration", type: "number", default: "1200", description: "Total reveal duration in ms" },
          { name: "chars", type: "string", default: '"!<>-_\\\\/[]{}—=+*^?#"', description: "Characters used while scrambling" },
          { name: "replayOnHover", type: "boolean", default: "true", description: "Replay the effect on hover" },
          { name: "as", type: "ElementType", default: '"span"', description: "HTML tag" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
