"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";

export interface CommandItem {
  id: string;
  label: string;
  /** Extra words used for search */
  keywords?: string;
  /** Group heading */
  group?: string;
  icon?: React.ReactNode;
  /** Right-aligned hint, e.g. "⌘N" */
  shortcut?: string;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
  /** Toggle with Cmd/Ctrl+K via onOpenChange */
  hotkey?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** Spotlight-style command menu with fuzzy filtering and keyboard navigation. */
export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onClose,
  items,
  placeholder = "Type a command or search…",
  hotkey = true,
  onOpenChange,
}) => {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!hotkey || !onOpenChange) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [hotkey, open, onOpenChange]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    // subsequence match so "gth" finds "Go to Home"
    const match = (text: string) => {
      let i = 0;
      for (const ch of text.toLowerCase()) if (ch === q[i]) i++;
      return i === q.length;
    };
    return items.filter((it) => match(`${it.label} ${it.keywords ?? ""}`));
  }, [items, query]);

  useEffect(() => setActive(0), [query]);

  const run = (item?: CommandItem) => {
    if (!item) return;
    onClose();
    item.onSelect();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (filtered.length ? (a + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (filtered.length ? (a - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      run(filtered[active]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!mounted || !open) return null;

  let lastGroup: string | undefined;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]" onKeyDown={onKeyDown}>
      <style>{`@keyframes uixy-cmd-in { from { opacity: 0; transform: translateY(-8px) scale(.98); } to { opacity: 1; transform: none; } }`}</style>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl"
        style={{ animation: "uixy-cmd-in .18s ease-out" }}
      >
        <div className="flex items-center gap-3 border-b border-zinc-800 px-4">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-500" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="h-12 w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
          />
          <kbd className="rounded border border-zinc-700 px-1.5 py-0.5 text-[10px] text-zinc-500">ESC</kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-zinc-500">No results found.</li>}
          {filtered.map((item, i) => {
            const header = item.group !== lastGroup ? item.group : undefined;
            lastGroup = item.group;
            return (
              <React.Fragment key={item.id}>
                {header && <li className="px-3 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wider text-zinc-600">{header}</li>}
                <li>
                  <button
                    type="button"
                    onMouseMove={() => setActive(i)}
                    onClick={() => run(item)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      i === active ? "bg-violet-500/15 text-violet-200" : "text-zinc-300"
                    )}
                  >
                    {item.icon && <span className="h-4 w-4 shrink-0 text-zinc-500 [&>svg]:h-4 [&>svg]:w-4">{item.icon}</span>}
                    <span className="flex-1">{item.label}</span>
                    {item.shortcut && <kbd className="rounded border border-zinc-700 px-1.5 py-0.5 text-[10px] text-zinc-500">{item.shortcut}</kbd>}
                  </button>
                </li>
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </div>,
    document.body
  );
};

CommandPalette.displayName = "CommandPalette";
