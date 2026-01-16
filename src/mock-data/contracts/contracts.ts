import type { ContractRow } from '@/core/config/tenant.config';

import standard from './standard.json';
import demo from './demo.json';
import apr from './apr.json';

const map: Record<string, ContractRow[]> = {
  standard: standard as ContractRow[],
  demo: demo as ContractRow[],
  apr: apr as ContractRow[],
};

export function getMockContracts(tenantId?: string | null): ContractRow[] {
  const key = (tenantId ?? '').trim().toLowerCase();
  return map[key] ?? map.standard;
}

