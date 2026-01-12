import React from 'react';

type Variant = 'blue' | 'green' | 'purple' | 'red' | 'orange';

const VARIANT_STYLES: Record<Variant, string> = {
    blue: 'border-blue-500/30 bg-blue-500/5',
    green: 'border-green-500/30 bg-green-500/5',
    purple: 'border-purple-500/30 bg-purple-500/5',
    red: 'border-red-500/30 bg-red-500/5',
    orange: 'border-orange-500/30 bg-orange-500/5',
};

const VALUE_COLORS: Record<Variant, string> = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    red: 'text-red-400',
    orange: 'text-orange-400',
};

interface StatCardProps {
    label: string;
    value: string | number;
    variant?: Variant;
    icon?: React.ReactNode;
}

export default function StatCard({
                                     label,
                                     value,
                                     variant = 'blue',
                                     icon
                                 }: StatCardProps) {
    return (
        <div className={`std-card ${VARIANT_STYLES[variant]} transition-all hover:scale-105`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="std-stat-label">{label}</div>
                    <div className={`std-stat-value ${VALUE_COLORS[variant]}`}>
                        {value}
                    </div>
                </div>
                {icon && (
                    <div className="text-3xl opacity-50">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
}
