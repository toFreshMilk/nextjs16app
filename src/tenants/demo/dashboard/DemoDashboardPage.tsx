'use client';
import { StatCard } from '@/uikit/card/StatCard';

export default function DemoDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-purple-100 p-4 rounded text-purple-800 font-bold border border-purple-200">
        📢 데모 모드 동작 중입니다. 데이터는 저장되지 않습니다.
      </div>
      <div className="grid grid-cols-2 gap-4">
        <StatCard title="가상 계약" value="999" highlight />
        <StatCard title="가상 리스크" value="12" alert />
      </div>
    </div>
  );
}

