'use client';

import React from 'react';
import { getTenantConfig } from '@/config/tenant.config';
import StatCard from '@/widgets/StatCard';
import SimpleChart from '@/widgets/SimpleChart';

export default function DefaultDashboard() {
    const config = getTenantConfig();

    return (
        <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
            <header className="mb-8">
                <h1 className={`text-3xl font-bold ${config.theme.primaryColor}`}>
                    {config.name} Dashboard
                </h1>
                <p className="text-gray-600">표준 레이아웃 모드입니다.</p>
            </header>

            {/* 상단 통계 카드 영역 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="진행중인 계약" value="128건" />
                <StatCard title="법률 자문" value="42건" />
                <StatCard title="소송 현황" value="15건" />
            </div>

            {/* 메인 콘텐츠 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-semibold mb-4">계약 현황 차트</h2>
                    <SimpleChart />
                </div>

                {/* Config에 따라 공지사항 표시 여부 결정 */}
                {config.features.showNotices && (
                    <div className="bg-white p-6 rounded-lg border shadow-sm h-64">
                        <h2 className="text-xl font-semibold mb-4">📢 공지사항</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                            <li>시스템 정기 점검 안내</li>
                            <li>개인정보 처리방침 변경</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
