"use client";

import { Dock } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Dock } from "@igorao79/uivix";`;

const items = [
  { id: "home", label: "Home", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8v10H3z" /></svg> },
  { id: "search", label: "Search", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg> },
  { id: "mail", label: "Mail", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg> },
  { id: "music", label: "Music", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg> },
  { id: "settings", label: "Settings", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></svg> },
];

export default function DockPage() {

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dock</h1>
      <p className="text-zinc-400 mb-8">macOS-style dock whose icons magnify smoothly as the cursor approaches, with floating labels.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Default" description="Hover and slide across the icons" code={`<Dock items={[{ id: "home", label: "Home", icon: <HomeIcon /> }]} />`}>
        <div className="flex w-full justify-center pt-4"><Dock items={items} /></div>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "items", type: "DockItem[]", default: "-", description: "{ id, label, icon, onClick } for each icon" },
          { name: "size", type: "number", default: "44", description: "Base icon size in px" },
          { name: "magnification", type: "number", default: "76", description: "Max icon size at the cursor" },
          { name: "distance", type: "number", default: "120", description: "Distance over which magnification fades" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
