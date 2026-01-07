'use client';

import React from 'react';
import { useAppConfig } from '@/providers/AppConfigContext';
import StatCard from '@/widgets/StatCard';
import SimpleChart from '@/widgets/SimpleChart';

export default function DefaultDashboard() {
    // Hook을 사용하여 현재 활성화된 고객사 설정 가져오기
    const config = useAppConfig();

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <header className="mb-8 border-b pb-4">
                {/* 설정된 Primary Color 적용 (Tailwind 클래스 + 인라인 스타일 조합) */}
                <h1
                    className="text-3xl font-bold"
                    style={{ color: config.theme.primaryColor || 'black' }} // Tailwind 클래스 매핑이 안될 경우 대비
                >
                    {config.name}
                </h1>
                <p className="text-gray-500 mt-2">
                    {config.id === 'default'
                        ? '표준 서비스 환경입니다.'
                        : `${config.name} 전용 환경입니다.`}
                </p>
            </header>

            {/* 상단 통계 영역 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="진행중인 계약" value="128건" />
                <StatCard title="법률 자문" value="42건" />
                <StatCard title="소송 현황" value="15건" />
            </div>

            {/* 메인 콘텐츠 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">월별 계약 추이</h2>
                        <SimpleChart />
                    </div>
                </div>

                {/* Config의 features 플래그에 따라 공지사항 표시/숨김 */}
                {config.features.showNotices && (
                    <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">📢 공지사항</h2>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start">
                                <span className="mr-2">🔹</span>
                                <span>2026년 정기 시스템 점검 안내</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">🔹</span>
                                <span>개인정보 처리방침 변경 건</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">🔹</span>
                                <span>신규 전자서명 기능 업데이트</span>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
