'use client';

import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { StatCard } from '@/uikit/card/StatCard';
import { DashboardChart } from './components/DashboardChart';

export default function DashboardPage() {
  const { config } = useAppConfig();

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 mt-1">
            <span className="font-medium text-slate-900">{config.name}</span>의 실시간 현황입니다.
          </p>
        </div>
        <button 
          className="px-5 py-2.5 rounded-xl font-medium text-white shadow-lg shadow-blue-500/30 transition-transform active:scale-95"
          style={{ backgroundColor: config.theme.primaryColor }}
        >
          + 리포트 생성
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="전체 계약" value="1,240" trend="+12.5%" />
        <StatCard title="검토 진행" value="34" />
        <StatCard title="승인 대기" value="8" highlight />
        <StatCard title="만료 예정" value="3" alert />
      </div>

      {/* AI Feature Banner (Conditional) */}
      {config.features.ai && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white shadow-lg">
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <span className="text-2xl">✨</span> AI Legal Assistant
              </h3>
              <p className="text-indigo-100 max-w-xl">
                계약서의 독소 조항을 AI가 자동으로 분석하여 리스크를 90% 이상 줄여줍니다.
                지금 바로 분석을 시작해보세요.
              </p>
            </div>
            <button className="hidden sm:block px-6 py-2 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition">
              분석 시작
            </button>
          </div>
          {/* Decorative Circles */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-900/20 rounded-full blur-3xl" />
        </div>
      )}

      {/* Main Chart Section */}
      <DashboardChart />
    </div>
  );
}

