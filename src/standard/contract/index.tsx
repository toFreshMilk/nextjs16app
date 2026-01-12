'use client';

import { lazy, Suspense } from 'react';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { getTenantComponentLoader } from '@/core/config/tenant.config';

export default function ContractRegistry() {
    const { tenant } = useAppConfig();
    const Page = lazy(getTenantComponentLoader(tenant.key, 'contract'));

    return (
        <Suspense
            fallback={
                <div className="p-12 text-center text-brand-muted">
                    Loading...
                </div>
            }
        >
            <Page />
        </Suspense>
    );
}
