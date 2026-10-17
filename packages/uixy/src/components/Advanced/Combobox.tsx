"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../utils/cn";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

/** Searchable select with keyboard navigation. */
export const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  defaultValue = null,
  onChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyText = "Nothing found.",
  className,
}) => {
  const [internal, setInternal] = useState<string | null>(defaultValue);
  const current = value !== undefined ? value : internal;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase())),
    [options, query]
  );

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const choose = (o: ComboboxOption) => {
    setInternal(o.value);
    onChange?.(o.value);
    setOpen(false);
    setQuery("");
  };

  const selected = options.find((o) => o.value === current);

  return (
    <div ref={root} className={cn("relative w-64", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-zinc-700 bg-zinc-800 px-3 text-sm text-zinc-100 transition-colors hover:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
      >
        <span className={selected ? "" : "text-zinc-500"}>{selected?.label ?? placeholder}</span>
        <svg viewBox="0 0 24 24" className={cn("h-4 w-4 text-zinc-500 transition-transform", open && "rotate-180")} fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-md border border-zinc-700 bg-zinc-900 shadow-xl">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
              else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
              else if (e.key === "Enter" && filtered[active]) { e.preventDefault(); choose(filtered[active]); }
              else if (e.key === "Escape") setOpen(false);
            }}
            placeholder={searchPlaceholder}
            className="h-9 w-full border-b border-zinc-800 bg-transparent px-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
          />
          <ul role="listbox" className="max-h-56 overflow-y-auto p-1">
            {filtered.length === 0 && <li className="px-3 py-4 text-center text-sm text-zinc-500">{emptyText}</li>}
            {filtered.map((o, i) => (
              <li
                key={o.value}
                role="option"
                aria-selected={o.value === current}
                onMouseMove={() => setActive(i)}
                onClick={() => choose(o)}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded px-3 py-1.5 text-sm",
                  i === active ? "bg-violet-500/15 text-violet-200" : "text-zinc-300"
                )}
              >
                {o.label}
                {o.value === current && (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Combobox.displayName = "Combobox";
