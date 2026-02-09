// src/app/[lang]/(main)/contract/page.tsx
import { getTenantComponent, getTenantService, getTenantId } from '@/core/config/tenant.config';
import type { StandardContractService } from '@/standard/contract/services/contract.service';

export default async function ContractPage() {
  // 1. 헤더에서 테넌트 ID 추출
  const tenant = await getTenantId();

  // 1. 컴포넌트와 서비스를 병렬로 로드
  const [Sidebar, Main, List, service] = await Promise.all([
    getTenantComponent(tenant, 'ContractSidebar'),
    getTenantComponent(tenant, 'ContractMain'),
    getTenantComponent(tenant, 'ContractList'),
    getTenantService<StandardContractService>(tenant, 'ContractService'),
  ]);

  // t함수를 구지 여기서 내려줘야하나? 필수로 쓰이니까 그게 좋겠지
  // 2. 데이터 페칭
  const contracts = await service.getContracts(tenant);

  return (
    <div className="flex gap-6 -m-10 p-10 bg-slate-50 min-h-[calc(100vh-64px)]">
      <Sidebar />
      <Main contracts={contracts} ListComponent={List} />
    </div>
  );
}
