'use client';

import { BehaviorSubject } from 'rxjs';

export interface Contract {
    id: string;
    title: string;
    status: 'DRAFT' | 'REVIEW' | 'SIGNED' | 'EXPIRED';
    counterparty: string;
    signDate: string;
    amount: number;
}

const _contracts$ = new BehaviorSubject<Contract[]>([]);

export const contracts$ = _contracts$.asObservable();

export const contractStore = {
    contracts$,

    async fetchContracts() {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const mockData: Contract[] = [
            {
                id: 'C001',
                title: '소프트웨어 라이선스 계약',
                status: 'SIGNED',
                counterparty: '(주)테크솔루션',
                signDate: '2026-01-05',
                amount: 50000000,
            },
            {
                id: 'C002',
                title: '비밀유지계약 (NDA)',
                status: 'REVIEW',
                counterparty: 'ABC 컨설팅',
                signDate: '2026-01-10',
                amount: 0,
            },
            {
                id: 'C003',
                title: '유지보수 서비스 계약',
                status: 'DRAFT',
                counterparty: '(주)글로벌시스템',
                signDate: '2026-01-15',
                amount: 30000000,
            },
        ];

        _contracts$.next(mockData);
    },

    reset() {
        _contracts$.next([]);
    },
};
