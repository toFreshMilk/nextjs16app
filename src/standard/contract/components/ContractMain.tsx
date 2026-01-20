// src/standard/contract/components/ContractMain.tsx
'use client';

import { ComponentType, useMemo } from 'react';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function buildUrl(pathname: string, params: URLSearchParams) {
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

type TabKey = 'all' | 'draft' | 'review' | 'active';

// [핵심] 컴포넌트가 필요한 데이터 형태 정의
export interface ContractMainProps {
  contracts: {
    id: number | string;
    title: string;
    status: string;
    // 필요한 필드만 정의
  }[];
  ListComponent: ComponentType<{ contracts?: any[] }>;
}

export default function ContractMain({ contracts, ListComponent }: ContractMainProps) {
  const { config } = useAppConfig();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get('q') ?? '';
  const tab = (searchParams.get('tab') ?? 'all') as TabKey;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return contracts.filter((c) => {
      const matchQ = !q || c.title.toLowerCase().includes(q);
      const matchTab =
        tab === 'all' ||
        (tab === 'draft' && c.status.toLowerCase() === 'draft') ||
        (tab === 'review' && c.status.toLowerCase() === 'review') ||
        (tab === 'active' && c.status.toLowerCase() === 'active');
      return matchQ && matchTab;
    });
  }, [contracts, query, tab]);

  return (
    <section className="flex-1 space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-sm text-slate-500">
            전체 : <span className="font-bold text-slate-900">{filtered.length}</span> 건
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">계약</h1>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <button className="px-3 py-2 rounded-lg border border-slate-200 bg-white">필드 표시</button>
          <button className="px-3 py-2 rounded-lg border border-slate-200 bg-white">10개씩 보기</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 flex gap-2">
        {[
          { k: 'all', label: '전체' },
          { k: 'draft', label: '초안' },
          { k: 'review', label: '검토' },
          { k: 'active', label: '서명 및 회수' },
        ].map((t) => (
          <button
            key={t.k}
            className={`px-4 py-2 rounded-xl font-bold text-sm ${
              tab === t.k ? 'text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
            style={tab === t.k ? { backgroundColor: config.theme.primaryColor } : undefined}
            onClick={() => {
              const next = new URLSearchParams(searchParams.toString());
              next.set('tab', t.k);
              router.replace(buildUrl(pathname, next));
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {ListComponent ? (
          <ListComponent contracts={filtered} />
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="text-sm text-slate-500">목록 컴포넌트 로딩 실패</div>
          </div>
        )}
      </div>
    </section>
  );
}
