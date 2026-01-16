'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTenant } from '@/core/hooks/useTenant';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { getTenantService } from '@/core/config/tenant.config';

type ContractRow = {
  id: number | string;
  title: string;
  status: string;
};

function normalizeStatus(s: string) {
  return (s ?? '').trim().toLowerCase();
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-white shadow-sm p-4">
      <div className="text-xs font-black tracking-[0.2em] text-rose-500">{label}</div>
      <div className="mt-2 flex items-end justify-between">
        <div className="text-3xl font-black text-slate-900">{value}</div>
        <div className="h-2 w-20 rounded-full" style={{ backgroundColor: accent, opacity: 0.35 }} />
      </div>
    </div>
  );
}

function Column({
  title,
  hint,
  items,
  chip,
}: {
  title: string;
  hint: string;
  items: ContractRow[];
  chip: { bg: string; text: string; border: string };
}) {
  return (
    <section className="min-w-[280px] flex-1 rounded-2xl border border-rose-200 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-rose-100 flex items-center justify-between">
        <div>
          <div className="text-sm font-black text-slate-900">{title}</div>
          <div className="text-xs text-slate-500">{hint}</div>
        </div>
        <span className={`text-xs font-black px-2 py-1 rounded-full border ${chip.bg} ${chip.text} ${chip.border}`}>
          {items.length}
        </span>
      </div>

      <div className="p-4 space-y-3">
        {items.length === 0 ? (
          <div className="text-sm text-slate-500">표시할 항목이 없습니다.</div>
        ) : (
          items.map((c) => (
            <div
              key={String(c.id)}
              className="rounded-xl border border-rose-100 bg-rose-50/40 p-3 hover:bg-rose-50 transition"
            >
              <div className="text-xs font-black text-rose-700">#{c.id}</div>
              <div className="mt-1 font-bold text-slate-900 leading-snug">{c.title}</div>
              <div className="mt-2 text-[11px] font-black text-slate-500">
                상태: <span className="text-slate-800">{c.status}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default function AprContractMain() {
  const { tenantId } = useTenant();
  const { config } = useAppConfig();
  const searchParams = useSearchParams();

  const query = (searchParams.get('q') ?? '').trim().toLowerCase();
  const tab = (searchParams.get('tab') ?? 'all').toLowerCase();

  const [contracts, setContracts] = useState<ContractRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const service = await getTenantService<any>(tenantId, 'ContractService');
        const data: ContractRow[] = await service.getContracts();
        if (!cancelled) setContracts(Array.isArray(data) ? data : []);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [tenantId]);

  const filtered = useMemo(() => {
    return contracts.filter((c) => {
      const s = normalizeStatus(c.status);
      const matchQ = !query || String(c.title ?? '').toLowerCase().includes(query);
      const matchTab = tab === 'all' || s === tab;
      return matchQ && matchTab;
    });
  }, [contracts, query, tab]);

  const by = useMemo(() => {
    const active = filtered.filter((c) => normalizeStatus(c.status) === 'active');
    const review = filtered.filter((c) => normalizeStatus(c.status) === 'review');
    const draft = filtered.filter((c) => normalizeStatus(c.status) === 'draft');
    return { active, review, draft };
  }, [filtered]);

  return (
    <section className="flex-1 space-y-4">
      {/* APR은 “Contract Desk” 스타일로 전면 구성 (Standard와 체감 차이) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black text-rose-700">
            <span className="px-2 py-1 rounded-full border border-rose-200 bg-rose-50">APR</span>
            <span className="text-slate-500">Contract Desk</span>
          </div>
          <h1 className="mt-2 text-3xl font-black text-slate-900 tracking-tight">계약 워크보드</h1>
          <div className="mt-1 text-sm text-slate-500">
            그룹웨어 연동 기반 계약 상태를 보드로 관리합니다.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-2 rounded-xl font-black text-white shadow-sm"
            style={{ backgroundColor: config.theme.primaryColor }}
            onClick={() => alert('APR 전용: 그룹웨어 동기화 (데모)')}
          >
            동기화
          </button>
          <button
            className="px-3 py-2 rounded-xl border border-rose-200 bg-white font-black text-rose-800"
            onClick={() => alert('APR 전용: 승인 라인 설정 (데모)')}
          >
            결재 설정
          </button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-rose-200 bg-white shadow-sm p-6">
          <div className="text-sm text-slate-500">APR 계약 데이터를 불러오는 중…</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard label="TOTAL" value={filtered.length} accent={config.theme.primaryColor} />
            <StatCard label="ACTIVE" value={by.active.length} accent="#16a34a" />
            <StatCard label="REVIEW" value={by.review.length} accent="#f59e0b" />
            <StatCard label="DRAFT" value={by.draft.length} accent="#64748b" />
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <Column
              title="검토"
              hint="법무 검토/수정 요청"
              items={by.review}
              chip={{ bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' }}
            />
            <Column
              title="진행"
              hint="서명/회수/체결 진행"
              items={by.active}
              chip={{ bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' }}
            />
            <Column
              title="초안"
              hint="작성 중인 계약"
              items={by.draft}
              chip={{ bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' }}
            />
          </div>
        </>
      )}
    </section>
  );
}

