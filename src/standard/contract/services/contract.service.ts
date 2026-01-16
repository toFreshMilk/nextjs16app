// src/standard/contract/services/contract.service.ts
import type { ContractService } from '@/core/config/tenant.config';
import type { ContractRow } from '@/core/config/tenant.config';
import { apiGet } from '@/core/services/apiClient';

export async function getContracts(): Promise<ContractRow[]> {
  return await apiGet<ContractRow[]>('/api/contracts', { tenant: 'standard' });
}

export async function getContractsDetail(): Promise<ContractRow[]> {
  return await apiGet<ContractRow[]>('/api/contracts/detail', { tenant: 'standard' });
}

export async function getContractsDetail2(): Promise<ContractRow[]> {
  return await apiGet<ContractRow[]>('/api/contracts/detail2', { tenant: 'standard' });
}

const contractService: ContractService = {
  getContracts,
  getContractsDetail,
  getContractsDetail2,
};

export default contractService;