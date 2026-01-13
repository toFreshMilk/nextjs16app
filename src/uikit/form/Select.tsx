interface Option { label: string; value: string }
interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: Option[];
    label?: string;
}

export function Select({ options, label, ...props }: Props) {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
            <select className="px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" {...props}>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
}
