'use client';

import { useAppConfig } from '@/core/contexts/AppConfigContext';
// import AprReportSection from './components/AprReportSection'; // 필요시 추가

export default function AprDashboardPage() {
    const { config } = useAppConfig();

    return (
        <div className="p-6 bg-rose-50 min-h-screen">
            <h1 className="text-3xl font-bold text-rose-900 mb-6">
                {config.name} Executive Dashboard
            </h1>

            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-rose-100">
                    <h2 className="text-xl font-bold mb-4">Global Sales Contract</h2>
                    <p className="text-gray-500">APR 전용 차트 영역 (준비중)</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-rose-100">
                    <h2 className="text-xl font-bold mb-4">Compliance Risk</h2>
                    <p className="text-gray-500">법적 리스크 분석 리포트</p>
                </div>
            </div>
        </div>
    );
}
