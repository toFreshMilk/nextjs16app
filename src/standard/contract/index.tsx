'use client';

import dynamic from 'next/dynamic';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import ContractPage from './ContractPage';

const standardLoader = () => Promise.resolve({ default: ContractPage });

export default function ContractRegistry() {
    const { tenant } = useAppConfig();
    const loader = tenant.customComponents?.contract ?? standardLoader;

    const Page = dynamic(loader, {
        loading: () => <div className="p-12 text-center text-brand-muted">Loading...</div>,
    });

    return <Page />;
}
