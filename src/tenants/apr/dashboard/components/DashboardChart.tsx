// src/tenants/apr/dashboard/components/DashboardChart.tsx
'use client';

import StandardDashboardChart from '@/standard/dashboard/components/DashboardChart';

export default function AprDashboardChart() {
  return (
    <div className="space-y-3">
      <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl px-5 py-3 font-bold flex items-center justify-between">
        <span>APR 전용 리포트 뷰</span>
        <span className="text-xs px-2 py-1 rounded bg-white border border-rose-200">APR</span>
      </div>
      <div className="ring-2 ring-rose-200 rounded-2xl">
        <StandardDashboardChart />
      </div>
    </div>
  );
}

