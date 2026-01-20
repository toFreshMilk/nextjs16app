// src/app/[tenant]/(main)/contract/page.tsx
import { getTenantComponent, getTenantService } from '@/core/config/tenant.config';
import type { StandardContractService } from '@/standard/contract/services/contract.service';

export default async function ContractPage({ params }: { params: Promise<{ tenant: string }> }) {
    const { tenant } = await params;

    // 1. 컴포넌트와 서비스를 병렬로 로드
    const [Sidebar, Main, List, service] = await Promise.all([
        getTenantComponent(tenant, 'ContractSidebar'),
        getTenantComponent(tenant, 'ContractMain'),
        getTenantComponent(tenant, 'ContractList'),
        getTenantService<StandardContractService>(tenant, 'ContractService'),
    ]);

    // 2. 데이터 페칭
    const contracts = await service.getContracts(tenant);

    return (
        <div className="flex gap-6 -m-10 p-10 bg-slate-50 min-h-[calc(100vh-64px)]">
            <Sidebar />
            <Main contracts={contracts} ListComponent={List} />
        </div>
    );
}
