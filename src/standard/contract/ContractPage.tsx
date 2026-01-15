'use client';

import { ComponentType, useEffect, useMemo, useState } from 'react';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { useTenant } from '@/core/hooks/useTenant';
import { getTenantComponent, getTenantService } from '@/core/config/tenant.config';
import { Button } from '@/uikit/form/Button';
import { Input } from '@/uikit/form/Input';

type ContractRow = {
  id: number | string;
  title: string;
  status: string;
};

export default function ContractPage() {
  const { config } = useAppConfig();
  const { tenantId } = useTenant();

  const [contracts, setContracts] = useState<ContractRow[]>([]);
  const [ListComp, setListComp] = useState<ComponentType<any> | null>(null);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'all' | 'draft' | 'review' | 'active'>('all');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);

        const contractService = await getTenantService<any>(tenantId, 'ContractService');
        const data: ContractRow[] = await contractService.getContracts();
        if (!cancelled) setContracts(data ?? []);

        const Comp = await getTenantComponent(tenantId, 'ContractList');
        if (!cancelled) setListComp(() => Comp);
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
    <div className="flex gap-6 -m-10 p-10 bg-slate-50 min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="w-72 shrink-0 space-y-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
          <div className="text-lg font-black text-slate-900 mb-3">계약</div>
          <Button
            className="w-full"
            style={{ backgroundColor: config.theme.primaryColor }}
            onClick={() => alert('새 계약 작성 (데모)')}
          >
            계약 생성
          </Button>

          <div className="mt-4">
            <Input
              label="계약명"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색어를 입력하세요"
            />
          </div>

          <button
            className="mt-3 w-full py-2 rounded-lg border border-slate-200 bg-amber-300 font-bold"
            onClick={() => {
              setQuery('');
              setTab('all');
            }}
          >
            검색 초기화
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-slate-900">카테고리</div>
            <button className="text-slate-400 hover:text-slate-900">⚙</button>
          </div>
          <div className="mt-3 space-y-2 text-sm">
            {['전체', '회사 템플릿', '마케팅/홍보 계약', '테스트용도', '보안'].map((label) => (
              <button
                key={label}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"
                onClick={() => alert(`카테고리: ${label} (데모)`)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main */}
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
                tab === (t.k as any) ? 'text-white' : 'text-slate-600 hover:bg-slate-50'
              }`}
              style={tab === (t.k as any) ? { backgroundColor: config.theme.primaryColor } : undefined}
              onClick={() => setTab(t.k as any)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-3">
          {ListComp ? (
            <ListComp contracts={filtered} />
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="text-sm text-slate-500">{loading ? '데이터를 불러오는 중…' : '목록 로딩 실패'}</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

