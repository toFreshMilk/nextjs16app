import React from 'react';

interface DataPoint {
    label: string;
    value: number;
}

interface SimpleChartProps {
    data: DataPoint[];
    color?: string;
}

export default function SimpleChart({
                                        data,
                                        color = 'var(--brand-primary)'
                                    }: SimpleChartProps) {
    const maxValue = Math.max(...data.map(d => d.value), 1);

    return (
        <div className="h-64 flex items-end justify-around gap-4 p-6 bg-brand-surface rounded-xl border border-white/10">
            {data.map((point, idx) => {
                const heightPercent = (point.value / maxValue) * 100;

                return (
                    <div key={idx} className="flex flex-col items-center gap-2 flex-1 max-w-[80px]">
                        <div className="text-xs font-semibold text-brand-text">
                            {point.value}
                        </div>
                        <div
                            className="w-full rounded-t transition-all duration-500 hover:opacity-80"
                            style={{
                                height: `${heightPercent}%`,
                                backgroundColor: color,
                                minHeight: '4px'
                            }}
                        />
                        <div className="text-xs text-brand-muted font-medium">
                            {point.label}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
