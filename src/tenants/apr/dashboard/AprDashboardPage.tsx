// src/tenants/apr/dashboard/AprDashboardPage.tsx
'use client';
import { StatCard } from '@/uikit/card/StatCard';

export default function AprDashboardPage() {
  return (
    <div className="bg-rose-50 min-h-screen p-6 -m-6">
      <h1 className="text-3xl font-black text-rose-600 mb-6">APR EXECUTIVE VIEW</h1>
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Global Sales" value="$1.2M" highlight />
        <StatCard title="Legal Issues" value="0" />
        <StatCard title="Pending" value="4" />
        <StatCard title="Drafts" value="12" />
      </div>
      <div className="mt-8 p-6 bg-white rounded shadow border border-rose-100">
        <h3 className="font-bold text-rose-800 mb-2">APR 전용 리포트</h3>
        <p className="text-gray-500">이 영역은 APR 고객사만을 위해 커스텀 개발되었습니다.</p>
      </div>
    </div>
  );
}

