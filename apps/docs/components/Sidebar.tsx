"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
}

interface NavCategory {
  name: string;
  items: NavItem[];
}

const categories: NavCategory[] = [
  {
    name: "Button",
    items: [
      { name: "Button", href: "/docs/components/button" },
    ],
  },
  {
    name: "Input",
    items: [
      { name: "Input", href: "/docs/components/input" },
      { name: "Password Input", href: "/docs/components/password-input" },
      { name: "Search Input", href: "/docs/components/search-input" },
      { name: "OTP Input", href: "/docs/components/otp-input" },
    ],
  },
  {
    name: "Text Animations",
    items: [
      { name: "Typewriter", href: "/docs/components/typewriter-text" },
      { name: "Gradient Text", href: "/docs/components/gradient-text" },
      { name: "Glitch Text", href: "/docs/components/glitch-text" },
      { name: "Shimmer Text", href: "/docs/components/shimmer-text" },
      { name: "Wave Text", href: "/docs/components/wave-text" },
      { name: "Blur Text", href: "/docs/components/blur-text" },
      { name: "Counter", href: "/docs/components/counter-text" },
      { name: "Media Text", href: "/docs/components/media-text" },
      { name: "Sparkles Text", href: "/docs/components/sparkles-text" },
      { name: "Highlight Text", href: "/docs/components/highlight-text" },
    ],
  },
  {
    name: "Card",
    items: [
      { name: "Card", href: "/docs/components/card" },
    ],
  },
  {
    name: "Backgrounds",
    items: [
      { name: "Particle", href: "/docs/components/particle-background" },
      { name: "Aurora", href: "/docs/components/aurora-background" },
      { name: "Grid", href: "/docs/components/grid-background" },
      { name: "Starfield", href: "/docs/components/starfield-background" },
      { name: "Waves", href: "/docs/components/wave-background" },
      { name: "Gradient Mesh", href: "/docs/components/gradient-mesh-background" },
      { name: "Matrix Rain", href: "/docs/components/matrix-rain-background" },
      { name: "Bokeh", href: "/docs/components/bokeh-background" },
      { name: "Pixel Art", href: "/docs/components/pixel-background" },
      { name: "Ripple", href: "/docs/components/ripple-background" },
      { name: "Dot Pattern", href: "/docs/components/dot-pattern-background" },
      { name: "Retro Grid", href: "/docs/components/retro-grid-background" },
      { name: "Meteors", href: "/docs/components/meteor-background" },
      { name: "Beams", href: "/docs/components/beam-background" },
      { name: "Noise", href: "/docs/components/noise-background" },
      { name: "Geometric", href: "/docs/components/geometric-background" },
      { name: "Flow Field", href: "/docs/components/flow-field-background" },
    ],
  },
  {
    name: "Other",
    items: [
      { name: "Badge", href: "/docs/components/badge" },
      { name: "Tooltip", href: "/docs/components/tooltip" },
      { name: "Toggle", href: "/docs/components/toggle" },
      { name: "Separator", href: "/docs/components/separator" },
      { name: "Skeleton", href: "/docs/components/skeleton" },
      { name: "Progress", href: "/docs/components/progress" },
      { name: "Avatar", href: "/docs/components/avatar" },
      { name: "Marquee", href: "/docs/components/marquee" },
      { name: "Watermark", href: "/docs/components/watermark" },
    ],
  },
];

function CategoryGroup({ category }: { category: NavCategory }) {
  const pathname = usePathname();
  const hasActiveChild = category.items.some((item) => pathname === item.href);
  const [open, setOpen] = useState(hasActiveChild);

  const isSingle = category.items.length === 1;

  // If category has only one item, render as a direct link
  if (isSingle) {
    const item = category.items[0];
    const isActive = pathname === item.href;
    return (
      <li>
        <Link
          href={item.href}
          className={`block text-sm py-1.5 px-3 rounded-md transition-colors ${
            isActive
              ? "bg-violet-600/20 text-violet-400 border-l-2 border-violet-400"
              : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
          }`}
        >
          {category.name}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between w-full text-sm py-1.5 px-3 rounded-md transition-colors ${
          hasActiveChild
            ? "text-violet-400"
            : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
        }`}
      >
        <span>{category.name}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            open ? "rotate-90" : ""
          }`}
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <ul
        className={`${
          open ? "opacity-100 mt-1" : "hidden opacity-0"
        }`}
      >
        {category.items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block text-sm py-1.5 pl-6 pr-3 rounded-md transition-colors relative ${
                  isActive
                    ? "bg-violet-600/20 text-violet-400"
                    : "text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800/50"
                }`}
              >
                {isActive && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-violet-400" />
                )}
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

function SidebarContent() {
  const pathname = usePathname();
  return (
    <nav>
      <div className="mb-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
          Getting Started
        </h4>
        <ul className="space-y-1">
          <li>
            <Link
              href="/docs/installation"
              className={`block text-sm transition-colors py-1 px-3 rounded-md ${
                pathname === "/docs/installation"
                  ? "bg-violet-600/20 text-violet-400 border-l-2 border-violet-400"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
              }`}
            >
              Installation
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
          Components
        </h4>
        <ul className="space-y-1">
          {categories.map((category) => (
            <CategoryGroup key={category.name} category={category} />
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile sidebar on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white transition-colors"
        aria-label="Toggle menu"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
          {open ? (
            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar - desktop: static, mobile: slide-in */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40
          w-64 shrink-0 border-r border-zinc-800 h-screen overflow-y-auto p-6 bg-zinc-950
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <Link href="/" className="flex items-center gap-2 mb-8">
          <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            UIVIX
          </span>
        </Link>
        <SidebarContent />
      </aside>
    </>
  );
}
