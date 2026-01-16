// src/standard/contract/services/contract.service.ts
import type { ContractService } from '@/core/config/tenant.config';

export async function getContracts() {

  return [
    { id: 1, title: '표준 계약서 A', status: 'Active' },
    { id: 2, title: '비밀 유지 서약서', status: 'Draft' },
  ];
}

const contractService: ContractService = {
  getContracts,
};

export default contractService;