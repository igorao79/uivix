"use client";

import React from "react";
import { cn } from "../../utils/cn";

export interface StepperStep {
  title: React.ReactNode;
  description?: React.ReactNode;
}

export interface StepperProps {
  steps: StepperStep[];
  /** Index of the current step; steps before it are complete */
  current: number;
  orientation?: "horizontal" | "vertical";
  /** Called when a completed step is clicked */
  onStepClick?: (index: number) => void;
  className?: string;
}

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M5 12l5 5L20 7" />
  </svg>
);

/** Progress through a multi-step flow, with animated connectors. */
export const Stepper: React.FC<StepperProps> = ({ steps, current, orientation = "horizontal", onStepClick, className }) => {
  const vertical = orientation === "vertical";

  return (
    <ol className={cn("flex", vertical ? "flex-col" : "w-full items-start", className)}>
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        const last = i === steps.length - 1;
        const clickable = done && !!onStepClick;
        return (
          <li key={i} className={cn("relative flex", vertical ? "gap-4 pb-8 last:pb-0" : "flex-1 flex-col items-center text-center")}>
            {!last && (
              <span
                aria-hidden
                className={cn(
                  "absolute overflow-hidden bg-zinc-800",
                  vertical ? "left-[15px] top-9 h-[calc(100%-2.5rem)] w-0.5" : "left-[calc(50%+1.5rem)] top-[15px] h-0.5 w-[calc(100%-3rem)]"
                )}
              >
                <span
                  className={cn(
                    "absolute inset-0 origin-left bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-transform duration-500 ease-out",
                    vertical && "origin-top bg-gradient-to-b"
                  )}
                  style={{ transform: vertical ? `scaleY(${done ? 1 : 0})` : `scaleX(${done ? 1 : 0})` }}
                />
              </span>
            )}
            <button
              type="button"
              disabled={!clickable}
              onClick={() => clickable && onStepClick!(i)}
              aria-current={active ? "step" : undefined}
              className={cn(
                "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300",
                done && "border-violet-500 bg-violet-500 text-white",
                active && "border-violet-500 bg-zinc-950 text-violet-300 shadow-[0_0_0_4px_rgba(139,92,246,0.2)]",
                !done && !active && "border-zinc-700 bg-zinc-950 text-zinc-500",
                clickable ? "cursor-pointer hover:brightness-110" : "cursor-default"
              )}
            >
              {done ? <Check /> : i + 1}
            </button>
            <div className={cn(vertical ? "pt-1" : "mt-2 px-2")}>
              <div className={cn("text-sm font-medium transition-colors", done || active ? "text-zinc-100" : "text-zinc-500")}>{step.title}</div>
              {step.description && <div className="mt-0.5 text-xs text-zinc-500">{step.description}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

Stepper.displayName = "Stepper";
