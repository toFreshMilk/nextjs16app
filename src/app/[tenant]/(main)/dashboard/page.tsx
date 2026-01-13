import { loadTenantConfig } from '@/core/config/tenant.config';

export default async function DashboardPage({ params }: { params: Promise<{ tenant: string }> }) {
    const { tenant } = await params;
    const config = await loadTenantConfig(tenant);
    const Component = config.components.DashboardPage;
    return <Component />;
}
