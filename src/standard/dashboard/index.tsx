'use client';

import dynamic from 'next/dynamic';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import DashboardPage from './DashboardPage';

const standardLoader = () => Promise.resolve({ default: DashboardPage });

export default function DashboardRegistry() {
    const { tenant } = useAppConfig();

    // ✅ 디버깅 로그
    console.log('🎯 Dashboard Registry:', {
        tenantKey: tenant.key,
        hasCustomDashboard: !!tenant.customComponents?.dashboard,
    });

    const loader = tenant.customComponents?.dashboard ?? standardLoader;

    const Page = dynamic(loader, {
        loading: () => (
            <div className="flex items-center justify-center h-96 text-brand-muted animate-pulse">
                Loading Dashboard...
            </div>
        ),
    });

    return <Page />;
}
