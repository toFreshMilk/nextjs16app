// src/standard/contract/services/contract.service.ts
import type { ContractService } from '@/core/config/tenant.config';
import type { ContractRow } from '@/core/config/tenant.config';
import { apiGet, apiPost } from '@/core/services/apiClient';

export async function getContracts(tenant: string): Promise<ContractRow[]> {
  return await apiGet<ContractRow[]>('/contracts', tenant);
}

export async function getContractsDetail(tenant: string): Promise<ContractRow[]> {
  return await apiGet<ContractRow[]>('/contracts/detail', tenant);
}

export async function getContractsDetail2(tenant: string): Promise<ContractRow[]> {
  return await apiGet<ContractRow[]>('/contracts/detail2', tenant);
}

// [NEW] 승인 로직 추가
export async function approve(tenant: string, contractId: string): Promise<void> {
  await apiPost('/contracts/approve', tenant, { contractId, status: 'APPROVED' });
}

const contractService: ContractService = {
  getContracts,
  getContractsDetail,
  getContractsDetail2,
  approve,
};

export default contractService;
