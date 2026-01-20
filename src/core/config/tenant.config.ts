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
  ServiceTypeMap
} from '@/core/config/tenant.types'; // 타입 import

// === 1. Loaders Implementation ===
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

// === 2. Component Loader Registry ===
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

export async function getTenantComponent<K extends ComponentKey>(
    tenantId: string,
    key: K
): Promise<ComponentType<ComponentPropsMap[K]>> {
  const config = await loadTenantConfig(tenantId);
  const loader = (config.components?.[key] || StandardComponents[key]) as ComponentLoader<K>;
  const moduleData = await loader();
  return moduleData.default;
}

// === 3. Service Loader Registry ===
const StandardServices: { [K in ServiceKey]: ServiceLoader<K> } = {
  ContractService: () => import('@/standard/contract/services/contract.service'),
};

export async function getTenantService<K extends ServiceKey>(
    tenantId: string,
    key: K
): Promise<ServiceTypeMap[K]> {
  const config = await loadTenantConfig(tenantId);
  const tenantLoader = config.services?.[key];

  if (tenantLoader) {
    console.log(`[Service] Custom // tenant === ${tenantId}:${key}`);
    const moduleData = await tenantLoader();
    return moduleData.default;
  }

  console.log(`[Service] Standard // tenant === ${tenantId}:${key}`);
  const standardLoader = StandardServices[key];
  if (!standardLoader) throw new Error(`Standard service missing: ${key}`);

  const moduleData = await standardLoader();
  return moduleData.default;
}
