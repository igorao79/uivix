"use client";

import { useState } from "react";
import { Stepper, Button } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Stepper } from "@igorao79/uivix";`;

const steps = [
  { title: "Account", description: "Email & password" },
  { title: "Profile", description: "Name and avatar" },
  { title: "Plan", description: "Pick a plan" },
  { title: "Done", description: "Start building" },
];

export default function StepperPage() {
  const [step, setStep] = useState(1);
  const [vStep, setVStep] = useState(2);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Stepper</h1>
      <p className="text-zinc-400 mb-8">Shows progress through a multi-step flow. Connectors fill with a gradient as steps complete; completed steps can be clickable.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Horizontal" description="Click a completed step to go back" code={`const [step, setStep] = useState(1);

<Stepper steps={steps} current={step} onStepClick={setStep} />
<Button onClick={() => setStep(step + 1)}>Next</Button>`}>
        <div className="w-full space-y-6">
          <Stepper steps={steps} current={step} onStepClick={setStep} />
          <div className="flex justify-center gap-2">
            <Button size="sm" variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Back</Button>
            <Button size="sm" disabled={step === steps.length} onClick={() => setStep((s) => s + 1)}>
              {step >= steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Vertical" code={`<Stepper orientation="vertical" steps={steps} current={2} />`}>
        <div className="flex items-start gap-8">
          <Stepper orientation="vertical" steps={steps} current={vStep} onStepClick={setVStep} />
          <Button size="sm" variant="outline" onClick={() => setVStep((s) => (s + 1) % (steps.length + 1))}>Next</Button>
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "steps", type: "StepperStep[]", default: "-", description: "{ title, description? } for each step" },
          { name: "current", type: "number", default: "-", description: "Index of the current step; earlier steps are complete" },
          { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout direction" },
          { name: "onStepClick", type: "(index: number) => void", default: "-", description: "Makes completed steps clickable" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
