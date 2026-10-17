"use client";

import { useState } from "react";

import { CommandPalette, Button } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { CommandPalette, Button } from "@igorao79/uivix";`;

const items = [
  { id: "new", group: "Actions", label: "Create new project", shortcut: "N", onSelect: () => {} },
  { id: "invite", group: "Actions", label: "Invite teammate", keywords: "add user", onSelect: () => {} },
  { id: "deploy", group: "Actions", label: "Deploy to production", shortcut: "D", onSelect: () => {} },
  { id: "docs", group: "Navigate", label: "Go to documentation", onSelect: () => {} },
  { id: "settings", group: "Navigate", label: "Open settings", shortcut: ",", onSelect: () => {} },
  { id: "theme", group: "Preferences", label: "Toggle dark mode", onSelect: () => {} },
];

export default function CommandPalettePage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Command Palette</h1>
      <p className="text-zinc-400 mb-8">Spotlight-style ⌘K menu with subsequence search, groups, shortcuts and full keyboard navigation.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Default" description="Click the button or press Ctrl/⌘ + K" code={`<CommandPalette open={open} onClose={() => setOpen(false)} onOpenChange={setOpen} items={items} />`}>
        <Button variant="outline" onClick={() => setOpen(true)}>Open palette <span className="ml-2 text-xs text-zinc-500">⌘K</span></Button>
        <CommandPalette open={open} onClose={() => setOpen(false)} onOpenChange={setOpen} items={items} />
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "open", type: "boolean", default: "-", description: "Whether the palette is visible" },
          { name: "onClose", type: "() => void", default: "-", description: "Called on Escape, backdrop click or after a selection" },
          { name: "items", type: "CommandItem[]", default: "-", description: "{ id, label, keywords?, group?, icon?, shortcut?, onSelect }" },
          { name: "placeholder", type: "string", default: "\"Type a command or search\u2026\"", description: "Input placeholder" },
          { name: "hotkey", type: "boolean", default: "true", description: "Toggle with Cmd/Ctrl+K (requires onOpenChange)" },
          { name: "onOpenChange", type: "(open: boolean) => void", default: "-", description: "Called by the hotkey" },
        ]}
      />
    </div>
  );
}
