import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            UIXY
          </span>
        </h1>
        <p className="text-xl text-zinc-400 mb-8">
          A modern UI component library for React + Tailwind CSS.
          <br />
          Simple. Clean. Ready to use.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/docs/components/button"
            className="inline-flex items-center justify-center h-12 px-8 font-medium text-sm rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors"
          >
            Browse Components
          </Link>
          <Link
            href="https://www.npmjs.com/package/uixy"
            target="_blank"
            className="inline-flex items-center justify-center h-12 px-8 font-medium text-sm rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            npm install uixy
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 text-left">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-zinc-100">Tailwind Native</h3>
            <p className="text-sm text-zinc-400">
              Built entirely with Tailwind CSS. No custom CSS, just utility classes you already know.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-zinc-100">Fully Typed</h3>
            <p className="text-sm text-zinc-400">
              TypeScript-first with full type definitions and IntelliSense support.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-zinc-100">Customizable</h3>
            <p className="text-sm text-zinc-400">
              Override any style with className. Every component supports ref forwarding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
