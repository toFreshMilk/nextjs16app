'use client';

import dynamic from 'next/dynamic';
import { useAppConfig } from '@/core/contexts/AppConfigContext';

const DefaultDashboard = dynamic(() => import('./DashboardPage'), {
    loading: () => <div>Loading...</div>
});

// SK 전용 대시보드 (파일 생성 후 주석 해제)
const SkDashboard = dynamic(() => import('@/tenants/sk/base/dashboard/DashboardPage'), {
    loading: () => <div>Loading SK...</div>
});

export default function DashboardSwitcher() {
    const config = useAppConfig();

    if (config.id === 'sk') {
        return <SkDashboard />;
    }

    return <DefaultDashboard />;
}
