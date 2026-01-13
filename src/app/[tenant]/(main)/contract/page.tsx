import { getTenantComponent } from '@/core/utils/component-loader';

interface PageProps {
    params: Promise<{ tenant: string }>;
}

export default async function ContractPage({ params }: PageProps) {
    const { tenant } = await params;

    const Component = await getTenantComponent(tenant, 'ContractPage');

    return <Component />;
}
