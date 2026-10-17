"use client";

import { ToastProvider, useToast, Button } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { ToastProvider, useToast, Button } from "@igorao79/uivix";`;

function Demo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button onClick={() => toast({ title: "Saved", description: "Your changes are live.", type: "success" })}>Success</Button>
      <Button variant="outline" onClick={() => toast({ title: "Something broke", description: "Try again in a minute.", type: "error" })}>Error</Button>
      <Button variant="outline" onClick={() => toast({ title: "Heads up", type: "warning" })}>Warning</Button>
      <Button variant="outline" onClick={() => toast("Plain message")}>Plain</Button>
    </div>
  );
}

export default function ToastPage() {

  return (
    <ToastProvider>
    <div>
      <h1 className="text-3xl font-bold mb-2">Toast</h1>
      <p className="text-zinc-400 mb-8">Notification system: wrap your app in ToastProvider and call useToast() from anywhere. Stacked, auto-dismissing and pause-on-hover.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Types" description="Trigger toasts of each type" code={`const { toast } = useToast();

toast({ title: "Saved", description: "Your changes are live.", type: "success" });`}>
        <Demo />
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "position", type: "ToastPosition", default: "\"bottom-right\"", description: "top/bottom × left/center/right" },
          { name: "toast", type: "(options | string) => number", default: "-", description: "useToast(): show a toast, returns its id" },
          { name: "dismiss", type: "(id: number) => void", default: "-", description: "useToast(): dismiss a toast" },
          { name: "title", type: "ReactNode", default: "-", description: "Toast option: heading" },
          { name: "description", type: "ReactNode", default: "-", description: "Toast option: secondary text" },
          { name: "type", type: "\"default\" | \"success\" | \"error\" | \"warning\" | \"info\"", default: "\"default\"", description: "Toast option: accent color" },
          { name: "duration", type: "number", default: "4000", description: "Toast option: auto-dismiss ms (0 = never)" },
        ]}
      />
    </div>
    </ToastProvider>
  );
}
