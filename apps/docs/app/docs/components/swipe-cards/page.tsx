"use client";

import { useState } from "react";
import { SwipeCards, Button, type SwipeDirection } from "@igorao79/uivix";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { SwipeCards } from "@igorao79/uivix";`;

const people = [
  { id: "1", name: "Aurora", emoji: "🌌", from: "from-indigo-600", to: "to-violet-500", bio: "Loves gradients and late-night deploys." },
  { id: "2", name: "Pixel", emoji: "👾", from: "from-emerald-500", to: "to-cyan-500", bio: "Speaks fluent CSS grid." },
  { id: "3", name: "Neon", emoji: "⚡", from: "from-pink-500", to: "to-orange-400", bio: "Ships animations at 60fps." },
  { id: "4", name: "Glitch", emoji: "🛸", from: "from-sky-500", to: "to-blue-700", bio: "Never met a bug they couldn't scramble." },
  { id: "5", name: "Bokeh", emoji: "🫧", from: "from-fuchsia-500", to: "to-rose-500", bio: "Out of focus, in the moment." },
];

const cards = people.map((p) => ({
  id: p.id,
  content: (
    <div className={`flex h-full w-full flex-col justify-end bg-gradient-to-br ${p.from} ${p.to} p-5`}>
      <div className="mb-auto mt-10 text-center text-7xl">{p.emoji}</div>
      <div className="text-2xl font-bold text-white">{p.name}</div>
      <div className="text-sm text-white/80">{p.bio}</div>
    </div>
  ),
}));

export default function SwipeCardsPage() {
  const [log, setLog] = useState<string[]>([]);
  const [round, setRound] = useState(0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Swipe Cards</h1>
      <p className="text-zinc-400 mb-8">Tinder-style card stack. Drag the top card left or right past the threshold to swipe it away; the cards behind move up as you drag.</p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <ComponentPreview title="Default" description="Drag with mouse or touch" code={`<SwipeCards
  cards={[{ id: "1", content: <Profile /> }, ...]}
  onSwipe={(card, direction) => console.log(card.id, direction)}
  emptyState={<p>No more cards</p>}
/>`}>
        <div className="flex w-full flex-wrap items-center justify-center gap-10 py-6">
          <SwipeCards
            key={round}
            cards={cards}
            onSwipe={(card, dir: SwipeDirection) =>
              setLog((l) => [`${people.find((p) => p.id === card.id)?.name} → ${dir}`, ...l].slice(0, 5))
            }
            emptyState={
              <div className="flex flex-col items-center gap-3 text-zinc-500">
                <span>That&apos;s everyone!</span>
                <Button size="sm" variant="outline" onClick={() => setRound((r) => r + 1)}>Start over</Button>
              </div>
            }
          />
          <div className="w-40 space-y-1 text-sm">
            <div className="mb-2 text-xs uppercase tracking-wider text-zinc-500">Swipes</div>
            {log.length === 0 && <div className="text-zinc-600">—</div>}
            {log.map((l, i) => (
              <div key={i} className={l.endsWith("right") ? "text-emerald-400" : "text-rose-400"}>{l}</div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "cards", type: "SwipeCardItem[]", default: "-", description: "Initial stack { id, content }, top card first. Change key to reset" },
          { name: "onSwipe", type: "(card, direction) => void", default: "-", description: "Called after a card leaves the stack" },
          { name: "threshold", type: "number", default: "110", description: "Drag distance in px needed to swipe" },
          { name: "loop", type: "boolean", default: "false", description: "Put swiped cards back at the bottom" },
          { name: "visible", type: "number", default: "3", description: "Cards visible in the stack" },
          { name: "emptyState", type: "ReactNode", default: "-", description: "Shown when the stack is empty" },
          { name: "className", type: "string", default: "-", description: "Size and other classes (default h-80 w-64)" },
        ]}
      />
    </div>
  );
}
