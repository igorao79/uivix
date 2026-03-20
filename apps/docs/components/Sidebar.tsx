"use client";

import { useState } from "react";
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
    name: "Typography",
    items: [
      { name: "Label", href: "/docs/components/label" },
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
        className={`overflow-hidden transition-all duration-200 ease-out ${
          open ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
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

export function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-zinc-800 h-screen sticky top-0 overflow-y-auto p-6">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
          UIXY
        </span>
      </Link>

      <nav>
        <div className="mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
            Getting Started
          </h4>
          <ul className="space-y-1">
            <li>
              <Link
                href="/docs/components/button"
                className="block text-sm text-zinc-400 hover:text-zinc-100 transition-colors py-1 px-3"
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
    </aside>
  );
}
