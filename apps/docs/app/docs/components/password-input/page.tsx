"use client";

import { PasswordInput } from "uixy";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { PasswordInput } from "uixy";`;

export default function PasswordInputPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Password Input</h1>
      <p className="text-zinc-400 mb-8">
        A password input with a built-in show/hide toggle button.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      {/* Basic */}
      <h2 className="text-xl font-semibold mb-4">Basic Usage</h2>

      <ComponentPreview
        title="Default"
        description="Click the eye icon to toggle visibility"
        code={`<PasswordInput placeholder="Enter password..." />`}
      >
        <div className="w-full max-w-sm">
          <PasswordInput placeholder="Enter password..." />
        </div>
      </ComponentPreview>

      {/* Sizes */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Sizes</h2>

      <ComponentPreview
        title="All Sizes"
        description="Small, medium, and large"
        code={`<PasswordInput inputSize="sm" placeholder="Small" />
<PasswordInput inputSize="md" placeholder="Medium" />
<PasswordInput inputSize="lg" placeholder="Large" />`}
      >
        <div className="space-y-3 w-full max-w-sm">
          <PasswordInput inputSize="sm" placeholder="Small" />
          <PasswordInput inputSize="md" placeholder="Medium" />
          <PasswordInput inputSize="lg" placeholder="Large" />
        </div>
      </ComponentPreview>

      {/* States */}
      <h2 className="text-xl font-semibold mb-4 mt-8">States</h2>

      <ComponentPreview
        title="Error"
        description="Password input with error styling"
        code={`<PasswordInput error placeholder="Invalid password" />`}
      >
        <div className="w-full max-w-sm">
          <PasswordInput error placeholder="Invalid password" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Disabled"
        description="Disabled password input"
        code={`<PasswordInput disabled placeholder="Disabled" />`}
      >
        <div className="w-full max-w-sm">
          <PasswordInput disabled placeholder="Disabled" />
        </div>
      </ComponentPreview>

      {/* Props */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "inputSize", type: '"sm" | "md" | "lg"', default: '"md"', description: "The size of the input" },
          { name: "error", type: "boolean", default: "false", description: "Show error styling" },
          { name: "disabled", type: "boolean", default: "false", description: "Disable the input" },
          { name: "wrapperClassName", type: "string", default: "-", description: "Extra classes for the wrapper div" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the input" },
        ]}
      />
    </div>
  );
}
