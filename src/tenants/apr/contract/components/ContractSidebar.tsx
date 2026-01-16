// src/tenants/apr/contract/components/ContractSidebar.tsx
'use client';

import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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

  return (
    <aside className="w-72 shrink-0 space-y-4">
      <div className="bg-white rounded-2xl border border-rose-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-lg font-black text-rose-700">APR 계약</div>
          <span className="text-[10px] font-black px-2 py-1 rounded-full border border-rose-200 bg-rose-50 text-rose-700">
            APR
          </span>
        </div>

        <button
          className="w-full py-2.5 rounded-lg font-bold text-white shadow-sm"
          style={{ backgroundColor: config.theme.primaryColor }}
          onClick={() => alert('APR 전용 계약 생성 플로우')}
        >
          APR 계약 생성
        </button>

        <div className="mt-4">
          <label className="text-xs font-bold text-rose-500">계약명</label>
          <input
            className="mt-1 w-full px-3 py-2 border border-rose-200 rounded-lg outline-none focus:ring-2 focus:ring-rose-200"
            value={query}
            onChange={(e) => {
              const next = new URLSearchParams(searchParams.toString());
              const v = e.target.value;
              if (v) next.set('q', v);
              else next.delete('q');
              if (!next.get('tab')) next.set('tab', tab);
              router.replace(buildUrl(pathname, next));
            }}
            placeholder="APR 계약 검색"
          />
        </div>

        <button
          className="mt-3 w-full py-2 rounded-lg border border-rose-200 bg-rose-50 font-bold text-rose-800"
          onClick={() => {
            const next = new URLSearchParams(searchParams.toString());
            next.delete('q');
            next.delete('tab');
            router.replace(buildUrl(pathname, next));
          }}
        >
          필터 초기화
        </button>
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

