interface Props {
    title: string;
    value: string;
    highlight?: boolean;
}

export function StatCard({ title, value, highlight }: Props) {
    return (
        <div className={`p-6 rounded-xl border ${highlight ? 'bg-orange-50 border-orange-100' : 'bg-white border-gray-100'} shadow-sm`}>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
            <p className={`text-3xl font-bold ${highlight ? 'text-orange-600' : 'text-slate-900'}`}>{value}</p>
        </div>
    );
}
