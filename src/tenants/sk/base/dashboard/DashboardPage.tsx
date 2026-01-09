'use client';

import React from 'react';
import StandardLayout from '@/base/layout/StandardLayout'; // 레이아웃은 표준을 쓴다고 가정

export default function SkDashboardPage() {
    return (
        <StandardLayout>
            <div className="border-l-4 border-red-600 pl-4 bg-red-50 p-6 rounded mb-6">
                <h1 className="text-2xl font-bold text-red-700">SK 전용 대시보드</h1>
                <p>이 화면은 SK 테넌트에서만 보입니다.</p>
            </div>
            {/* SK만의 커스텀 위젯 배치 */}
        </StandardLayout>
    );
}
