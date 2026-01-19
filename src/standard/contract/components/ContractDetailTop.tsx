// src/standard/contract/components/ContractDetailTop.tsx
'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import type { ContractRow } from '@/core/config/tenant.config';

type StepKey = 'draft' | 'review' | 'active' | 'done';

function normalizeStatus(s: string) {
  return (s ?? '').trim().toLowerCase();
}

function statusToStep(status: string): StepKey {
  const s = normalizeStatus(status);
  if (s === 'draft') return 'draft';
  if (s === 'review') return 'review';
  if (s === 'active' || s.includes('sign')) return 'active';
  if (s === 'done' || s === 'completed' || s === 'complete') return 'done';
  return 'active';
}

interface Props {
  data: ContractRow;
}

export default function ContractDetailTop({ data: contract }: Props) {
  const router = useRouter();
  const { config } = useAppConfig();

  // useEffect 및 useState 로딩 제거 -> props 데이터 즉시 사용

  const step = useMemo(() => statusToStep(contract?.status ?? ''), [contract?.status]);
  const stepIndex = useMemo(() => ({ draft: 0, review: 1, active: 2, done: 3 }[step]), [step]);
  const title = contract?.title ?? '계약 상세';

  const statusLabel = useMemo(() => {
    const s = normalizeStatus(contract?.status ?? '');
    if (!s) return '서명/날인대기';
    if (s === 'draft') return '초안';
    if (s === 'review') return '검토';
    if (s === 'active') return '서명/날인대기';
    if (s === 'completed' || s === 'complete' || s === 'done') return '완료';
    return contract?.status ?? '서명/날인대기';
  }, [contract?.status]);

  const steps = useMemo(
      () => [
        { key: 'draft', label: '초안' },
        { key: 'review', label: '검토' },
        { key: 'active', label: '서명 및 회수' },
        { key: 'done', label: '완료' },
      ],
      []
  );

  return (
      <section className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 min-w-0">
            <button
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
                onClick={() => router.back()}
            >
              <span aria-hidden>←</span>
              <span>목록으로</span>
            </button>

            <div className="flex items-center gap-3 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight truncate">{title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button className="px-3 py-2 rounded-lg border border-slate-200 bg-amber-300 font-bold text-slate-900">
              삭제하기
            </button>
            <button className="px-3 py-2 rounded-lg border border-rose-200 bg-rose-500 font-bold text-white">
              계약 종료
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <div className="text-center font-bold text-slate-900">
              본 계약은 <span className="text-rose-500">{statusLabel}</span> 상태입니다.
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="relative">
              <div className="h-[2px] bg-slate-200" />
              <div
                  className="h-[2px] absolute top-0 left-0"
                  style={{
                    width: `${(stepIndex / 3) * 100}%`,
                    backgroundColor: config.theme.primaryColor,
                  }}
              />

              <div className="mt-6 grid grid-cols-4 gap-4">
                {steps.map((s, idx) => {
                  const active = idx <= stepIndex;
                  return (
                      <div key={s.key} className="text-center">
                        <div
                            className="mx-auto h-2 w-2 rounded-full"
                            style={{
                              backgroundColor: active ? config.theme.primaryColor : '#cbd5e1',
                            }}
                        />
                        <div className={`mt-2 text-sm font-bold ${active ? 'text-slate-900' : 'text-slate-400'}`}>
                          {s.label}
                        </div>
                      </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
