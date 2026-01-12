// 📁 src/standard/dashboard/DashboardPage.tsx

'use client';

import { useAppConfig } from '@/core/contexts/AppConfigContext';

export default function DashboardPage() {
    const { tenant } = useAppConfig();

    return (
        <div>
            <h1>Dashboard</h1>

            {/* ✅ AI 기능 활성화 시만 표시 */}
            {tenant.features.ai && (
                <div className="ai-widget">
                    <h2>AI 추천</h2>
                    <p>AI가 분석한 계약 리스크...</p>
                </div>
            )}

            {/* ✅ 이메일 기능 활성화 시만 표시 */}
            {tenant.features.email && (
                <button>이메일 발송</button>
            )}

            {/* ✅ 분석 기능 활성화 시만 표시 */}
            {tenant.features.analytics && (
                <div className="analytics-chart">
                    <h2>통계 분석</h2>
                </div>
            )}
        </div>
    );
}
