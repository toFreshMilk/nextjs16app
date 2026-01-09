
// src/base/statistics/StatisticsPage.tsx
'use client';
import React from 'react';
import StandardLayout from '@/base/layout/StandardLayout';

export default function StatisticsPage() {
    return (
        <StandardLayout>
            <h1 className="text-2xl font-bold mb-6">통계</h1>
            <div className="bg-white p-6 rounded shadow-sm min-h-[400px]">
                <p className="text-gray-500">통계 차트 대시보드 영역</p>
            </div>
        </StandardLayout>
    );
}