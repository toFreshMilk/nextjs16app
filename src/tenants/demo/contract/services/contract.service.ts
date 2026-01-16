// src/tenants/demo/contract/services/contract.service.ts
import type { ContractService } from '@/core/config/tenant.config';

export async function getContracts() {
  console.log('[Demo] Contract Service - 가짜 데이터 반환');

  return [
    { id: 999, title: '[데모] 샘플 계약서 1', status: 'Active' },
    { id: 998, title: '[데모] 샘플 계약서 2', status: 'Draft' },
  ];
}
export async function getContractsDetail() {
  console.log('[Demo] Contract detail Service - 가짜 데이터 반환');

  return [
    { id: 999, title: '[데모] 샘플 계약서 1', status: 'Active' },
    { id: 998, title: '[데모] 샘플 계약서 2', status: 'Draft' },
  ];
}
export async function getContractsDetail2() {
  console.log('[Demo] Contract detail Service 2222 - 가짜 데이터 반환');

  return [
    { id: 999, title: '[데모] 샘플 계약서 1', status: 'Active' },
    { id: 998, title: '[데모] 샘플 계약서 2', status: 'Draft' },
  ];
}

const contractService: ContractService = {
  getContracts,
  getContractsDetail,
  getContractsDetail2,
};

export default contractService;