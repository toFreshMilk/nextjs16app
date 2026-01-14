'use client';

import { StatCard } from '@/uikit/card/StatCard';

export default function DemoDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Demo 전용 배너 */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1">프리미엄 기능 체험 중</h2>
          <p className="opacity-90">이 데이터는 매일 자정에 초기화됩니다.</p>
        </div>
        <button className="bg-white text-violet-700 px-4 py-2 rounded-lg font-bold hover:bg-opacity-90">
          정식 도입 문의
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard title="가상 계약 건수" value="999+" highlight />
        <StatCard title="AI 분석 효율" value="350%" trend="+12%" />
      </div>

      {/* Feature Lock 예시 */}
      <div className="h-64 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 bg-gray-50">
        <span className="text-4xl mb-2">🔒</span>
        <span className="font-medium">실제 계약 데이터 연동은 정식 버전에서 가능합니다.</span>
      </div>
    </div>
  );
}

