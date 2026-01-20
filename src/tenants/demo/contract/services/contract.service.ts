// src/tenants/demo/contract/services/contract.service.ts

import type { ContractService, ContractRow } from '@/core/config/tenant.types';
import { apiGet, apiPost } from '@/core/services/apiClient';

export async function getContracts(tenant: string): Promise<ContractRow[]> {
  // Demo는 Standard와 동일하게 동작하거나, 별도 로직을 탈 수 있음
  return await apiGet<ContractRow[]>('/contracts', tenant);
}

export async function getContractsDetail(tenant: string): Promise<ContractRow[]> {
  return await apiGet<ContractRow[]>('/contracts/detail', tenant);
}

export async function getContractsDetail2(tenant: string): Promise<ContractRow[]> {
  return await apiGet<ContractRow[]>('/contracts/detail2', tenant);
}

// [MISSING PART] 이 함수가 없어서 에러가 발생했습니다.
export async function approve(tenant: string, contractId: string): Promise<void> {
  // Demo는 실제 API 호출 없이 로그만 찍거나, Mock API 호출
  await apiPost('/contracts/approve', tenant, { contractId, status: 'APPROVED' });
}

// [MISSING PART] export 객체에 approve 포함
const contractService: ContractService = {
  getContracts,
  getContractsDetail,
  getContractsDetail2,
  approve, // <--- 필수!!!
};

export default contractService;
