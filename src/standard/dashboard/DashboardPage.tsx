'use client';
import Link from 'next/link';
import { ComponentType, ReactNode, useEffect, useState } from 'react';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { useTenant } from '@/core/hooks/useTenant';
import { getTenantComponent, getTenantService } from '@/core/config/tenant.config';
import { StatCard } from '@/uikit/card/StatCard';

type DashboardStats = {
  contracts: number;
  pending: number;
  risks: number;
};

export default function DashboardPage({
  stats: initialStats,
  chart: initialChart,
}: {
  stats?: DashboardStats; // (선택) SSR/프리패치 시 주입 가능
  chart?: ReactNode; // (선택) SSR/슬롯 주입 시 사용 가능
}) {
  const { config } = useAppConfig();
  const { tenantId } = useTenant();

  const [stats, setStats] = useState<DashboardStats | undefined>(initialStats);
  const [ChartComp, setChartComp] = useState<ComponentType<any> | null>(null);
  const [loading, setLoading] = useState<boolean>(!initialStats);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);

        const dashboardService = await getTenantService<any>(tenantId, 'DashboardService');
        const nextStats: DashboardStats = await dashboardService.getStats();
        if (!cancelled) setStats(nextStats);

        const Comp = await getTenantComponent(tenantId, 'DashboardChart');
        if (!cancelled) setChartComp(() => Comp);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [tenantId]);

  const safeStats = stats ?? { contracts: 0, pending: 0, risks: 0 };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black tracking-tight text-slate-900">대시보드</h1>
            <span
              className="text-xs font-bold px-2 py-1 rounded-full border"
              style={{ borderColor: config.theme.primaryColor, color: config.theme.primaryColor }}
            >
              {config.name}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-slate-100 text-slate-700">Standard</span>
            {config.features.i18n && <span className="px-2 py-1 rounded bg-blue-50 text-blue-700">i18n</span>}
            {config.features.ai && <span className="px-2 py-1 rounded bg-violet-50 text-violet-700">AI</span>}
            {config.features.sso && <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-700">SSO</span>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contract"
            className="h-11 px-5 rounded-xl font-bold text-white shadow-sm flex items-center justify-center"
            style={{ backgroundColor: config.theme.primaryColor }}
          >
            계약
          </Link>
          <button className="h-11 px-5 rounded-xl font-bold bg-white border border-slate-200 text-slate-800 shadow-sm">
            자문
          </button>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard title="전체 계약" value={String(safeStats.contracts)} />
        <StatCard title="검토 필요" value={String(safeStats.pending)} highlight />
        <StatCard title="리스크" value={String(safeStats.risks)} alert />
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-slate-500">공지사항</div>
            <div className="mt-2 space-y-1 text-sm text-slate-700">
              <div className="truncate">윤리경영 확인사항 공지</div>
              <div className="truncate">계약 템플릿 업데이트 안내</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black" style={{ color: config.theme.primaryColor }}>
              3
            </div>
            <div className="text-xs text-slate-400 mt-1">new</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-9 space-y-6">
          {/* Chart slot (tenant component override target) */}
          {initialChart ?? (ChartComp ? (
            <ChartComp />
          ) : (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-sm text-slate-500">{loading ? '데이터를 불러오는 중…' : '차트 로딩 실패'}</div>
            </div>
          ))}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">실시간 리포트</h3>
              <button className="text-sm text-slate-500 hover:text-slate-900">접기</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <div className="text-xs text-slate-500">최근 3개월 평균 검토 처리</div>
                <div className="mt-3 text-4xl font-black text-slate-900">0.0</div>
                <div className="text-sm text-slate-500">day</div>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <div className="text-xs text-slate-500">계약/자문 신규 발생</div>
                <div className="mt-3 text-4xl font-black text-slate-900">{safeStats.contracts}</div>
                <div className="text-sm text-slate-500">건</div>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <div className="text-xs text-slate-500">리스크 감지</div>
                <div className="mt-3 text-4xl font-black text-slate-900">{safeStats.risks}</div>
                <div className="text-sm text-slate-500">건</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="xl:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900">일정</h3>
              <button className="text-slate-400 hover:text-slate-900">⚙</button>
            </div>
            <div className="mt-4 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span className="font-semibold">1월 2026</span>
                <span className="text-xs text-slate-400">계약 캘린더</span>
              </div>
              <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs">
                {['일','월','화','수','목','금','토'].map((d) => (
                  <div key={d} className="text-slate-400">{d}</div>
                ))}
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-8 flex items-center justify-center rounded ${
                      i === 14 ? 'text-white font-bold' : 'text-slate-600'
                    }`}
                    style={i === 14 ? { backgroundColor: config.theme.primaryColor } : undefined}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {config.features.ai && (
            <div className="rounded-2xl p-6 text-white shadow-sm" style={{ backgroundColor: config.theme.primaryColor }}>
              <div className="font-black text-lg">AI 요약</div>
              <div className="mt-2 text-sm opacity-90">
                이번 주 계약 리스크가 {safeStats.risks}건 감지되었습니다. 우선순위 검토를 권장합니다.
              </div>
              <button className="mt-4 px-4 py-2 rounded bg-white/90 text-slate-900 font-bold w-full">
                분석 보기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

