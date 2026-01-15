import { getTenantComponent, getTenantPage, getTenantService } from '@/core/config/tenant.config';

export default async function ContractPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  const Page = await getTenantPage(tenant, 'ContractPage');
  const contractService = await getTenantService<any>(tenant, 'ContractService');
  const contracts = await contractService.getContracts();
  const ContractList = await getTenantComponent(tenant, 'ContractList');
  return <Page contracts={contracts} list={<ContractList contracts={contracts} />} />;
}

