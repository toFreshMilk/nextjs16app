// src/mock-data/contracts/contracts.ts
import standardData from './standard.json';
import demoData from './demo.json';
import aprData from './apr.json';
import type { ContractRow } from '@/core/config/tenant.config';

// 런타임 메모리 저장소 (서버 재시작 전까지 변경사항 유지용)
const memoryStore: Record<string, ContractRow[]> = {
  standard: [...(standardData as ContractRow[])],
  demo: [...(demoData as ContractRow[])],
  apr: [...(aprData as ContractRow[])],
};

function normalizeTenant(tenant?: string | null): string {
  return (tenant || 'standard').trim().toLowerCase();
}

/**
 * 테넌트별 Mock 데이터를 가져옵니다.
 */
export function getMockContracts(tenant?: string | null): ContractRow[] {
  const t = normalizeTenant(tenant);
  return memoryStore[t] || memoryStore['standard'];
}

/**
 * 특정 계약의 상태를 업데이트합니다 (Mock DB Update)
 */
export function setMockContractOverride(
    tenant: string | null | undefined,
    id: string | number,
    updates: Partial<ContractRow>
): boolean {
  const t = normalizeTenant(tenant);
  const contracts = memoryStore[t];

  if (!contracts) return false;

  const idx = contracts.findIndex((c) => String(c.id) === String(id));
  if (idx === -1) return false;

  contracts[idx] = { ...contracts[idx], ...updates };
  return true;
}
