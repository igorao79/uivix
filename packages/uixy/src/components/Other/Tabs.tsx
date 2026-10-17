"use client";

import React, { useState } from "react";
import { cn } from "../../utils/cn";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  /** Initially active tab id (defaults to first) */
  defaultTab?: string;
  variant?: "underline" | "pills";
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  variant = "underline",
  className,
}) => {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const current = tabs.find((t) => t.id === active);

  return (
    <div className={cn("w-full", className)}>
      <div
        role="tablist"
        className={cn(
          "flex gap-1",
          variant === "underline"
            ? "border-b border-zinc-800"
            : "w-fit rounded-lg bg-zinc-900 p-1 border border-zinc-800"
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-all duration-200",
                variant === "underline"
                  ? cn(
                      "-mb-px border-b-2",
                      isActive
                        ? "border-violet-500 text-violet-400"
                        : "border-transparent text-zinc-500 hover:text-zinc-300"
                    )
                  : cn(
                      "rounded-md",
                      isActive
                        ? "bg-violet-500/20 text-violet-300"
                        : "text-zinc-500 hover:text-zinc-300"
                    )
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div key={active} role="tabpanel" className="pt-4 text-sm text-zinc-400 animate-[fadeIn_0.25s_ease]">
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }`}</style>
        {current?.content}
      </div>
    </div>
  );
};

Tabs.displayName = "Tabs";
