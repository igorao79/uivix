interface Prop {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export function PropsTable({ props }: { props: Prop[] }) {
  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden mb-8">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/50">
            <th className="text-left p-3 text-zinc-400 font-medium">Prop</th>
            <th className="text-left p-3 text-zinc-400 font-medium">Type</th>
            <th className="text-left p-3 text-zinc-400 font-medium">Default</th>
            <th className="text-left p-3 text-zinc-400 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b border-zinc-800 last:border-0">
              <td className="p-3 font-mono text-violet-400 text-xs">{prop.name}</td>
              <td className="p-3 font-mono text-zinc-300 text-xs">{prop.type}</td>
              <td className="p-3 font-mono text-zinc-500 text-xs">{prop.default || "-"}</td>
              <td className="p-3 text-zinc-400">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
