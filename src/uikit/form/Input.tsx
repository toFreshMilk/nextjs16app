import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export function Input({ label, className, ...props }: Props) {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
            <input
                className={`px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${className}`}
                {...props}
            />
        </div>
    );
}
