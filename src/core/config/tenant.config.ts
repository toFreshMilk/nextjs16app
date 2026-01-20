// src/core/config/tenant.config.ts
import { ComponentType } from 'react';
import type { TenantConfig, ComponentLoader, ServiceLoader, ModuleWithDefault } from '@/core/config/tenant.types';

// === 1. Loaders ===
export async function loadTenantConfig(tenantId: string): Promise<TenantConfig> {
  const loaders: Record<string, () => Promise<ModuleWithDefault<TenantConfig>>> = {
    demo: () => import('@/core/config/tenants/demo.config'),
    apr: () => import('@/core/config/tenants/apr.config'),
  };

  const loader = loaders[tenantId];
  if (!loader) {
    throw new Error(`[Config Error] Unknown tenant: ${tenantId}`);
  }

  const moduleData = await loader();
  return { ...moduleData.default, id: tenantId };
}

// === 2. Component Loader ===
// [변경] 키 목록 제한 없이 문자열 키 사용
const StandardComponents: Record<string, ComponentLoader> = {
  TopNavbar: () => import('@/standard/shared/components/TopNavbar'),
  WorkspaceBanner: () => import('@/standard/shared/components/WorkspaceBanner'),
  ContractSidebar: () => import('@/standard/contract/components/ContractSidebar'),
  ContractMain: () => import('@/standard/contract/components/ContractMain'),
  ContractList: () => import('@/standard/contract/components/ContractList'),
  ContractDetailTop: () => import('@/standard/contract/components/ContractDetailTop'),
  ContractDetailLeft: () => import('@/standard/contract/components/ContractDetailLeft'),
  ContractDetailRight: () => import('@/standard/contract/components/ContractDetailRight'),
};

export async function getTenantComponent<T = ComponentType<any>>(
  tenantId: string,
  key: string, // [변경] string 허용
): Promise<T> {
  const config = await loadTenantConfig(tenantId);

  // 오버라이드 확인 -> 없으면 Standard 확인
  const loader = config.components?.[key] || StandardComponents[key];

  if (!loader) {
    // [중요] 런타임 에러 처리
    console.error(`[Component Error] Component '${key}' not found for tenant '${tenantId}'`);
    // Fallback: 에러 발생시키는 대신 null 리턴하거나 에러 컴포넌트 리턴도 가능하지만,
    // 여기서는 명확히 개발자에게 알리기 위해 에러 throw
    throw new Error(`Component '${key}' not found`);
  }

  const moduleData = await loader();
  return moduleData.default as T;
}

// === 3. Service Loader ===
const StandardServices: Record<string, ServiceLoader> = {
  ContractService: () => import('@/standard/contract/services/contract.service'),
};

export async function getTenantService<T = any>(
  tenantId: string,
  key: string, // [변경] string 허용
): Promise<T> {
  const config = await loadTenantConfig(tenantId);
  const tenantLoader = config.services?.[key];

  if (tenantLoader) {
    console.log(`[Service] Custom: ${tenantId}:${key}`);
    const moduleData = await tenantLoader();
    return moduleData.default as T;
  }

  const standardLoader = StandardServices[key];
  if (!standardLoader) {
    throw new Error(`Service '${key}' not found`);
  }

  console.log(`[Service] Standard: ${tenantId}:${key}`);
  const moduleData = await standardLoader();
  return moduleData.default as T;
}
