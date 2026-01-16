// src/tenants/demo/contract/services/contract.service.ts
import type { ContractService } from '@/core/types/contract.types';

export async function getContracts() {
  console.log('[Demo] Contract Service - 가짜 데이터 반환');

  return [
    { id: 999, title: '[데모] 샘플 계약서 1', status: 'Active' },
    { id: 998, title: '[데모] 샘플 계약서 2', status: 'Draft' },
  ];
}

const contractService: ContractService = {
  getContracts,
};

export default contractService;