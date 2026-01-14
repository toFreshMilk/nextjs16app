import { getTenantComponent } from '@/core/config/tenant.config';

interface PageProps {
  params: Promise<{ tenant: string }>;
}

export default async function LoginPage({ params }: PageProps) {
  const { tenant } = await params;
  const Component = await getTenantComponent(tenant, 'LoginPage');
  
  return <Component />;
}

