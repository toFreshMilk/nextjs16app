'use client';

import dynamic from 'next/dynamic';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import LoginPage from './LoginPage';

const standardLoader = () => Promise.resolve({ default: LoginPage });

export default function LoginRegistry() {
    const { tenant } = useAppConfig();
    const loader = tenant.customComponents?.login ?? standardLoader;

    const Page = dynamic(loader, {
        loading: () => (
            <div className="flex items-center justify-center min-h-screen text-brand-muted">
                Loading...
            </div>
        ),
    });

    return <Page />;
}
