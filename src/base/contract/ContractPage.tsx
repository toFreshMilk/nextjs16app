'use client';

import React from 'react';
import StandardLayout from '@/base/layout/StandardLayout';

export default function ContractPage() {
    return (
        <StandardLayout>
            <h1 className="text-2xl font-bold mb-6">계약 관리</h1>
            <div className="bg-white p-6 rounded shadow-sm min-h-[400px]">
                <p className="text-gray-500">계약 목록 리스트가 들어갈 영역입니다.</p>
                {/* 추후 RxJS로 데이터 바인딩 */}
            </div>
        </StandardLayout>
    );
}
