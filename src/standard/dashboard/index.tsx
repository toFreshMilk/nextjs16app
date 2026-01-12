'use client';

import { lazy, Suspense } from 'react';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { getTenantComponentLoader } from '@/core/config/tenant.config';

export default function DashboardRegistry() {
    const { tenant } = useAppConfig();
    const Page = lazy(getTenantComponentLoader(tenant.key, 'dashboard'));

    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center h-96 text-brand-muted animate-pulse">
                    Loading Dashboard...
                </div>
            }
        >
            <Page />
        </Suspense>
    );
}
