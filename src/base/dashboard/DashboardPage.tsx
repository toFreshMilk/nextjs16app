'use client';

import React from 'react';
import StandardLayout from '@/base/layout/StandardLayout';
import StatCard from '@/uikit/card/StatCard';
import SimpleChart from '@/uikit/chart/SimpleChart';
import { useAppConfig } from '@/core/contexts/AppConfigContext';

export default function DashboardPage() {
    const config = useAppConfig();

    return (
        <StandardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {config.name} 표준 환경에 접속하셨습니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard title="진행중인 계약" value="128건" />
                    <StatCard title="법률 자문" value="42건" />
                    <StatCard title="소송 현황" value="15건" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">월별 현황</h2>
                        <SimpleChart />
                    </div>

                    {config.features.showNotices && (
                        <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
                            <h2 className="text-lg font-semibold mb-4">📢 공지사항</h2>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li>🔹 서비스 정기 점검 안내</li>
                                <li>🔹 개인정보 처리방침 개정</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </StandardLayout>
    );
}
