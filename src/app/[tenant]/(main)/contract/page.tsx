import { getTenantComponent } from '@/core/config/tenant.config';

export default async function ContractPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  const Component = await getTenantComponent(tenant, 'ContractPage');
  return <Component />;
}

