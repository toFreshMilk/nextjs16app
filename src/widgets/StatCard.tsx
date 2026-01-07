import React from 'react';

interface Props {
    title: string;
    value: string;
    className?: string;
}

export default function StatCard({ title, value, className = '' }: Props) {
    return (
        <div className={`p-6 bg-white border rounded-lg shadow-sm ${className}`}>
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        </div>
    );
}
