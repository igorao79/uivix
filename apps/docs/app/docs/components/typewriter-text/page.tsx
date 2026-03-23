"use client";

import { useState } from "react";
import { TypewriterText } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { TypewriterText } from "@igorao79/uivix";`;

export default function TypewriterTextPage() {
  const [words, setWords] = useState("Hello World, Welcome to UIVIX, Build beautiful UIs");
  const [speed, setSpeed] = useState(80);
  const [deleteSpd, setDeleteSpd] = useState(50);
  const [pause, setPause] = useState(1500);
  const [key, setKey] = useState(0);

  const wordList = words.split(",").map((w) => w.trim()).filter(Boolean);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Typewriter</h1>
      <p className="text-zinc-400 mb-8">
        A typing animation that cycles through an array of words with realistic typing and deleting effects.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      {/* ── Playground ── */}
      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <div className="mb-5 flex items-center justify-center min-h-[80px]">
          <span className="text-3xl font-bold text-white">
            {wordList.length > 0 && (
              <TypewriterText
                key={key}
                words={wordList}
                typeSpeed={speed}
                deleteSpeed={deleteSpd}
                pauseDuration={pause}
              />
            )}
          </span>
        </div>
        <div className="border-t border-zinc-800 pt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">
              Words (comma separated)
            </label>
            <input
              type="text"
              value={words}
              onChange={(e) => { setWords(e.target.value); setKey((k) => k + 1); }}
              className="w-full h-9 px-3 text-sm rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-colors"
              placeholder="Word 1, Word 2, Word 3..."
            />
          </div>
          <SliderControl label="Type Speed" value={speed} onChange={(v) => { setSpeed(v); setKey((k) => k + 1); }} min={20} max={200} suffix="ms" />
          <SliderControl label="Delete Speed" value={deleteSpd} onChange={(v) => { setDeleteSpd(v); setKey((k) => k + 1); }} min={20} max={150} suffix="ms" />
          <SliderControl label="Pause" value={pause} onChange={(v) => { setPause(v); setKey((k) => k + 1); }} min={300} max={5000} step={100} suffix="ms" />
        </div>
      </div>

      {/* ── Examples ── */}
      <h2 className="text-xl font-semibold mb-4">Examples</h2>

      <ComponentPreview
        title="In a Heading"
        description="Used as part of a sentence"
        code={`<h1>We build <TypewriterText words={["websites", "apps", "products"]} /></h1>`}
      >
        <h1 className="text-3xl font-bold text-white">
          We build{" "}
          <span className="text-violet-400">
            <TypewriterText words={["websites", "apps", "products", "experiences"]} />
          </span>
        </h1>
      </ComponentPreview>

      <ComponentPreview
        title="Custom Cursor"
        description="Underscore cursor with custom color"
        code={`<TypewriterText words={["Custom cursor"]} cursorChar="_" cursorClassName="text-violet-400" />`}
      >
        <span className="text-2xl font-bold text-white">
          <TypewriterText words={["Custom cursor", "Underscore style"]} cursorClassName="!bg-violet-400" />
        </span>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "words", type: "string[]", default: "-", description: "Array of strings to type through (required)" },
          { name: "typeSpeed", type: "number", default: "80", description: "Typing speed in ms per character" },
          { name: "deleteSpeed", type: "number", default: "50", description: "Deleting speed in ms per character" },
          { name: "pauseDuration", type: "number", default: "1500", description: "Pause before deleting in ms" },
          { name: "loop", type: "boolean", default: "true", description: "Loop the animation" },
          { name: "cursor", type: "boolean", default: "true", description: "Show blinking cursor" },
          { name: "cursorChar", type: "string", default: '"|"', description: "Cursor character" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
