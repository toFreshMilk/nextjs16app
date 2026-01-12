'use client';

import PageContainer from '@/uikit/layout/PageContainer';
import ContractListServices from '@/standard/contract/services/ContractListServices';

export default function AprContractPage() {
    return (
        <PageContainer
            title="APR 계약 관리"
            description="APR 전용 계약 관리 시스템"
            action={
                <div className="flex gap-2">
                    <button className="btn-secondary">📥 Import</button>
                    <button className="btn-primary">➕ 신규 계약</button>
                </div>
            }
        >
            <div className="space-y-6">
                {/* APR 전용 필터 */}
                <div className="bg-brand-surface/50 rounded-xl p-4 border border-brand-primary/20">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-brand-text">APR 필터:</span>
                        <select className="px-3 py-2 rounded bg-brand-bg border border-white/10 text-brand-text text-sm">
                            <option>전체</option>
                            <option>긴급</option>
                            <option>검토중</option>
                        </select>
                        <input
                            type="text"
                            placeholder="계약명 검색..."
                            className="flex-1 px-3 py-2 rounded bg-brand-bg border border-white/10 text-brand-text text-sm"
                        />
                    </div>
                </div>

                <ContractListServices />
            </div>
        </PageContainer>
    );
}
