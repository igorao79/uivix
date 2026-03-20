"use client";

import { useState } from "react";
import { CodeBlock } from "./CodeBlock";

interface ComponentPreviewProps {
  title: string;
  description?: string;
  code: string;
  children: React.ReactNode;
}

export function ComponentPreview({ title, description, code, children }: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="mb-8 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">{title}</h3>
            {description && (
              <p className="text-xs text-zinc-500 mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={() => setShowCode(!showCode)}
            className="text-xs px-3 py-1 rounded-md border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors"
          >
            {showCode ? "Preview" : "Code"}
          </button>
        </div>
      </div>
      {showCode ? (
        <CodeBlock code={code} />
      ) : (
        <div className="p-6 bg-zinc-900/50 flex items-center gap-4 flex-wrap">
          {children}
        </div>
      )}
    </div>
  );
}
