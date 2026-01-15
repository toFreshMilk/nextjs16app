import { getTenantComponent } from '@/core/config/tenant.config';

export default async function DashboardPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  const Component = await getTenantComponent(tenant, 'DashboardPage');
  return <Component />;
}

