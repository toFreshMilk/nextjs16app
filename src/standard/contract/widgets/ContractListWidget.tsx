'use client';

import { useEffect } from 'react';
import { useObservable } from '@/core/hooks/useObservable';
import { contractStore, contracts$ } from '../store/contract.store';

const STATUS_MAP = {
    DRAFT: { label: '작성중', color: 'badge-info' },
    REVIEW: { label: '검토중', color: 'badge-warning' },
    SIGNED: { label: '체결완료', color: 'badge-success' },
    EXPIRED: { label: '만료', color: 'badge-error' },
};

export default function ContractListWidget() {
    const contracts = useObservable(contracts$, []);

    useEffect(() => {
        contractStore.fetchContracts();
    }, []);

    if (contracts.length === 0) {
        return (
            <div className="std-card text-center py-12">
                <p className="text-brand-muted">계약 데이터를 불러오는 중...</p>
            </div>
        );
    }

    return (
        <div className="std-card overflow-hidden fade-in">
            <table className="std-table">
                <thead>
                <tr>
                    <th>계약 ID</th>
                    <th>계약명</th>
                    <th>상대방</th>
                    <th>상태</th>
                    <th>계약일</th>
                    <th className="text-right">계약금액</th>
                </tr>
                </thead>
                <tbody>
                {contracts.map((contract) => {
                    const statusInfo = STATUS_MAP[contract.status];
                    return (
                        <tr key={contract.id}>
                            <td className="font-mono text-brand-primary">{contract.id}</td>
                            <td className="font-medium text-brand-text">{contract.title}</td>
                            <td className="text-brand-muted">{contract.counterparty}</td>
                            <td>
                  <span className={`badge ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                            </td>
                            <td className="text-brand-muted">{contract.signDate}</td>
                            <td className="text-right text-brand-text font-semibold">
                                {contract.amount > 0
                                    ? `${(contract.amount / 10000).toLocaleString()}만원`
                                    : '-'}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}
