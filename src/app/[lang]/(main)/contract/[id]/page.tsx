// src/app/[lang]/(main)/contract/[id]/page.tsx
import { getTenantComponent, getTenantService, getTenantId } from '@/core/config/tenant.config';
import { notFound } from 'next/navigation';
// [중요] Standard 구현체에서 타입을 가져옴 (Service & Props)
import type { StandardContractService } from '@/standard/contract/services/contract.service';
// ContractDetailTopProps는 실제 컴포넌트 파일이 있어야 import 가능. 여기선 any로 가정하거나 실제 파일에서 export 필요.
// 여기서는 Duck Typing 설명을 위해 any로 캐스팅하거나, StandardService 타입을 사용

export default async function ContractDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tenant = await getTenantId();

  // 1. 필요한 모든 리소스(컴포넌트, 서비스) 병렬 로드
  // [핵심] StandardContractService 타입 제네릭 전달 -> 타입 추론 활성화
  const [Top, Left, Right, service] = await Promise.all([
    getTenantComponent(tenant, 'ContractDetailTop'),
    getTenantComponent(tenant, 'ContractDetailLeft'),
    getTenantComponent(tenant, 'ContractDetailRight'),
    getTenantService<StandardContractService>(tenant, 'ContractService'),
  ]);

  // 2. 3가지 데이터 병렬 요청
  const [detailList, contractsList, detailList2] = await Promise.all([
    service.getContractsDetail(tenant),
    service.getContracts(tenant),
    service.getContractsDetail2(tenant),
  ]);

  // ID로 특정 계약 찾기
  const contractDetail = detailList.find((r) => String(r.id) === String(id));
  if (!contractDetail) {
    notFound();
  }

  // 3. 렌더링
  // Top, Left, Right 컴포넌트는 "암묵적으로" contractDetail 데이터를 받을 준비가 되어 있다고 가정 (Duck Typing)
  return (
    <div className="-m-10 p-10 bg-slate-50 min-h-[calc(100vh-64px)] space-y-6">
      <Top data={contractDetail} tenantId={tenant} />
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
