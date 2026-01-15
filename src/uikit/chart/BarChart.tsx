export function BarChart({ data, labels, color }: any) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-2 h-32 mt-4">
      {data.map((v: number, i: number) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
          <div 
            className="w-full rounded-t opacity-80 group-hover:opacity-100 transition"
            style={{ height: `${(v / max) * 100}%`, backgroundColor: color }}
          />
          <div className="text-xs text-gray-400">{labels[i]}</div>
        </div>
      ))}
    </div>
  );
}

