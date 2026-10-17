"use client";

import React, { useState } from "react";
import { cn } from "../../utils/cn";

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Allow several items open at once */
  multiple?: boolean;
  /** Ids open by default */
  defaultOpen?: string[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  multiple = false,
  defaultOpen = [],
  className,
}) => {
  const [open, setOpen] = useState<string[]>(defaultOpen);

  const toggle = (id: string) =>
    setOpen((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : multiple
        ? [...prev, id]
        : [id]
    );

  return (
    <div
      className={cn(
        "w-full divide-y divide-zinc-800 rounded-lg border border-zinc-800 bg-zinc-900/50",
        className
      )}
    >
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-zinc-200 hover:text-white transition-colors"
            >
              {item.title}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className={cn(
                  "h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-300",
                  isOpen && "rotate-180 text-violet-400"
                )}
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 text-sm text-zinc-400">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Accordion.displayName = "Accordion";
