// src/standard/contract/components/ContractDetailLeft.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTenant } from '@/core/hooks/useTenant';
import { getTenantService } from '@/core/config/tenant.config';
import type { ContractRow } from '@/core/config/tenant.config';

function formatAmount(v?: string) {
  if (!v) return '-';
  return v;
}

function safeText(v?: string) {
  return v && String(v).trim() ? v : '-';
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="font-black text-slate-900">{title}</div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 gap-3 py-3 border-b border-slate-100 last:border-b-0">
      <div className="text-sm font-bold text-slate-500">{label}</div>
      <div className="col-span-2 text-sm text-slate-900">{value}</div>
    </div>
  );
}

export default function ContractDetailLeft() {
  const params = useParams<{ tenant: string; id: string }>();
  const { tenantId } = useTenant();
  const contractId = params?.id;

  const [contract, setContract] = useState<ContractRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const service = await getTenantService(tenantId, 'ContractService');
        const rows = await service.getContracts();
        const found = (rows ?? []).find((r) => String(r.id) === String(contractId));
        if (!cancelled) {
          setContract(
            found ?? {
              id: contractId ?? '-',
              title: '계약 상세',
              status: 'Active',
            }
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [tenantId, contractId]);

  const derived = useMemo(() => {
    const base = contract ?? { id: contractId ?? '-', title: '계약 상세', status: 'Active' };
    return {
      ...base,
      partner: base.partner ?? 'Apple',
      category: base.category ?? '테스트',
      templateName: base.templateName ?? '법률QA체결계약서',
      requester: base.requester ?? '법률_생성자',
      reviewer: base.reviewer ?? '법률_검토자',
      documentCode: base.documentCode ?? '-',
      date: base.date ?? '26/01/12',
      amount: base.amount ?? '231,213',
    };
  }, [contract, contractId]);

  return (
    <section className="space-y-4">
      <Card title="기본정보">
        {loading ? (
          <div className="text-sm text-slate-500">데이터를 불러오는 중…</div>
        ) : (
          <div>
            <InfoRow label="기안자" value={safeText(derived.requester)} />
            <InfoRow label="계약 상대방" value={safeText(derived.partner)} />
            <InfoRow label="카테고리" value={safeText(derived.category)} />
            <InfoRow label="템플릿명" value={safeText(derived.templateName)} />
            <InfoRow label="검토자" value={safeText(derived.reviewer)} />
            <InfoRow label="계약금액" value={<span className="font-bold">{formatAmount(derived.amount)} <span className="text-slate-400 text-xs">KRW</span></span>} />
            <InfoRow label="전자결재 문서코드" value={safeText(derived.documentCode)} />
            <InfoRow label="전자결재 진행상태" value="-" />
          </div>
        )}
      </Card>

      <details className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" open>
        <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between">
          <div className="font-black text-slate-900">유저정보</div>
          <div className="text-slate-400">⌄</div>
        </summary>
        <div className="px-5 pb-5">
          <div className="text-sm text-slate-500">
            (데모) 유저정보 영역입니다. 실제 필드는 서비스 연동 시 채워집니다.
          </div>
        </div>
      </details>

      <details className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between">
          <div className="font-black text-slate-900">기타 정보</div>
          <div className="text-slate-400">⌄</div>
        </summary>
        <div className="px-5 pb-5">
          <div className="text-sm text-slate-500">
            (데모) 기타 정보 영역입니다.
          </div>
        </div>
      </details>

      <details className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" open>
        <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between">
          <div className="font-black text-slate-900">계약서</div>
          <div className="text-slate-400">⌄</div>
        </summary>
        <div className="px-5 pb-5">
          <div className="text-sm text-slate-500">
            (데모) 계약서 본문/첨부 영역입니다.
          </div>
        </div>
      </details>
    </section>
  );
}

