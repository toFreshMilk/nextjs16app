'use client';

import { useEffect } from 'react';
import { useObservable } from '@/core/hooks/useObservable';
import { dashboardStore, dashboardStats$ } from '../store/dashboard.store';
import StatCard from '@/uikit/card/StatCard';

export default function DashboardStatsWidget() {
    const stats = useObservable(dashboardStats$, {
        pendingContracts: 0,
        activeAdvisories: 0,
        totalUsers: 0,
        loaded: false,
    });

    useEffect(() => {
        dashboardStore.loadStats();
    }, []);

    if (!stats.loaded) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="std-card h-32 animate-pulse bg-brand-surface/50"
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in">
            <StatCard
                label="진행 중 계약"
                value={`${stats.pendingContracts}건`}
                variant="blue"
            />
            <StatCard
                label="활성 자문"
                value={`${stats.activeAdvisories}건`}
                variant="green"
            />
            <StatCard
                label="전체 사용자"
                value={`${stats.totalUsers}명`}
                variant="purple"
            />
        </div>
    );
}
