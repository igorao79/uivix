"use client";

import { Label, Input } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Label } from "@igorao79/uivix";`;

export default function LabelPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Label</h1>
      <p className="text-zinc-400 mb-8">
        A label component for form inputs with size and required indicator support.
      </p>

      {/* Import */}
      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      {/* Sizes */}
      <h2 className="text-xl font-semibold mb-4">Sizes</h2>

      <ComponentPreview
        title="Small"
        description="Small label text"
        code={`<Label size="sm">Small Label</Label>`}
      >
        <Label size="sm">Small Label</Label>
      </ComponentPreview>

      <ComponentPreview
        title="Medium (Default)"
        description="Default label size"
        code={`<Label>Medium Label</Label>`}
      >
        <Label>Medium Label</Label>
      </ComponentPreview>

      <ComponentPreview
        title="Large"
        description="Large label text"
        code={`<Label size="lg">Large Label</Label>`}
      >
        <Label size="lg">Large Label</Label>
      </ComponentPreview>

      {/* Required */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Required</h2>

      <ComponentPreview
        title="Required Label"
        description="Shows a red asterisk indicator"
        code={`<Label required>Required Field</Label>`}
      >
        <Label required>Required Field</Label>
      </ComponentPreview>

      {/* With Input */}
      <h2 className="text-xl font-semibold mb-4 mt-8">With Input</h2>

      <ComponentPreview
        title="Form Field"
        description="Label paired with an Input component"
        code={`<div className="space-y-2">
  <Label htmlFor="username" required>Username</Label>
  <Input id="username" placeholder="Enter username..." />
</div>`}
      >
        <div className="space-y-2 w-full max-w-sm">
          <Label htmlFor="username" required>Username</Label>
          <Input id="username" placeholder="Enter username..." />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Full Form Example"
        description="Multiple labeled inputs in a form"
        code={`<form className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="name">Full Name</Label>
    <Input id="name" placeholder="John Doe" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="email" required>Email</Label>
    <Input id="email" type="email" placeholder="john@example.com" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="password" required>Password</Label>
    <Input id="password" type="password" placeholder="••••••••" />
  </div>
</form>`}
      >
        <form className="space-y-4 w-full max-w-sm">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email2" required>Email</Label>
            <Input id="email2" type="email" placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" required>Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
        </form>
      </ComponentPreview>

      {/* Props */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          {
            name: "size",
            type: '"sm" | "md" | "lg"',
            default: '"md"',
            description: "The text size of the label",
          },
          {
            name: "required",
            type: "boolean",
            default: "false",
            description: "Shows a red asterisk after the label text",
          },
          {
            name: "htmlFor",
            type: "string",
            default: "-",
            description: "The ID of the form element the label is associated with",
          },
          {
            name: "className",
            type: "string",
            default: "-",
            description: "Additional CSS classes to apply",
          },
        ]}
      />
    </div>
  );
}
