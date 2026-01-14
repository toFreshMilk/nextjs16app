'use client';

import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { StatCard } from '@/uikit/card/StatCard';
import { BarChart } from '@/uikit/chart/BarChart';

export default function AprDashboardPage() {
  const { config } = useAppConfig();

  return (
    <div className="bg-rose-50/50 min-h-screen -m-8 p-8"> {/* 배경색 오버라이드 */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Executive Overview</h1>
          <p className="text-rose-600 font-medium">APR Global Contract Status</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last Updated</p>
          <p className="font-mono font-bold">2026-01-14 15:30:00</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Sales" value="$4.2M" highlight />
        <StatCard title="Pending" value="12" />
        <StatCard title="Risks" value="0" />
        <StatCard title="Compliance" value="98%" trend="+2%" />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-rose-100">
        <h3 className="text-lg font-bold mb-6">Regional Performance</h3>
        <BarChart 
          data={[120, 200, 150, 80, 70]} 
          labels={['Korea', 'USA', 'Japan', 'China', 'SEA']}
          color="#e11d48" // Rose Color
        />
      </div>
    </div>
  );
}

