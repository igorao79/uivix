"use client";

import { useState } from "react";
import { Input, Label } from "uixy";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Input } from "uixy";`;

export default function InputPage() {
  const [email, setEmail] = useState("");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Input</h1>
      <p className="text-zinc-400 mb-8">
        A flexible text input with 6 variants: default, filled, underline, floating, ghost, and glow.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      {/* ── Variants ── */}
      <h2 className="text-xl font-semibold mb-4">Variants</h2>

      <ComponentPreview
        title="Default"
        description="Standard bordered input"
        code={`<Input placeholder="Default input..." />`}
      >
        <Input placeholder="Default input..." />
      </ComponentPreview>

      <ComponentPreview
        title="Filled"
        description="Input with a filled background"
        code={`<Input variant="filled" placeholder="Filled input..." />`}
      >
        <Input variant="filled" placeholder="Filled input..." />
      </ComponentPreview>

      <ComponentPreview
        title="Underline"
        description="Input with only a bottom border"
        code={`<Input variant="underline" placeholder="Underline input..." />`}
      >
        <Input variant="underline" placeholder="Underline input..." />
      </ComponentPreview>

      <ComponentPreview
        title="Ghost"
        description="Invisible border, background appears on hover/focus"
        code={`<Input variant="ghost" placeholder="Ghost input..." />`}
      >
        <Input variant="ghost" placeholder="Ghost input..." />
      </ComponentPreview>

      <ComponentPreview
        title="Glow"
        description="Glowing violet border effect on focus"
        code={`<Input variant="glow" placeholder="Focus me for glow..." />`}
      >
        <Input variant="glow" placeholder="Focus me for glow..." />
      </ComponentPreview>

      {/* ── Floating Label ── */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Floating Label</h2>

      <ComponentPreview
        title="Floating"
        description="Label floats up on focus/input"
        code={`<Input variant="floating" label="Email" />`}
      >
        <div className="w-full max-w-sm">
          <Input variant="floating" label="Email" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Floating - All Sizes"
        description="Small, medium, and large"
        code={`<Input variant="floating" label="Small" inputSize="sm" />
<Input variant="floating" label="Medium" inputSize="md" />
<Input variant="floating" label="Large" inputSize="lg" />`}
      >
        <div className="space-y-4 w-full max-w-sm">
          <Input variant="floating" label="Small" inputSize="sm" />
          <Input variant="floating" label="Medium" inputSize="md" />
          <Input variant="floating" label="Large" inputSize="lg" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Floating - Controlled"
        description="Controlled floating input"
        code={`const [email, setEmail] = useState("");
<Input
  variant="floating"
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>`}
      >
        <div className="w-full max-w-sm">
          <Input
            variant="floating"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-xs text-zinc-500 mt-2">Value: {email || "(empty)"}</p>
        </div>
      </ComponentPreview>

      {/* ── With Icons ── */}
      <h2 className="text-xl font-semibold mb-4 mt-8">With Icons</h2>

      <ComponentPreview
        title="Left Icon"
        description="Input with an icon on the left"
        code={`<Input
  placeholder="Email address"
  leftIcon={
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  }
/>`}
      >
        <div className="w-full max-w-sm">
          <Input
            placeholder="Email address"
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            }
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Right Icon"
        description="Input with an icon on the right"
        code={`<Input
  placeholder="Amount"
  rightIcon={<span className="text-xs font-medium">USD</span>}
/>`}
      >
        <div className="w-full max-w-sm">
          <Input
            placeholder="Amount"
            rightIcon={<span className="text-xs font-medium">USD</span>}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Both Icons"
        description="Input with icons on both sides"
        code={`<Input
  placeholder="Search users..."
  leftIcon={<svg ...>...</svg>}
  rightIcon={<svg ...>...</svg>}
/>`}
      >
        <div className="w-full max-w-sm">
          <Input
            placeholder="Search users..."
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            }
            rightIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 3Z" />
              </svg>
            }
          />
        </div>
      </ComponentPreview>

      {/* ── Sizes ── */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Sizes</h2>

      <ComponentPreview
        title="All Sizes"
        description="Small, medium, and large"
        code={`<Input inputSize="sm" placeholder="Small" />
<Input inputSize="md" placeholder="Medium" />
<Input inputSize="lg" placeholder="Large" />`}
      >
        <div className="space-y-3 w-full max-w-sm">
          <Input inputSize="sm" placeholder="Small" />
          <Input inputSize="md" placeholder="Medium" />
          <Input inputSize="lg" placeholder="Large" />
        </div>
      </ComponentPreview>

      {/* ── States ── */}
      <h2 className="text-xl font-semibold mb-4 mt-8">States</h2>

      <ComponentPreview
        title="Error"
        description="Input with error styling"
        code={`<Input error placeholder="Error state..." />`}
      >
        <Input error placeholder="Error state..." />
      </ComponentPreview>

      <ComponentPreview
        title="Disabled"
        description="Input in disabled state"
        code={`<Input disabled placeholder="Disabled..." />`}
      >
        <Input disabled placeholder="Disabled..." />
      </ComponentPreview>

      {/* ── With Label ── */}
      <h2 className="text-xl font-semibold mb-4 mt-8">With Label</h2>

      <ComponentPreview
        title="Input with Label"
        description="Combining Input with Label component"
        code={`<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="you@example.com" />`}
      >
        <div className="space-y-2 w-full max-w-sm">
          <Label htmlFor="email-label">Email</Label>
          <Input id="email-label" type="email" placeholder="you@example.com" />
        </div>
      </ComponentPreview>

      {/* ── Props ── */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "variant", type: '"default" | "filled" | "underline" | "floating" | "ghost" | "glow"', default: '"default"', description: "The visual style of the input" },
          { name: "inputSize", type: '"sm" | "md" | "lg"', default: '"md"', description: "The size of the input" },
          { name: "label", type: "string", default: "-", description: 'Floating label text (required for variant="floating")' },
          { name: "leftIcon", type: "ReactNode", default: "-", description: "Icon element shown on the left" },
          { name: "rightIcon", type: "ReactNode", default: "-", description: "Icon element shown on the right" },
          { name: "error", type: "boolean", default: "false", description: "Show error styling" },
          { name: "disabled", type: "boolean", default: "false", description: "Disable the input" },
          { name: "labelClassName", type: "string", default: "-", description: "Extra classes for the floating label" },
          { name: "wrapperClassName", type: "string", default: "-", description: "Extra classes for the wrapper div" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
