import { getTenantComponent } from '@/core/config/tenant.config';

interface PageProps {
    params: Promise<{ tenant: string }>;
}

export default async function DashboardPage({ params }: PageProps) {
    const { tenant } = await params;

    const Component = await getTenantComponent(tenant, 'DashboardPage');

    return <Component />;
}
