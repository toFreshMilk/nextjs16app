// src/tenants/apr/contract/services/contract.service.ts
import type { ContractRow } from '@/core/config/tenant.types';
import { apiGet, apiPost } from '@/core/services/apiClient';

async function getContracts(tenant: string): Promise<ContractRow[]> {
  return await apiGet<ContractRow[]>('contracts', tenant);
}

async function getContractsDetail(tenant: string): Promise<ContractRow[]> {
  return await apiGet<ContractRow[]>('contracts/detail', tenant);
}

async function getContractsDetail2(tenant: string): Promise<ContractRow[]> {
  return await apiGet<ContractRow[]>('contracts/detail2', tenant);
}

// [NEW] 승인 로직 추가 (APR 커스텀)
async function approve(tenant: string, contractId: string): Promise<void> {
  // APR만의 추가 검증 로직 호출 예시
  await apiPost('contracts/validate', tenant, { contractId });
  await apiPost('contracts/approve', tenant, { contractId, status: 'APPROVED' });
}

const contractService = {
  getContracts,
  getContractsDetail,
  getContractsDetail2,
  approve,
};

export default contractService;