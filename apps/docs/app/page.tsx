"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Button,
  AuroraBackground,
  StarfieldBackground,
  ParticleBackground,
  BokehBackground,
  WaveBackground,
} from "@igorao79/uivix";

const backgrounds = [
  { key: "aurora", component: <AuroraBackground className="absolute inset-0 w-full h-full" /> },
  { key: "starfield", component: <StarfieldBackground className="absolute inset-0 w-full h-full" speed={0.5} /> },
  {
    key: "particles",
    component: (
      <ParticleBackground
        items={["React", "Tailwind", "TypeScript", "UI", "Next.js", "npm", "CSS", "JSX"]}
        className="absolute inset-0 w-full h-full"
        speed={0.3}
      />
    ),
  },
  { key: "bokeh", component: <BokehBackground className="absolute inset-0 w-full h-full" shape="mixed" count={12} /> },
  { key: "wave", component: <WaveBackground className="absolute inset-0 w-full h-full" speed={0.8} /> },
];

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function HomePage() {
  const [bgIndex, setBgIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setOpacity(0);
      // After fade, switch and fade in
      setTimeout(() => {
        setBgIndex((prev) => (prev + 1) % backgrounds.length);
        setOpacity(1);
      }, 800);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Animated background */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{ opacity }}
      >
        {backgrounds[bgIndex].component}
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        <h1 className="text-6xl font-bold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            UIVIX
          </span>
        </h1>
        <p className="text-xl text-zinc-300 mb-8">
          A modern UI component library for React + Tailwind CSS.
          <br />
          Simple. Clean. Ready to use.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/docs/components/button">
            <Button variant="gradient" size="lg" pill>
              Browse Components
            </Button>
          </Link>
          <Link href="https://www.npmjs.com/package/@igorao79/uivix" target="_blank">
            <Button variant="outline" size="lg" pill>
              npm install @igorao79/uivix
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 text-left">
          <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10">
            <h3 className="text-lg font-semibold mb-2 text-zinc-100">Tailwind Native</h3>
            <p className="text-sm text-zinc-400">
              Built entirely with Tailwind CSS. No custom CSS, just utility classes you already know.
            </p>
          </div>
          <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10">
            <h3 className="text-lg font-semibold mb-2 text-zinc-100">Fully Typed</h3>
            <p className="text-sm text-zinc-400">
              TypeScript-first with full type definitions and IntelliSense support.
            </p>
          </div>
          <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10">
            <h3 className="text-lg font-semibold mb-2 text-zinc-100">Customizable</h3>
            <p className="text-sm text-zinc-400">
              Override any style with className. Every component supports ref forwarding.
            </p>
          </div>
        </div>

        {/* GitHub link */}
        <div className="mt-12">
          <a
            href="https://github.com/igorao79"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <GitHubIcon />
            <span>igorao79</span>
          </a>
        </div>
      </div>
    </div>
  );
}
