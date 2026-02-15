// src/standard/contract/components/ContractSidebar.tsx
'use client';

import { Button } from '@/uikit/form/Button';
import { Input } from '@/uikit/form/Input';
import { Select } from '@/uikit/form/Select';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function buildUrl(pathname: string, params: URLSearchParams) {
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export default function ContractSidebar() {
  const { config } = useAppConfig();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get('q') ?? '';
  const tab = searchParams.get('tab') ?? 'all';
  const tabOptions = [
    { label: '전체', value: 'all' },
    { label: '초안', value: 'draft' },
    { label: '검토', value: 'review' },
    { label: '진행', value: 'active' },
  ];

  return (
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
            onValueChange={(v) => {
              const next = new URLSearchParams(searchParams.toString());
              if (v) next.set('q', v);
              else next.delete('q');
              if (!next.get('tab')) next.set('tab', tab);
              router.replace(buildUrl(pathname, next));
            }}
            placeholder="검색어를 입력하세요"
          />
        </div>

        <div className="mt-3">
          <Select
            label="상태"
            value={tab}
            options={tabOptions}
            onValueChange={(value) => {
              const next = new URLSearchParams(searchParams.toString());
              next.set('tab', value);
              router.replace(buildUrl(pathname, next));
            }}
          />
        </div>

        <Button
          className="mt-3 w-full rounded-lg border border-slate-200 bg-amber-300 font-bold text-slate-900"
          onPress={() => {
            const next = new URLSearchParams(searchParams.toString());
            next.delete('q');
            next.delete('tab');
            router.replace(buildUrl(pathname, next));
          }}
        >
          검색 초기화
        </Button>
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
  );
}
