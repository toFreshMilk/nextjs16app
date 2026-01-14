import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = '', ...props }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
      <input
        className={`px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${className}`}
        {...props}
      />
    </div>
  );
}

