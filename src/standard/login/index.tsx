'use client';

import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { getTenantComponentLoader } from '@/core/config/tenant.config';
import LoginPage from './LoginPage';
import { lazy, Suspense } from 'react';

// ✅ 표준 로더 (기본값)
const standardLoader = () => Promise.resolve({ default: LoginPage });

export default function LoginRegistry() {
    const { tenant } = useAppConfig();

    // ✅ 커스텀 로더가 있으면 덮어쓰고, 없으면 표준 사용
    const loader = getTenantComponentLoader(tenant.key, 'login') ?? standardLoader;

    const Page = lazy(loader);

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
