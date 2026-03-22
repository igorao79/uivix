"use client";

import { useState } from "react";
import { Marquee, Card, CardContent } from "@igorao79/uivix";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderControl } from "@/components/Playground";

const importCode = `import { Marquee, Card, CardContent } from "@igorao79/uivix";`;

const directions = ["left", "right"] as const;

const items = [
  { title: "React", color: "text-cyan-400" },
  { title: "Next.js", color: "text-white" },
  { title: "TypeScript", color: "text-blue-400" },
  { title: "Tailwind", color: "text-teal-400" },
  { title: "Framer Motion", color: "text-pink-400" },
  { title: "Radix UI", color: "text-violet-400" },
];

export default function MarqueePage() {
  const [direction, setDirection] = useState<string>("left");
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [fade, setFade] = useState(true);
  const [speed, setSpeed] = useState(30);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Marquee</h1>
      <p className="text-zinc-400 mb-8">
        An infinite scrolling marquee with configurable speed, direction, fade edges, and pause on hover.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <div className="mb-5 min-h-[80px] overflow-hidden">
          <Marquee
            direction={direction as any}
            pauseOnHover={pauseOnHover}
            fade={fade}
            speed={speed}
          >
            {items.map((item) => (
              <Card key={item.title} className="mx-2 w-[160px] shrink-0">
                <CardContent className="p-4">
                  <p className={`text-sm font-medium ${item.color}`}>{item.title}</p>
                  <p className="text-xs text-zinc-500 mt-1">Technology</p>
                </CardContent>
              </Card>
            ))}
          </Marquee>
        </div>
        <div className="border-t border-zinc-800 pt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-2">Direction</label>
            <div className="flex flex-wrap gap-2">
              {directions.map((d) => (
                <button
                  key={d}
                  onClick={() => setDirection(d)}
                  className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                    d === direction
                      ? "border-violet-500 bg-violet-500/20 text-violet-300"
                      : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPauseOnHover(!pauseOnHover)}
              className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                pauseOnHover
                  ? "border-violet-500 bg-violet-500/20 text-violet-300"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
              }`}
            >
              Pause on Hover: {pauseOnHover ? "On" : "Off"}
            </button>
            <button
              onClick={() => setFade(!fade)}
              className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                fade
                  ? "border-violet-500 bg-violet-500/20 text-violet-300"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
              }`}
            >
              Fade: {fade ? "On" : "Off"}
            </button>
          </div>
          <SliderControl label="Speed" value={speed} onChange={setSpeed} min={5} max={60} suffix="s" />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Usage</h2>
      <CodeBlock code={`<Marquee speed={30} direction="left" pauseOnHover fade>
  <Card className="mx-2 w-[160px]">
    <CardContent className="p-4">
      <p className="text-sm font-medium">Item 1</p>
    </CardContent>
  </Card>
  <Card className="mx-2 w-[160px]">
    <CardContent className="p-4">
      <p className="text-sm font-medium">Item 2</p>
    </CardContent>
  </Card>
</Marquee>`} />

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "speed", type: "number", default: "30", description: "Duration in seconds for one full scroll cycle" },
          { name: "direction", type: '"left" | "right" | "up" | "down"', default: '"left"', description: "Scroll direction" },
          { name: "pauseOnHover", type: "boolean", default: "true", description: "Pause the animation when hovered" },
          { name: "fade", type: "boolean", default: "true", description: "Fade out edges with a gradient mask" },
          { name: "repeat", type: "number", default: "4", description: "Number of content copies for seamless looping" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
