"use client";

import { AnimatedList } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { AnimatedList } from "@igorao79/uivix";`;

const notifications = [
  { icon: "💸", title: "Payment received", body: "$240.00 from Acme Inc.", color: "bg-emerald-500/20" },
  { icon: "👤", title: "New sign-up", body: "jane@example.com joined", color: "bg-sky-500/20" },
  { icon: "💬", title: "New message", body: "“Love the new components!”", color: "bg-violet-500/20" },
  { icon: "🚀", title: "Deploy finished", body: "uivix-docs is live", color: "bg-orange-500/20" },
  { icon: "⭐", title: "New star", body: "Someone starred uivix", color: "bg-yellow-500/20" },
];

export default function AnimatedListPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Animated List</h1>
      <p className="text-zinc-400 mb-8">Notification-feed style list: items pop in one after another with a springy entrance, pushing older ones down.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Notifications" code={`<AnimatedList delay={1500} maxVisible={4}>
  {notifications.map((n) => <Notification key={n.title} {...n} />)}
</AnimatedList>`}>
        <div className="h-[340px] w-full overflow-hidden">
          <AnimatedList delay={1500} maxVisible={4} className="mx-auto max-w-sm">
            {notifications.map((n) => (
              <div key={n.title} className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3 shadow-lg">
                <span className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg ${n.color}`}>{n.icon}</span>
                <div>
                  <div className="text-sm font-medium text-zinc-100">{n.title}</div>
                  <div className="text-xs text-zinc-500">{n.body}</div>
                </div>
              </div>
            ))}
          </AnimatedList>
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "children", type: "ReactNode", default: "-", description: "Items to reveal; newest appears on top" },
          { name: "delay", type: "number", default: "1200", description: "Delay between items in ms" },
          { name: "loop", type: "boolean", default: "true", description: "Keep cycling through the items" },
          { name: "maxVisible", type: "number", default: "5", description: "Max items shown at once" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
