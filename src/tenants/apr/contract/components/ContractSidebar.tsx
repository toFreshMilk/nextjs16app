// src/tenants/apr/contract/components/ContractSidebar.tsx
'use client';

import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/uikit/form/Button';
import { Input } from '@/uikit/form/Input';
import { Select } from '@/uikit/form/Select';

function buildUrl(pathname: string, params: URLSearchParams) {
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export default function AprContractSidebar() {
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
      <div className="bg-white rounded-2xl border border-rose-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-lg font-black text-rose-700">APR 계약</div>
          <span className="text-[10px] font-black px-2 py-1 rounded-full border border-rose-200 bg-rose-50 text-rose-700">
            APR
          </span>
        </div>

        <Button
          fullWidth
          custom={{ baseClassName: 'rounded-lg font-bold text-white shadow-sm py-2.5' }}
          style={{ backgroundColor: config.theme.primaryColor }}
          onPress={() => alert('APR 전용 계약 생성 플로우')}
        >
          APR 계약 생성
        </Button>

        <div className="mt-4">
          <Input
            label="계약명"
            value={query}
            custom={{
              labelClassName: 'text-xs font-bold text-rose-500',
              inputClassName: 'mt-1 border-rose-200 rounded-lg focus:ring-rose-200',
            }}
            onValueChange={(v) => {
              const next = new URLSearchParams(searchParams.toString());
              if (v) next.set('q', v);
              else next.delete('q');
              if (!next.get('tab')) next.set('tab', tab);
              router.replace(buildUrl(pathname, next));
            }}
            placeholder="APR 계약 검색"
          />
        </div>

        <div className="mt-3">
          <Select
            label="상태"
            value={tab}
            options={tabOptions}
            custom={{
              labelClassName: 'text-xs font-bold text-rose-500',
              selectClassName: 'border-rose-200 rounded-lg focus:ring-rose-200',
            }}
            onValueChange={(value) => {
              const next = new URLSearchParams(searchParams.toString());
              next.set('tab', value);
              router.replace(buildUrl(pathname, next));
            }}
          />
        </div>

        <Button
          className="mt-3 w-full rounded-lg border border-rose-200 bg-rose-50 font-bold text-rose-800"
          onPress={() => {
            const next = new URLSearchParams(searchParams.toString());
            next.delete('q');
            next.delete('tab');
            router.replace(buildUrl(pathname, next));
          }}
        >
          필터 초기화
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-rose-200 shadow-sm p-4">
        <div className="font-bold text-rose-800">APR 전용 메뉴</div>
        <div className="mt-3 space-y-2 text-sm">
          {['해외법인', '공급계약', '디바이스', '광고/마케팅'].map((label) => (
            <button
              key={label}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-700"
              onClick={() => alert(`APR 카테고리: ${label}`)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
