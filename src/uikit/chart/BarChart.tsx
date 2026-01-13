interface Props {
    data: number[];
    labels: string[];
}

export function BarChart({ data, labels }: Props) {
    return (
        <div className="flex items-end gap-2 h-32 mt-4">
            {data.map((value, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                    <div
                        className="w-full bg-blue-500 rounded-t group-hover:bg-blue-600 transition-all"
                        style={{ height: `${value}%` }}
                    />
                    <span className="text-xs text-gray-400">{labels[i]}</span>
                </div>
            ))}
        </div>
    );
}
