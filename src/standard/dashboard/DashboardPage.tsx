import PageContainer from '@/uikit/layout/PageContainer';
import DashboardStatsServices from '@/standard/dashboard/services/DashboardStatsServices';

export default function DashboardPage() {
    return (
        <PageContainer title="대시보드">
            {/* ✅ 표준 페이지임을 명확히 표시 */}
            <div className="bg-blue-500/20 border-2 border-blue-500 rounded-xl p-4 mb-6">
                <div className="text-blue-400 font-bold text-lg">
                    ⚠️ 표준 대시보드 (Standard Dashboard)
                </div>
                <div className="text-blue-300 text-sm mt-1">
                    커스텀 대시보드가 없는 테넌트는 이 화면을 봅니다
                </div>
            </div>

            <div className="space-y-8">
                <DashboardStatsServices />

                <div className="std-card h-64 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-brand-muted text-lg font-medium mb-2">
                            📊 차트 영역
                        </div>
                        <p className="text-sm text-brand-muted/70">
                            표준 대시보드 레이아웃
                        </p>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
