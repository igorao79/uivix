"use client";

import { BorderBeam, Button } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { BorderBeam } from "@igorao79/uivix";`;

export default function BorderBeamPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Border Beam</h1>
      <p className="text-zinc-400 mb-8">A container with a beam of light that keeps travelling around its border. Draws the eye to pricing tiers, CTAs or new features.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Pricing card" code={`<BorderBeam className="w-72">
  <h3>Pro</h3>
  <p>$12 / month</p>
</BorderBeam>`}>
        <div className="flex w-full justify-center">
          <BorderBeam className="w-72">
            <div className="text-sm font-medium text-violet-300">Pro</div>
            <div className="mt-2 text-3xl font-bold text-zinc-100">$12<span className="text-base font-normal text-zinc-500"> / month</span></div>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li>✓ Unlimited projects</li>
              <li>✓ All components</li>
              <li>✓ Priority support</li>
            </ul>
            <Button variant="gradient" className="mt-6 w-full">Get started</Button>
          </BorderBeam>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Custom beam" description="Faster, longer and warmer" code={`<BorderBeam colorFrom="#f97316" colorTo="#facc15" duration={2.5} beamLength={0.35} borderWidth={2} />`}>
        <BorderBeam colorFrom="#f97316" colorTo="#facc15" duration={2.5} beamLength={0.35} borderWidth={2} className="w-full max-w-md rounded-2xl">
          <p className="text-sm text-zinc-300">🔥 New: 13 interactive components just landed.</p>
        </BorderBeam>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "colorFrom", type: "string", default: '"#a78bfa"', description: "Beam tail color" },
          { name: "colorTo", type: "string", default: '"#22d3ee"', description: "Beam head color" },
          { name: "duration", type: "number", default: "4", description: "Seconds per lap" },
          { name: "borderWidth", type: "number", default: "1.5", description: "Border width in px" },
          { name: "beamLength", type: "number", default: "0.2", description: "Beam length as a share of the perimeter (0..1)" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
