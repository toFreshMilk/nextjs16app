'use client';

import React from 'react';
import StatCard from '@/widgets/StatCard';
import SimpleChart from '@/widgets/SimpleChart';

// SK는 완전히 다른 구조(사이드바 스타일)를 원함
export default function SkDashboard() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* SK 전용 빨간색 사이드바 */}
            <aside className="w-64 bg-red-900 text-white p-6">
                <h1 className="text-2xl font-bold mb-10">SK Legal</h1>
                <nav className="space-y-4">
                    <div className="font-bold text-red-200">대시보드</div>
                    <div>전자계약</div>
                </nav>
            </aside>

            {/* 메인 영역 */}
            <main className="flex-1 p-8">
                <div className="mb-6 bg-white p-4 rounded shadow border-l-4 border-red-600">
                    <h2 className="text-lg font-bold text-gray-800">SK 전용 커스텀 모듈입니다.</h2>
                    <p className="text-sm text-gray-500">기본 레이아웃과 완전히 다른 구조를 가집니다.</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                    <StatCard title="SK 전체 계약" value="1,024건" className="border-red-200" />
                    <StatCard title="계열사 이슈" value="5건" className="border-red-200" />
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h3 className="mb-4 font-bold">그룹사 통계</h3>
                    <SimpleChart />
                </div>
            </main>
        </div>
    );
}
