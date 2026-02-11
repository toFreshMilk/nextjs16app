// src/standard/standard.registry.ts
import type { ComponentLoader, ServiceLoader } from '@/core/config/tenant.types';

/**
 * Standard Registry (Single File)
 * - 표준 컴포넌트/서비스 키를 "이 파일 1개"에서만 관리합니다.
 * - 도메인별(예: contract)로 registry 파일을 더 만들지 않습니다.
 */

export const STANDARD_COMPONENT_LOADERS: Record<string, ComponentLoader> = {
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
};

export const STANDARD_SERVICE_LOADERS: Record<string, ServiceLoader> = {
  // ===== Contract =====
  ContractService: () => import('@/standard/contract/services/contract.service'),
};
