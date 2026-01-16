// src/tenants/apr/contract/services/contract.service.ts
import type { ContractService } from '@/core/config/tenant.config';

export async function getContracts() {
  console.log('[APR] Fetching from Groupware...');
  return [
    { id: 901, title: '[APR] 뷰티 디바이스 공급 계약', status: 'Active' },
    { id: 902, title: '[APR] 해외 법인 설립 건', status: 'Review' },
  ];
}

const contractService: ContractService = {
  getContracts,
};

export default contractService;