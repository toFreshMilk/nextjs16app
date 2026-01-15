import { getTenantPage } from '@/core/config/tenant.config';

export default async function ContractPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  const Page = await getTenantPage(tenant, 'ContractPage');
  return <Page />;
}

