'use client';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { StatCard } from '@/uikit/card/StatCard';
import { BarChart } from '@/uikit/chart/BarChart';

export default function DashboardPage() {
  const { config } = useAppConfig();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Standard Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <StatCard title="전체 계약" value="10" />
        <StatCard title="진행중" value="2" highlight />
        <StatCard title="리스크" value="0" />
      </div>
      <div className="bg-white p-6 rounded shadow border border-gray-100">
        <h3 className="mb-4 font-bold">계약 추이</h3>
        <BarChart data={[10, 20, 15]} labels={['1월', '2월', '3월']} color={config.theme.primaryColor} />
      </div>
    </div>
  );
}

