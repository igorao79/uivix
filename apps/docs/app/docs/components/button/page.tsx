"use client";

import { useState } from "react";
import { Button } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Button } from "@igorao79/uivix";`;

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

export default function ButtonPage() {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const simulateLoading = (setter: (v: boolean) => void) => {
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Button</h1>
      <p className="text-zinc-400 mb-8">
        A versatile button with 9 variants, icons, loading state, and pill shape.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      {/* ── Variants ── */}
      <h2 className="text-xl font-semibold mb-4">Variants</h2>

      <ComponentPreview
        title="Default"
        description="The primary button style"
        code={`<Button>Default</Button>`}
      >
        <Button>Default</Button>
      </ComponentPreview>

      <ComponentPreview
        title="Secondary"
        description="A less prominent button"
        code={`<Button variant="secondary">Secondary</Button>`}
      >
        <Button variant="secondary">Secondary</Button>
      </ComponentPreview>

      <ComponentPreview
        title="Outline"
        description="A button with only a border"
        code={`<Button variant="outline">Outline</Button>`}
      >
        <Button variant="outline">Outline</Button>
      </ComponentPreview>

      <ComponentPreview
        title="Ghost"
        description="Transparent with hover effect"
        code={`<Button variant="ghost">Ghost</Button>`}
      >
        <Button variant="ghost">Ghost</Button>
      </ComponentPreview>

      <ComponentPreview
        title="Destructive"
        description="For dangerous or destructive actions"
        code={`<Button variant="destructive">Delete</Button>`}
      >
        <Button variant="destructive">Delete</Button>
      </ComponentPreview>

      <ComponentPreview
        title="Link"
        description="Renders as an inline link"
        code={`<Button variant="link">Link Button</Button>`}
      >
        <Button variant="link">Link Button</Button>
      </ComponentPreview>

      <ComponentPreview
        title="Gradient"
        description="A gradient background from violet to indigo"
        code={`<Button variant="gradient">Gradient</Button>`}
      >
        <Button variant="gradient">Gradient</Button>
      </ComponentPreview>

      <ComponentPreview
        title="Glow"
        description="A button with a glowing purple shadow"
        code={`<Button variant="glow">Glow</Button>`}
      >
        <Button variant="glow">Glow</Button>
      </ComponentPreview>

      <ComponentPreview
        title="Soft"
        description="A soft, muted background with matching text"
        code={`<Button variant="soft">Soft</Button>`}
      >
        <Button variant="soft">Soft</Button>
      </ComponentPreview>

      <ComponentPreview
        title="All Variants"
        description="Overview of all variants side-by-side"
        code={`<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>
<Button variant="gradient">Gradient</Button>
<Button variant="glow">Glow</Button>
<Button variant="soft">Soft</Button>`}
      >
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
          <Button variant="gradient">Gradient</Button>
          <Button variant="glow">Glow</Button>
          <Button variant="soft">Soft</Button>
        </div>
      </ComponentPreview>

      {/* ── Sizes ── */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Sizes</h2>

      <ComponentPreview
        title="All Sizes"
        description="Small, medium, and large"
        code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
      >
        <div className="flex items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Icon Button"
        description="Square button for icons"
        code={`<Button size="icon" variant="outline">
  <PlusIcon />
</Button>`}
      >
        <div className="flex items-center gap-3">
          <Button size="icon" variant="outline"><PlusIcon /></Button>
          <Button size="icon" variant="ghost"><HeartIcon /></Button>
          <Button size="icon" variant="destructive"><TrashIcon /></Button>
          <Button size="icon" variant="gradient"><PlusIcon /></Button>
        </div>
      </ComponentPreview>

      {/* ── Pill ── */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Pill Shape</h2>

      <ComponentPreview
        title="Pill Buttons"
        description="Fully rounded buttons with pill prop"
        code={`<Button pill>Default Pill</Button>
<Button pill variant="gradient">Gradient Pill</Button>
<Button pill variant="outline">Outline Pill</Button>
<Button pill variant="glow">Glow Pill</Button>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button pill>Default Pill</Button>
          <Button pill variant="gradient">Gradient Pill</Button>
          <Button pill variant="outline">Outline Pill</Button>
          <Button pill variant="glow">Glow Pill</Button>
        </div>
      </ComponentPreview>

      {/* ── With Icons ── */}
      <h2 className="text-xl font-semibold mb-4 mt-8">With Icons</h2>

      <ComponentPreview
        title="Left Icon"
        description="Icon before the text"
        code={`<Button leftIcon={<HeartIcon />}>Like</Button>`}
      >
        <div className="flex flex-wrap gap-3">
          <Button leftIcon={<HeartIcon />}>Like</Button>
          <Button variant="gradient" leftIcon={<DownloadIcon />}>Download</Button>
          <Button variant="destructive" leftIcon={<TrashIcon />}>Delete</Button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Right Icon"
        description="Icon after the text"
        code={`<Button rightIcon={<ArrowIcon />}>Continue</Button>`}
      >
        <div className="flex flex-wrap gap-3">
          <Button rightIcon={<ArrowIcon />}>Continue</Button>
          <Button variant="outline" rightIcon={<ArrowIcon />}>Next Step</Button>
          <Button variant="gradient" rightIcon={<ArrowIcon />}>Get Started</Button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Both Icons"
        description="Icons on both sides"
        code={`<Button leftIcon={<PlusIcon />} rightIcon={<ArrowIcon />}>
  Create & Continue
</Button>`}
      >
        <Button leftIcon={<PlusIcon />} rightIcon={<ArrowIcon />}>
          Create & Continue
        </Button>
      </ComponentPreview>

      {/* ── Loading ── */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Loading State</h2>

      <ComponentPreview
        title="Loading"
        description="Shows a spinner and disables the button. Click to try!"
        code={`<Button loading>Processing...</Button>
<Button loading variant="gradient">Saving...</Button>`}
      >
        <div className="flex flex-wrap gap-3">
          <Button loading>Processing...</Button>
          <Button loading variant="gradient">Saving...</Button>
          <Button loading variant="outline">Loading...</Button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Interactive Loading"
        description="Click the button to simulate a loading state"
        code={`const [loading, setLoading] = useState(false);

<Button
  loading={loading}
  onClick={() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }}
>
  {loading ? "Saving..." : "Save Changes"}
</Button>`}
      >
        <div className="flex flex-wrap gap-3">
          <Button
            loading={loading1}
            onClick={() => simulateLoading(setLoading1)}
          >
            {loading1 ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            variant="gradient"
            loading={loading2}
            onClick={() => simulateLoading(setLoading2)}
          >
            {loading2 ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </ComponentPreview>

      {/* ── States ── */}
      <h2 className="text-xl font-semibold mb-4 mt-8">States</h2>

      <ComponentPreview
        title="Disabled"
        description="Button in disabled state"
        code={`<Button disabled>Disabled</Button>`}
      >
        <div className="flex flex-wrap gap-3">
          <Button disabled>Disabled</Button>
          <Button disabled variant="gradient">Disabled</Button>
          <Button disabled variant="outline">Disabled</Button>
        </div>
      </ComponentPreview>

      {/* ── Combinations ── */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Combinations</h2>

      <ComponentPreview
        title="Mixed Examples"
        description="Various combinations of variants, sizes, and features"
        code={`<Button variant="gradient" pill leftIcon={<HeartIcon />} size="lg">
  Subscribe
</Button>
<Button variant="glow" pill rightIcon={<ArrowIcon />}>
  Explore
</Button>
<Button variant="soft" pill leftIcon={<DownloadIcon />} size="sm">
  Download
</Button>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="gradient" pill leftIcon={<HeartIcon />} size="lg">
            Subscribe
          </Button>
          <Button variant="glow" pill rightIcon={<ArrowIcon />}>
            Explore
          </Button>
          <Button variant="soft" pill leftIcon={<DownloadIcon />} size="sm">
            Download
          </Button>
          <Button variant="outline" pill size="sm" leftIcon={<PlusIcon />}>
            Add Item
          </Button>
        </div>
      </ComponentPreview>

      {/* ── Props ── */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          {
            name: "variant",
            type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link" | "gradient" | "glow" | "soft"',
            default: '"default"',
            description: "The visual style of the button",
          },
          {
            name: "size",
            type: '"sm" | "md" | "lg" | "icon"',
            default: '"md"',
            description: "The size of the button",
          },
          {
            name: "pill",
            type: "boolean",
            default: "false",
            description: "Make the button fully rounded (pill shape)",
          },
          {
            name: "loading",
            type: "boolean",
            default: "false",
            description: "Show a spinner and disable the button",
          },
          {
            name: "leftIcon",
            type: "ReactNode",
            default: "-",
            description: "Icon element shown before the children",
          },
          {
            name: "rightIcon",
            type: "ReactNode",
            default: "-",
            description: "Icon element shown after the children",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Whether the button is disabled",
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
