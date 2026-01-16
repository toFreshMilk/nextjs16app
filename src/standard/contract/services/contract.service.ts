// src/standard/contract/services/contract.service.ts
import type { ContractService } from '@/core/types/contract.types';

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