"use client";

import { useState } from "react";

export function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="code-block">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-600"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
