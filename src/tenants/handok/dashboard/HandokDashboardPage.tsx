'use client';

import PageContainer from '@/uikit/layout/PageContainer';
import DashboardStatsServices from '@/standard/dashboard/services/DashboardStatsServices';

export default function HandokDashboardPage() {
    return (
        <PageContainer
            title="Handok 대시보드"
            description="한독 제약 전용 법무 관리 시스템"
        >
            <div className="space-y-8">
                {/* Handok 전용 헤더 */}
                <div className="bg-gradient-to-r from-green-500/20 to-green-500/5 rounded-xl p-6 border-l-4 border-green-500">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-2xl">
                            🏥
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-brand-text">Handok Pharma Legal System</h3>
                            <p className="text-sm text-brand-muted">제약 산업 특화 법무 관리</p>
                        </div>
                    </div>
                </div>

                <DashboardStatsServices />

                {/* Handok 특화 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="std-card text-center">
                        <div className="text-3xl mb-2">📋</div>
                        <div className="text-2xl font-bold text-green-400">12건</div>
                        <div className="text-sm text-brand-muted mt-1">임상 계약</div>
                    </div>
                    <div className="std-card text-center">
                        <div className="text-3xl mb-2">🔬</div>
                        <div className="text-2xl font-bold text-blue-400">8건</div>
                        <div className="text-sm text-brand-muted mt-1">R&D 협약</div>
                    </div>
                    <div className="std-card text-center">
                        <div className="text-3xl mb-2">⚖️</div>
                        <div className="text-2xl font-bold text-purple-400">3건</div>
                        <div className="text-sm text-brand-muted mt-1">특허 관련</div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
