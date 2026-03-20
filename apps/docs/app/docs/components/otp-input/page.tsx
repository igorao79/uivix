"use client";

import { useState } from "react";
import { OTPInput } from "uixy";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { OTPInput } from "uixy";`;

export default function OTPInputPage() {
  const [otp, setOtp] = useState("");
  const [completed, setCompleted] = useState(false);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">OTP Input</h1>
      <p className="text-zinc-400 mb-8">
        A one-time password input with individual digit fields. Supports paste, keyboard navigation, and auto-advance.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      {/* Basic */}
      <h2 className="text-xl font-semibold mb-4">Basic Usage</h2>

      <ComponentPreview
        title="6-Digit OTP"
        description="Default 6-digit input. Try pasting a code!"
        code={`<OTPInput onComplete={(otp) => console.log(otp)} />`}
      >
        <OTPInput
          onChange={(val) => setOtp(val)}
          onComplete={() => setCompleted(true)}
        />
        <p className="text-xs text-zinc-500 mt-3">
          Value: {otp || "(empty)"} {completed && <span className="text-emerald-400 ml-2">Complete!</span>}
        </p>
      </ComponentPreview>

      {/* 4 digits */}
      <ComponentPreview
        title="4-Digit PIN"
        description="Shorter code with 4 digits"
        code={`<OTPInput length={4} />`}
      >
        <OTPInput length={4} />
      </ComponentPreview>

      {/* With separator */}
      <ComponentPreview
        title="With Separator"
        description="Dash separator after the 3rd digit"
        code={`<OTPInput length={6} separatorAfter={[2]} />`}
      >
        <OTPInput length={6} separatorAfter={[2]} />
      </ComponentPreview>

      {/* Sizes */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Sizes</h2>

      <ComponentPreview
        title="All Sizes"
        description="Small, medium, and large digit boxes"
        code={`<OTPInput length={4} inputSize="sm" />
<OTPInput length={4} inputSize="md" />
<OTPInput length={4} inputSize="lg" />`}
      >
        <div className="space-y-4">
          <div>
            <p className="text-xs text-zinc-500 mb-2">Small</p>
            <OTPInput length={4} inputSize="sm" />
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-2">Medium</p>
            <OTPInput length={4} inputSize="md" />
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-2">Large</p>
            <OTPInput length={4} inputSize="lg" />
          </div>
        </div>
      </ComponentPreview>

      {/* States */}
      <h2 className="text-xl font-semibold mb-4 mt-8">States</h2>

      <ComponentPreview
        title="Error"
        description="OTP input with error styling"
        code={`<OTPInput length={6} error />`}
      >
        <OTPInput length={6} error />
      </ComponentPreview>

      <ComponentPreview
        title="Disabled"
        description="Disabled OTP input"
        code={`<OTPInput length={6} disabled />`}
      >
        <OTPInput length={6} disabled />
      </ComponentPreview>

      {/* Props */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "length", type: "number", default: "6", description: "Number of digit fields" },
          { name: "onComplete", type: "(otp: string) => void", default: "-", description: "Called when all digits are filled" },
          { name: "onChange", type: "(otp: string) => void", default: "-", description: "Called on every value change" },
          { name: "inputSize", type: '"sm" | "md" | "lg"', default: '"md"', description: "Size of each digit box" },
          { name: "error", type: "boolean", default: "false", description: "Show error styling" },
          { name: "disabled", type: "boolean", default: "false", description: "Disable all inputs" },
          { name: "separatorAfter", type: "number[]", default: "-", description: "Indices after which to show a dash separator" },
          { name: "className", type: "string", default: "-", description: "Extra classes for each digit input" },
          { name: "wrapperClassName", type: "string", default: "-", description: "Extra classes for the wrapper" },
        ]}
      />
    </div>
  );
}
