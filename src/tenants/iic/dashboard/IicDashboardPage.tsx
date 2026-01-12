'use client';

import { useEffect, useState } from 'react';
import PageContainer from '@/uikit/layout/PageContainer';
import DashboardStatsWidget from '@/standard/dashboard/widgets/DashboardStatsWidget';
import SimpleChart from '@/uikit/chart/SimpleChart';

export default function IicDashboardPage() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const innovationData = [
        { label: 'Q1', value: 85 },
        { label: 'Q2', value: 92 },
        { label: 'Q3', value: 78 },
        { label: 'Q4', value: 95 },
    ];

    return (
        <PageContainer
            title="IIC Innovation Dashboard"
            description="실시간 혁신 지표 모니터링"
            action={
                <div className="text-right">
                    <div className="text-xs text-brand-muted">실시간 업데이트</div>
                    <div className="text-lg font-mono text-orange-400">
                        {time.toLocaleTimeString('ko-KR')}
                    </div>
                </div>
            }
        >
            <div className="space-y-8">
                {/* IIC 전용 실시간 상태 */}
                <div className="bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent rounded-2xl p-8 border-2 border-orange-500/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 text-9xl opacity-5">🚀</div>
                    <div className="relative z-10">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-brand-text mb-2">IIC Innovation Center</h2>
                                <p className="text-brand-muted">차세대 법무 혁신 플랫폼</p>
                            </div>
                            <div className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500 text-green-400 text-sm font-bold animate-pulse">
                                ● LIVE
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: '⚡', label: 'Active Projects', value: '24' },
                                { icon: '🎯', label: 'Success Rate', value: '98%' },
                                { icon: '🔥', label: 'Innovation Score', value: '9.5' },
                                { icon: '🌟', label: 'Team Members', value: '156' },
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-brand-bg/50 rounded-xl p-4 text-center">
                                    <div className="text-3xl mb-2">{stat.icon}</div>
                                    <div className="text-2xl font-bold text-orange-400">{stat.value}</div>
                                    <div className="text-xs text-brand-muted mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <DashboardStatsWidget />

                {/* IIC 혁신 지표 차트 */}
                <div className="std-card">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-brand-text">혁신 지수 추이</h3>
                        <span className="text-xs px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
              Innovation Index
            </span>
                    </div>
                    <SimpleChart data={innovationData} color="#FF6B00" />
                </div>

                {/* IIC 특화 정보 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="std-card group cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="text-4xl group-hover:scale-110 transition-transform">💡</div>
                            <div>
                                <div className="text-2xl font-bold text-orange-400">12</div>
                                <div className="text-sm text-brand-muted">신규 아이디어</div>
                            </div>
                        </div>
                    </div>
                    <div className="std-card group cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="text-4xl group-hover:scale-110 transition-transform">🎨</div>
                            <div>
                                <div className="text-2xl font-bold text-blue-400">8</div>
                                <div className="text-sm text-brand-muted">진행 중 프로젝트</div>
                            </div>
                        </div>
                    </div>
                    <div className="std-card group cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="text-4xl group-hover:scale-110 transition-transform">🏆</div>
                            <div>
                                <div className="text-2xl font-bold text-purple-400">5</div>
                                <div className="text-sm text-brand-muted">완료된 혁신</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
