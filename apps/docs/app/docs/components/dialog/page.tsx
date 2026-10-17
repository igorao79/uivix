"use client";

import { useState } from "react";

import { Dialog, Button } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { Dialog, Button } from "@igorao79/uivix";`;


export default function DialogPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dialog</h1>
      <p className="text-zinc-400 mb-8">Accessible modal with backdrop blur, Escape-to-close, scroll lock and a portal so it never gets clipped.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Confirm" description="Click to open" code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Delete project</Button>
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Delete project?"
  description="This action cannot be undone."
  footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button variant="destructive">Delete</Button></>}
/>`}>
        <Button onClick={() => setOpen(true)}>Delete project</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Delete project?"
          description="This action cannot be undone."
          footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button variant="destructive" onClick={() => setOpen(false)}>Delete</Button></>}
        >
          All deployments and settings will be permanently removed.
        </Dialog>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "open", type: "boolean", default: "-", description: "Whether the dialog is visible" },
          { name: "onClose", type: "() => void", default: "-", description: "Called on Escape, backdrop click or the close button" },
          { name: "title", type: "ReactNode", default: "-", description: "Heading" },
          { name: "description", type: "ReactNode", default: "-", description: "Text under the heading" },
          { name: "footer", type: "ReactNode", default: "-", description: "Footer content, usually buttons" },
          { name: "closeOnBackdrop", type: "boolean", default: "true", description: "Close when the backdrop is clicked" },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"", description: "Max width" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
