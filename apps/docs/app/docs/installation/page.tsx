import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";

const installCode = `npm install @igorao79/uivix`;
const importExample = `import { Button, Input, GradientText } from "@igorao79/uivix";`;

const componentCategories = [
  {
    name: "Button",
    description: "Versatile button with 9 variants, icons, loading state, and pill shape.",
    href: "/docs/components/button",
  },
  {
    name: "Input",
    description: "Text inputs, password fields, search bars, and OTP inputs.",
    href: "/docs/components/input",
  },
  {
    name: "Text Animations",
    description: "Typewriter, gradient, glitch, shimmer, wave, blur, and more.",
    href: "/docs/components/typewriter-text",
  },
  {
    name: "Card",
    description: "Flexible card component for content containers.",
    href: "/docs/components/card",
  },
  {
    name: "Backgrounds",
    description: "Particle, aurora, grid, starfield, waves, and many more animated backgrounds.",
    href: "/docs/components/particle-background",
  },
];

export default function InstallationPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Installation</h1>
      <p className="text-zinc-400 mb-8">
        Get started with UIVIX by installing the package in your project.
      </p>

      <h2 className="text-xl font-semibold mb-4">Install</h2>
      <CodeBlock code={installCode} language="bash" />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Import Components</h2>
      <p className="text-zinc-400 mb-4">
        Import any component directly from the <code className="text-violet-400 bg-zinc-800 px-1.5 py-0.5 rounded text-sm">@igorao79/uivix</code> package.
      </p>
      <CodeBlock code={importExample} />
      <div className="mb-12" />

      <h2 className="text-xl font-semibold mb-6">Explore Components</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {componentCategories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="group block rounded-lg border border-zinc-800 p-5 transition-all hover:border-violet-500/50 hover:bg-zinc-900/50"
          >
            <h3 className="text-base font-semibold text-zinc-100 mb-1 group-hover:text-violet-400 transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
