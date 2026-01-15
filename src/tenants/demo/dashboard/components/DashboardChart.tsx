// src/tenants/demo/dashboard/components/DashboardChart.tsx
'use client';

import StandardDashboardChart from '@/standard/dashboard/components/DashboardChart';

export default function DemoDashboardChart() {
  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10 text-xs font-black px-2 py-1 rounded bg-purple-600 text-white">
        DEMO DATA
      </div>
      <div className="ring-2 ring-purple-200 rounded-2xl">
        <StandardDashboardChart />
      </div>
    </div>
  );
}

