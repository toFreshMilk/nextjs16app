'use client';

import { useEffect } from 'react';
import PageContainer from '@/uikit/layout/PageContainer';
import DashboardStatsWidget from '@/standard/dashboard/widgets/DashboardStatsWidget';
import SimpleChart from '@/uikit/chart/SimpleChart';

export default function AprDashboardPage() {
    useEffect(() => {
        console.log('🔴 APR 커스텀 대시보드 로드됨');
    }, []);

    const chartData = [
        { label: '1월', value: 45 },
        { label: '2월', value: 67 },
        { label: '3월', value: 89 },
        { label: '4월', value: 72 },
    ];

    return (
        <PageContainer
            title="APR 대시보드"
            description="APR 전용 커스텀 레이아웃"
        >
            <div className="space-y-8">
                {/* ✅ APR 전용임을 명확히 표시 */}
                <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-2xl">
                            🔴
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-red-400">APR 커스텀 대시보드 활성화</h3>
                            <p className="text-sm text-red-300">이 화면은 APR 전용 커스텀 페이지입니다</p>
                        </div>
                    </div>
                </div>

                <DashboardStatsWidget />

                <div className="std-card">
                    <h3 className="text-lg font-bold text-brand-text mb-6">월별 계약 추이</h3>
                    <SimpleChart data={chartData} color="#EA002C" />
                </div>
            </div>
        </PageContainer>
    );
}
