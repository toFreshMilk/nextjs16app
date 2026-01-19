// src/tenants/demo/contract/services/contract.service.ts
import type { ContractService } from '@/core/config/tenant.config';
import type { ContractRow } from '@/core/config/tenant.config';
import { apiGet } from '@/core/services/apiClient';

export async function getContracts(tenant: string): Promise<ContractRow[]> {
  return await apiGet<ContractRow[]>('contracts', tenant);
}

export async function getContractsDetail(tenant: string): Promise<ContractRow[]> {
  return await apiGet<ContractRow[]>('contracts/detail', tenant);
}

export async function getContractsDetail2(tenant: string): Promise<ContractRow[]> {
  return await apiGet<ContractRow[]>('contracts/detail2', tenant);
}

const contractService: ContractService = {
  getContracts,
  getContractsDetail,
  getContractsDetail2,
};

export default contractService;