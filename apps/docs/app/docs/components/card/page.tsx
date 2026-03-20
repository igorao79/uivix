"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "uixy";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "uixy";`;

const variants = [
  { name: "default", label: "Default", description: "Clean card with subtle border" },
  { name: "bordered", label: "Bordered", description: "Thicker border for emphasis" },
  { name: "elevated", label: "Elevated", description: "Deep shadow for depth" },
  { name: "ghost", label: "Ghost", description: "Invisible until hovered" },
  { name: "gradient", label: "Gradient", description: "Violet-to-cyan gradient background" },
  { name: "glass", label: "Glass", description: "Frosted glassmorphism effect" },
  { name: "spotlight", label: "Spotlight", description: "Mouse-tracking light follows cursor" },
  { name: "neon", label: "Neon", description: "Glowing neon border that intensifies on hover" },
  { name: "tilt", label: "Tilt", description: "3D tilt that follows your mouse" },
  { name: "animated-border", label: "Animated Border", description: "Spinning gradient border animation" },
{ name: "noise", label: "Noise", description: "Subtle noise texture overlay" },
  { name: "lifted", label: "Lifted", description: "Lifts up with shadow on hover" },
] as const;

export default function CardPage() {
  const [activeVariant, setActiveVariant] = useState<string>("default");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Card</h1>
      <p className="text-zinc-400 mb-8">
        A versatile card container with 12 variants — from glassmorphism and neon glow to 3D tilt and animated borders.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <div className="mb-5 flex items-center justify-center min-h-[220px]">
          <Card variant={activeVariant as any} className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>This is a description of the card content.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-300">
                Some example content inside the card. Move your mouse over the card to see interactive effects.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
              <Button variant="ghost" size="sm">Cancel</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="border-t border-zinc-800 pt-4">
          <label className="block text-xs font-medium text-zinc-500 mb-2">Variant</label>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <button
                key={v.name}
                onClick={() => setActiveVariant(v.name)}
                className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                  v.name === activeVariant
                    ? "border-violet-500 bg-violet-500/20 text-violet-300"
                    : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">All Variants</h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {variants.map((v) => (
          <Card key={v.name} variant={v.name as any}>
            <CardHeader>
              <CardTitle className="text-base">{v.label}</CardTitle>
              <CardDescription>{v.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <code className="text-xs text-zinc-500 font-mono">variant=&quot;{v.name}&quot;</code>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Usage</h2>
      <CodeBlock code={`<Card variant="tilt">
  <CardHeader>
    <CardTitle>3D Tilt Card</CardTitle>
    <CardDescription>Follows your cursor</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Move your mouse over the card!</p>
  </CardContent>
  <CardFooter>
    <Button>View</Button>
  </CardFooter>
</Card>`} />

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <h3 className="text-lg font-medium text-zinc-200 mb-3">Card</h3>
      <PropsTable
        props={[
          { name: "variant", type: '"default" | "bordered" | "elevated" | "ghost" | "gradient" | "glass" | "spotlight" | "neon" | "tilt" | "animated-border" | "noise" | "lifted"', default: '"default"', description: "Card style variant" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
          { name: "children", type: "ReactNode", default: "-", description: "Card content" },
        ]}
      />
      <h3 className="text-lg font-medium text-zinc-200 mb-3 mt-6">Sub-components</h3>
      <PropsTable
        props={[
          { name: "CardHeader", type: "div", default: "-", description: "Top section with title and description" },
          { name: "CardTitle", type: "h3", default: "-", description: "Card heading" },
          { name: "CardDescription", type: "p", default: "-", description: "Secondary text below title" },
          { name: "CardContent", type: "div", default: "-", description: "Main body content" },
          { name: "CardFooter", type: "div", default: "-", description: "Bottom section, flex layout with gap" },
        ]}
      />
    </div>
  );
}
