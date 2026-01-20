// src/core/config/tenant.config.ts
import { ComponentType } from 'react';
import type {
  TenantConfig,
  ComponentKey,
  ServiceKey,
  ComponentLoader,
  ServiceLoader,
  ModuleWithDefault,
  ComponentPropsMap,
} from '@/core/config/tenant.types';

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
const StandardComponents: { [K in ComponentKey]: ComponentLoader<K> } = {
  TopNavbar: () => import('@/standard/shared/components/TopNavbar'),
  WorkspaceBanner: () => import('@/standard/shared/components/WorkspaceBanner'),
  ContractSidebar: () => import('@/standard/contract/components/ContractSidebar'),
  ContractMain: () => import('@/standard/contract/components/ContractMain'),
  ContractList: () => import('@/standard/contract/components/ContractList'),
  ContractDetailTop: () => import('@/standard/contract/components/ContractDetailTop'),
  ContractDetailLeft: () => import('@/standard/contract/components/ContractDetailLeft'),
  ContractDetailRight: () => import('@/standard/contract/components/ContractDetailRight'),
};

export async function getTenantComponent<T = ComponentType<any>>(tenantId: string, key: ComponentKey): Promise<T> {
  const config = await loadTenantConfig(tenantId);
  // 오버라이드 없으면 Standard 사용
  const loader = config.components?.[key] || StandardComponents[key];
  const moduleData = await loader();
  return moduleData.default as T;
}

// === 3. Service Loader (유연함) ===
const StandardServices: { [K in ServiceKey]: ServiceLoader } = {
  ContractService: () => import('@/standard/contract/services/contract.service'),
};

export async function getTenantService<T = any>(tenantId: string, key: ServiceKey): Promise<T> {
  const config = await loadTenantConfig(tenantId);
  const tenantLoader = config.services?.[key];

  if (tenantLoader) {
    console.log(`[Service] Custom: ${tenantId}:${key}`);
    const moduleData = await tenantLoader();

    // [최소 검증] 개발 편의를 위해 approve 메서드가 있는지 정도만 경고
    if (key === 'ContractService' && typeof moduleData.default.approve !== 'function') {
      console.warn(`[Warning] ${tenantId} ContractService missing 'approve' function!`);
    }

    return moduleData.default as T;
  }

  console.log(`[Service] Standard: ${tenantId}:${key}`);
  const standardLoader = StandardServices[key];
  if (!standardLoader) throw new Error(`Standard service missing: ${key}`);

  const moduleData = await standardLoader();
  return moduleData.default as T;
}
