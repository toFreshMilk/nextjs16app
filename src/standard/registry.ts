// src/standard/registry.ts
import type { ComponentLoader, ServiceLoader } from '@/core/config/tenant.types';

/**
 * Standard Registry (Single File)
 * - 표준 컴포넌트/서비스/i18n owner-map을 "이 파일 1개"에서만 관리합니다.
 * - 키 타입을 export 해서 Core에서 오타를 컴파일 타임에 잡을 수 있게 합니다.
 */

// ⚠️ Record<string, ...>로 타입을 "먼저" 박아버리면 keyof가 string으로 죽습니다.
//    그래서 객체 리터럴은 그대로 두고, satisfies로만 타입 검증합니다.
export const STANDARD_COMPONENT_LOADERS = {
  // ===== Shared =====
  TopNavbar: () => import('@/standard/shared/components/TopNavbar'),
  WorkspaceBanner: () => import('@/standard/shared/components/WorkspaceBanner'),

  // ===== Contract =====
  ContractSidebar: () => import('@/standard/contract/components/ContractSidebar'),
  ContractMain: () => import('@/standard/contract/components/ContractMain'),
  ContractList: () => import('@/standard/contract/components/ContractList'),
  ContractDetailTop: () => import('@/standard/contract/components/ContractDetailTop'),
  ContractDetailLeft: () => import('@/standard/contract/components/ContractDetailLeft'),
  ContractDetailRight: () => import('@/standard/contract/components/ContractDetailRight'),
} satisfies Record<string, ComponentLoader>;

export const STANDARD_SERVICE_LOADERS = {
  // ===== Contract =====
  ContractService: () => import('@/standard/contract/services/contract.service'),
} satisfies Record<string, ServiceLoader>;

// ✅ Standard 키 타입 (오타 방지/자동완성)
export type StandardComponentKey = keyof typeof STANDARD_COMPONENT_LOADERS;
export type StandardServiceKey = keyof typeof STANDARD_SERVICE_LOADERS;

/**
 * i18n owner map
 * - namespace -> owner(폴더 루트) 매핑
 * - 예: common => shared
 * - 예: contract => contract
 */
export const STANDARD_I18N_OWNER_BY_NAMESPACE = {
  common: 'shared',
  contract: 'contract',
} as const satisfies Record<string, string>;

export type StandardI18nNamespace = keyof typeof STANDARD_I18N_OWNER_BY_NAMESPACE;

/**
 * 필요한 namespace만 골라서 owner map을 만들어줍니다.
 * - 호출부에서 ['common'] 같은 식으로 딱 필요한 것만 넘기면 됩니다.
 */
export function pickI18nOwnerMap(namespaces: readonly string[]) {
  const out: Record<string, string> = {};
  for (const ns of namespaces) {
    const owner = (STANDARD_I18N_OWNER_BY_NAMESPACE as Record<string, string>)[ns];
    if (!owner) {
      throw new Error(`[i18n registry] unknown namespace: ${ns}`);
    }
    out[ns] = owner;
  }
  return out;
}
