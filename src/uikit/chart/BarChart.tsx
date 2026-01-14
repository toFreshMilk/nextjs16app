interface Props {
  data: number[];
  labels: string[];
  color?: string;
}

export function BarChart({ data, labels, color = 'bg-blue-500' }: Props) {
  // 간단한 CSS 바 차트 구현
  const max = Math.max(...data);

  return (
    <div className="w-full">
      <div className="flex items-end gap-2 h-40 mt-4 border-b border-gray-200 pb-2">
        {data.map((value, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
            {/* Tooltip */}
            <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition text-xs bg-slate-800 text-white px-2 py-1 rounded">
              {value}
            </div>
            {/* Bar */}
            <div 
              className={`w-full rounded-t opacity-80 group-hover:opacity-100 transition-all ${color}`} 
              style={{ 
                height: `${(value / max) * 100}%`,
                backgroundColor: color.startsWith('#') ? color : undefined // Hex color support
              }} 
            />
          </div>
        ))}
      </div>
      {/* Labels */}
      <div className="flex gap-2 mt-2">
        {labels.map((label, i) => (
          <div key={i} className="flex-1 text-center text-xs text-gray-400">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

