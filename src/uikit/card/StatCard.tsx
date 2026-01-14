interface Props {
  title: string;
  value: string;
  highlight?: boolean;
  trend?: string;
  alert?: boolean;
}

export function StatCard({ title, value, highlight, trend, alert }: Props) {
  return (
    <div className={`p-6 rounded-xl border shadow-sm transition-all hover:shadow-md ${
      alert ? 'bg-red-50 border-red-100' : 
      highlight ? 'bg-orange-50 border-orange-100' : 'bg-white border-gray-100'
    }`}>
      <h3 className={`text-sm font-medium mb-1 ${alert ? 'text-red-600' : 'text-gray-500'}`}>
        {title}
      </h3>
      <div className="flex items-end justify-between">
        <p className={`text-3xl font-bold ${
          alert ? 'text-red-700' : 
          highlight ? 'text-orange-600' : 'text-slate-900'
        }`}>
          {value}
        </p>
        {trend && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
            trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

