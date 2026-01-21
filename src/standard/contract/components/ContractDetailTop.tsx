// src/standard/contract/components/ContractDetailTop.tsx
'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { executeServiceAction } from '@/core/services/serviceAction';
import type { StandardContractDto } from '@/standard/contract/services/contract.service';

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

function getStatusLabel(status: string) {
  const s = normalizeStatus(status);
  if (!s) return '서명/날인대기';
  if (s === 'draft') return '초안';
  if (s === 'review') return '검토';
  if (s === 'active') return '서명/날인대기';
  if (s === 'completed' || s === 'complete' || s === 'done') return '완료';
  return status ?? '서명/날인대기';
}

interface Props {
  data: StandardContractDto;
  tenantId: string;
}

// Submit Button Component (로딩 상태 표시)
function ApproveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-3 py-2 rounded-lg border border-blue-200 bg-blue-600 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
    >
      {pending ? '처리중...' : '승인하기'}
    </button>
  );
}

const initialState = { success: false, message: '' };

export default function ContractDetailTop({ data: contract, tenantId }: Props) {
  const router = useRouter();
  const { config } = useAppConfig();

  const [state, formAction] = useActionState(executeServiceAction, initialState);

  const step = statusToStep(contract?.status ?? '');

  // [변경] 객체 리터럴 참조도 컴파일러가 관리함
  const stepMap = { draft: 0, review: 1, active: 2, done: 3 };
  const stepIndex = stepMap[step];

  const title = contract?.title ?? '계약 상세';
  const statusLabel = getStatusLabel(contract?.status ?? '');

  // [변경] 정적 배열도 컴파일러가 알아서 상수 처리함
  const steps = [
    { key: 'draft', label: '초안' },
    { key: 'review', label: '검토' },
    { key: 'active', label: '서명 및 회수' },
    { key: 'done', label: '완료' },
  ];

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
          {/* 승인 버튼 (상태가 APPROVED가 아닐 때만 표시) */}
          {contract.status !== 'APPROVED' && (
            <form action={formAction}>
              {/* [핵심] Common Action용 메타데이터 주입 */}
              <input type="hidden" name="tenantId" value={tenantId} />
              <input type="hidden" name="serviceKey" value="ContractService" />
              <input type="hidden" name="methodName" value="approve" />

              {/* 인자는 JSON 문자열로 직렬화: [tenantId, contractId] */}
              <input type="hidden" name="args" value={JSON.stringify([tenantId, contract.id])} />

              {/* 성공 시 갱신할 경로 */}
              <input
                type="hidden"
                name="revalidateUrl"
                value={`/${tenantId}/contract, /${tenantId}/contract/${contract.id}`}
              />

              <ApproveButton />
            </form>
          )}

          <button className="px-3 py-2 rounded-lg border border-slate-200 bg-amber-300 font-bold text-slate-900">
            삭제하기
          </button>
          <button className="px-3 py-2 rounded-lg border border-rose-200 bg-rose-500 font-bold text-white">
            계약 종료
          </button>
        </div>
      </div>

      {/* 에러/성공 메시지 표시 */}
      {state?.message && !state?.success && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm font-bold">{state.message}</div>
      )}

      {/* 성공 메시지 (옵션) */}
      {state?.success && state?.message && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm font-bold">{state.message}</div>
      )}

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
