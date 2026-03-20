"use client";

import { useState } from "react";
import { MediaText } from "uixy";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const importCode = `import { MediaText } from "uixy";`;

const imagePresets = [
  {
    label: "Ocean",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=60",
  },
  {
    label: "Galaxy",
    url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=60",
  },
  {
    label: "Forest",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=60",
  },
  {
    label: "Fire",
    url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0571?w=400&q=60",
  },
];

export default function MediaTextPage() {
  const [text, setText] = useState("AMAZING");
  const [imagePreset, setImagePreset] = useState(0);
  const [key, setKey] = useState(0);

  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Media Text</h1>
      <p className="text-zinc-400 mb-8">
        Text filled with an image or video, creating a clipping mask effect.
      </p>

      <h2 className="text-xl font-semibold mb-4">Import</h2>
      <CodeBlock code={importCode} />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Playground</h2>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <div className="mb-5 flex items-center justify-center min-h-[120px] bg-black rounded-lg p-6">
          <MediaText
            key={`img-${key}-${imagePreset}`}
            src={imagePresets[imagePreset].url}
            className="text-7xl font-black tracking-tight"
          >
            {text}
          </MediaText>
        </div>
        <div className="border-t border-zinc-800 pt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Your text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => { setText(e.target.value); replay(); }}
              className="w-full h-9 px-3 text-sm rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Image</label>
            <div className="flex flex-wrap gap-2">
              {imagePresets.map((p, i) => (
                <button
                  key={i}
                  onClick={() => { setImagePreset(i); replay(); }}
                  className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                    i === imagePreset
                      ? "border-violet-500 bg-violet-500/20 text-violet-300"
                      : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={replay} className="text-xs text-violet-400 hover:text-violet-300 underline">
            Replay
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Examples</h2>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <p className="text-sm text-zinc-500 mb-3">Image fill</p>
        <CodeBlock code={`<MediaText\n  src="/ocean.jpg"\n  className="text-6xl font-black"\n>\n  OCEAN\n</MediaText>`} />
        <div className="mt-4 flex justify-center bg-black rounded-lg p-6">
          <MediaText
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=60"
            className="text-6xl font-black tracking-tight"
          >
            OCEAN
          </MediaText>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
        <p className="text-sm text-zinc-500 mb-3">Video fill</p>
        <CodeBlock code={`<MediaText\n  videoSrc="/my-video.mp4"\n  className="text-6xl font-black text-white"\n>\n  WAVES\n</MediaText>`} />
        <p className="mt-3 text-xs text-zinc-500">
          Pass a <code className="text-violet-400">videoSrc</code> prop with a local or hosted video URL. The video will play inside the text using a mix-blend-mode technique.
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Props</h2>
      <PropsTable
        props={[
          { name: "children", type: "string", default: "-", description: "The text content (required)" },
          { name: "src", type: "string", default: "-", description: "Image URL to fill the text" },
          { name: "videoSrc", type: "string", default: "-", description: "Video URL to fill the text" },
          { name: "backgroundSize", type: "string", default: '"cover"', description: "CSS background-size (image mode)" },
          { name: "backgroundPosition", type: "string", default: '"center"', description: "CSS background-position (image mode)" },
          { name: "loop", type: "boolean", default: "true", description: "Loop video (video mode)" },
          { name: "muted", type: "boolean", default: "true", description: "Mute video (video mode)" },
          { name: "as", type: "ElementType", default: '"h1"', description: "HTML tag to render" },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
        ]}
      />
    </div>
  );
}
