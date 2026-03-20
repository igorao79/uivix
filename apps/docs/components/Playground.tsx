"use client";

import { useState } from "react";

interface PlaygroundProps {
  /** Default text */
  defaultText: string;
  /** Label for the input */
  label?: string;
  /** Render function that receives the current text */
  children: (text: string) => React.ReactNode;
  /** Extra controls to render below the text input */
  controls?: React.ReactNode;
}

export function Playground({
  defaultText,
  label = "Your text",
  children,
  controls,
}: PlaygroundProps) {
  const [text, setText] = useState(defaultText);

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
      <div className="mb-5 flex items-center justify-center min-h-[80px]">
        {children(text)}
      </div>
      <div className="border-t border-zinc-800 pt-4 space-y-3">
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-1.5">{label}</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-9 px-3 text-sm rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-colors"
            placeholder="Type your text..."
          />
        </div>
        {controls}
      </div>
    </div>
  );
}

interface SliderControlProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
}

export function SliderControl({ label, value, onChange, min, max, step = 1, suffix = "" }: SliderControlProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-xs font-medium text-zinc-500 w-20 shrink-0">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1 rounded-full appearance-none bg-zinc-700 accent-violet-500 cursor-pointer flex-1 max-w-[200px]"
      />
      <span className="text-xs text-zinc-400 tabular-nums w-16 text-right shrink-0">{value}{suffix}</span>
    </div>
  );
}
