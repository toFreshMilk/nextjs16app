'use client';

import { lazy, Suspense } from 'react';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { getTenantComponentLoader } from '@/core/config/tenant.config';

export default function LoginRegistry() {
    const { tenant } = useAppConfig();
    const Page = lazy(getTenantComponentLoader(tenant.key, 'login'));

    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-screen text-brand-muted">
                    Loading...
                </div>
            }
        >
            <Page />
        </Suspense>
    );
}
