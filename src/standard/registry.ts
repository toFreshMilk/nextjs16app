// src/standard/registry.ts
import type { ComponentLoader, ServiceLoader } from '@/core/config/tenant.types';

/**
 * Standard Registry (Single File)
 * - 표준 컴포넌트/서비스 키를 "이 파일 1개"에서만 관리합니다.
 * - 키 타입(StandardComponentKey/StandardServiceKey)을 export 해서
 *   Core에서 오타를 컴파일 타임에 잡을 수 있게 합니다.
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

// =========================
// i18n Namespace Registry0
// =========================

export const STANDARD_I18N_OWNER_BY_NAMESPACE = {
  common: 'shared',
  contract: 'contract',
} as const;

export type StandardI18nNamespace = keyof typeof STANDARD_I18N_OWNER_BY_NAMESPACE;

/**
 * ✅ 필요한 namespace만 ownerMap으로 뽑아 전달하는 헬퍼
 * - 전체 맵을 통째로 넘기지 않고, 호출부 의도가 명확해짐
 */
export type NamespaceOwnerMap = Record<string, string>;

export function pickI18nOwnerMap<const Ns extends readonly StandardI18nNamespace[]>(namespaces: Ns): NamespaceOwnerMap {
  const out: NamespaceOwnerMap = {};
  for (const ns of namespaces) {
    out[ns] = STANDARD_I18N_OWNER_BY_NAMESPACE[ns];
  }
  return out;
}
