// src/tenants/demo/contract/services/contract.service.ts

import type { ContractRow } from '@/core/config/tenant.types';
import { apiGet, apiPost } from '@/core/services/apiClient';

async function getContracts(tenant: string): Promise<ContractRow[]> {
  // Demo는 Standard와 동일하게 동작하거나, 별도 로직을 탈 수 있음
  return await apiGet<ContractRow[]>('/contracts', tenant);
}

async function getContractsDetail(tenant: string): Promise<ContractRow[]> {
  return await apiGet<ContractRow[]>('/contracts/detail', tenant);
}

async function getContractsDetail2(tenant: string): Promise<ContractRow[]> {
  return await apiGet<ContractRow[]>('/contracts/detail2', tenant);
}

// [MISSING PART] 이 함수가 없어서 에러가 발생했습니다.
async function approve(tenant: string, contractId: string): Promise<void> {
  // Demo는 실제 API 호출 없이 로그만 찍거나, Mock API 호출
  await apiPost('/contracts/approve', tenant, { contractId, status: 'APPROVED' });
}

// [변경] 명시적으로 변수에 할당 후 export
const contractService = {
  getContracts,
  getContractsDetail,
  getContractsDetail2,
  approve,
};

export default contractService;