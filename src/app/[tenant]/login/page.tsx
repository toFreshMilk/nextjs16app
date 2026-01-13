import { loadTenantConfig } from '@/core/config/tenant.config';

interface PageProps { params: Promise<{ tenant: string }> }

export default async function LoginPage({ params }: PageProps) {
    const { tenant } = await params;
    const config = await loadTenantConfig(tenant);
    const Component = config.components.LoginPage; // Dynamic Component
    return <Component />;
}
