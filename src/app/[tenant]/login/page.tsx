import { getTenantComponent } from '@/core/config/tenant.config';

export default async function LoginPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  const Component = await getTenantComponent(tenant, 'LoginPage');
  return <Component />;
}

