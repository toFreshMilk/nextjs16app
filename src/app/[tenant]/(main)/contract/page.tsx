// src/app/[tenant]/(main)/contract/page.tsx
import { getTenantComponent, getTenantService } from '@/core/config/tenant.config';

export default async function ContractPage({ params }: { params: Promise<{ tenant: string }> }) {
    const { tenant } = await params;

    // 1. 컴포넌트와 서비스를 병렬로 로드
    const [Sidebar, Main, List, service] = await Promise.all([
        getTenantComponent(tenant, 'ContractSidebar'),
        getTenantComponent(tenant, 'ContractMain'),
        getTenantComponent(tenant, 'ContractList'), // 리스트 컴포넌트도 여기서 로드
        getTenantService(tenant, 'ContractService'),
    ]);

    // 2. 데이터 페칭 (서버 측 실행)
    const contracts = await service.getContracts();

    return (
        <div className="flex gap-6 -m-10 p-10 bg-slate-50 min-h-[calc(100vh-64px)]">
            {/* Sidebar는 URL 상태를 쓰므로 props 불필요 */}
            <Sidebar />
            {/* Main에 데이터와 리스트 컴포넌트를 주입 */}
            <Main contracts={contracts} ListComponent={List} />
        </div>
    );
}
