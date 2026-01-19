// src/app/[tenant]/(main)/contract/[id]/page.tsx
import { getTenantComponent, getTenantService } from '@/core/config/tenant.config';
import { notFound } from 'next/navigation';

export default async function ContractDetailPage({
                                                   params,
                                                 }: {
  params: Promise<{ tenant: string; id: string }>;
}) {
  const { tenant, id } = await params;

  // 1. 필요한 모든 리소스(컴포넌트, 서비스) 병렬 로드
  const [Top, Left, Right, service] = await Promise.all([
    getTenantComponent(tenant, 'ContractDetailTop'),
    getTenantComponent(tenant, 'ContractDetailLeft'),
    getTenantComponent(tenant, 'ContractDetailRight'),
    getTenantService(tenant, 'ContractService'),
  ]);

  // 2. 3가지 데이터 병렬 요청 (Waterfall 제거)
  const [detailList, contractsList, detailList2] = await Promise.all([
    service.getContractsDetail(), // 원래 getDetail(id) 여야 하나 기존 인터페이스 따름
    service.getContracts(),
    service.getContractsDetail2(),
  ]);

  // ID로 특정 계약 찾기 (서비스가 리스트를 반환한다고 가정 시)
  const contractDetail = detailList.find((r) => String(r.id) === String(id));

  // 데이터가 없으면 404
  if (!contractDetail) {
    notFound();
  }

  return (
      <div className="-m-10 p-10 bg-slate-50 min-h-[calc(100vh-64px)] space-y-6">
        {/* 데이터 주입 */}
        <Top data={contractDetail} />
        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            <Left data={contractsList} />
          </div>
          <div className="w-[420px] shrink-0">
            <Right data={detailList2} />
          </div>
        </div>
      </div>
  );
}
