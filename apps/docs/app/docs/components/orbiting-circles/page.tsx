"use client";

import { OrbitingCircles } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { OrbitingCircles } from "@igorao79/uivix";`;

const dot = (color: string, label: string) => (
  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white shadow-lg ${color}`}>{label}</div>
);

export default function OrbitingCirclesPage() {

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Orbiting Circles</h1>
      <p className="text-zinc-400 mb-8">Items orbiting a center element on concentric rings, each with its own radius, speed and direction. Items stay upright.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Tech stack" description="Two rings, opposite directions" code={`<OrbitingCircles center={<Logo />} rings={[{ radius: 70, items: [...] }, { radius: 130, reverse: true, items: [...] }]} />`}>
        <div className="flex w-full justify-center"><OrbitingCircles
          center={<div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-xs font-bold shadow-[0_0_30px_rgba(139,92,246,.6)]">UIVIX</div>}
          rings={[
            { radius: 70, duration: 14, items: [dot("bg-sky-500", "R"), dot("bg-cyan-400", "T"), dot("bg-yellow-400", "J")] },
            { radius: 130, duration: 24, reverse: true, items: [dot("bg-pink-500", "C"), dot("bg-emerald-500", "N"), dot("bg-orange-500", "H"), dot("bg-indigo-500", "V")] },
          ]}
        /></div>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "rings", type: "OrbitRing[]", default: "-", description: "{ items, radius, duration?, reverse?, itemSize? } per ring" },
          { name: "center", type: "ReactNode", default: "-", description: "Content in the middle" },
          { name: "showPaths", type: "boolean", default: "true", description: "Draw the orbit paths" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
