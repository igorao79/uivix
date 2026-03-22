"use client";

import { useState } from "react";
import { Avatar } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { Avatar } from "@igorao79/uivix";`;

const shapes = ["circle", "square"] as const;
const statuses = ["online", "offline", "busy", "away"] as const;

export default function AvatarPage() {
  const [shape, setShape] = useState<string>("circle");
  const [status, setStatus] = useState<string>("online");
  const [ring, setRing] = useState(false);
  const [size, setSize] = useState(48);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Avatar</h1>
      <p className="text-zinc-400 mb-8">
        A user avatar with image support, fallback initials, status indicator, and ring border.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <div className="mb-5 flex items-center justify-center min-h-[100px] gap-4">
          <Avatar
            fallback="JD"
            shape={shape as any}
            status={status as any}
            ring={ring}
            size={size}
          />
          <Avatar
            src="https://i.pravatar.cc/150?img=12"
            alt="User"
            shape={shape as any}
            status={status as any}
            ring={ring}
            size={size}
          />
        </div>
        <div className="border-t border-zinc-800 pt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-2">Shape</label>
            <div className="flex flex-wrap gap-2">
              {shapes.map((s) => (
                <button
                  key={s}
                  onClick={() => setShape(s)}
                  className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                    s === shape
                      ? "border-violet-500 bg-violet-500/20 text-violet-300"
                      : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-2">Status</label>
            <div className="flex flex-wrap gap-2">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                    s === status
                      ? "border-violet-500 bg-violet-500/20 text-violet-300"
                      : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-2">Ring</label>
            <button
              onClick={() => setRing(!ring)}
              className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                ring
                  ? "border-violet-500 bg-violet-500/20 text-violet-300"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
              }`}
            >
              {ring ? "On" : "Off"}
            </button>
          </div>
          <SliderControl label="Size" value={size} onChange={setSize} min={24} max={80} suffix="px" />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Status Indicators</h2>
      <div className="flex items-center gap-4 mb-8">
        {statuses.map((s) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <Avatar fallback={s[0].toUpperCase()} status={s} size={40} />
            <span className="text-xs text-zinc-500">{s}</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Shapes</h2>
      <div className="flex items-center gap-4 mb-8">
        <Avatar fallback="AB" shape="circle" size={48} ring />
        <Avatar fallback="CD" shape="square" size={48} ring />
      </div>

      <h2 className="text-xl font-semibold mb-4">Usage</h2>
      <CodeBlock code={`<Avatar
  src="/avatar.jpg"
  fallback="JD"
  status="online"
  shape="circle"
  ring
  size={48}
/>`} />

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "src", type: "string", default: "-", description: "Image URL for the avatar" },
          { name: "alt", type: "string", default: "-", description: "Alt text for the image" },
          { name: "fallback", type: "string", default: '"?"', description: "Initials shown when no image is available" },
          { name: "size", type: "number", default: "40", description: "Avatar size in pixels" },
          { name: "shape", type: '"circle" | "square"', default: '"circle"', description: "Shape of the avatar" },
          { name: "status", type: '"online" | "offline" | "busy" | "away"', default: "-", description: "Status indicator dot" },
          { name: "ring", type: "boolean", default: "false", description: "Show a colored border ring" },
          { name: "ringColor", type: "string", default: '"#8b5cf6"', description: "Color of the ring border" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
