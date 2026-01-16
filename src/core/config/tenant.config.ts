// src/core/config/tenant.config.ts
import { ComponentType } from 'react';

type ModuleWithDefault<T> = { default: T };
type PageModule = ModuleWithDefault<ComponentType<unknown>>;
type PageLoader = () => Promise<PageModule>;
type ComponentModule = ModuleWithDefault<ComponentType<unknown>>;
type ComponentLoader = () => Promise<ComponentModule>;
type ServiceModule<T> = ModuleWithDefault<T>;
type ServiceLoader<T = unknown> = () => Promise<ServiceModule<T>>;

// 키 정의 분리
export type PageKey = 'ContractPage';
export type ComponentKey =
  | 'TopNavbar'
  | 'WorkspaceBanner'
  | 'ContractSidebar'
  | 'ContractMain'
  | 'ContractList';
export type ServiceKey = 'ContractService';

// === 1. 설정 데이터 ===
export interface TenantConfig {
  id: string;
  name: string;
  features: { i18n: boolean; ai: boolean; sso: boolean };
  theme: { primaryColor: string; };
  // Overrides Map
  pages?: Partial<Record<PageKey, PageLoader>>;
  components?: Partial<Record<ComponentKey, ComponentLoader>>;
  services?: Partial<Record<ServiceKey, ServiceLoader>>;
}

export async function loadTenantConfig(tenantId: string): Promise<TenantConfig> {
  const loaders: Record<string, () => Promise<ModuleWithDefault<TenantConfig>>> = {
    demo: () => import('./tenants/demo.config'),
    apr: () => import('./tenants/apr.config'),
  };

  const loader = loaders[tenantId];
  if (!loader) {
    throw new Error(`Unknown tenant: ${tenantId}`);
  }

  const moduleData = await loader();
  // tenantId를 신뢰하고 id도 tenantId로 강제하여 일관성 유지
  return { ...moduleData.default, id: tenantId };
}

// === 2. 페이지 로더 ===
const StandardPages: Record<PageKey, PageLoader> = {
  ContractPage: () => import('@/standard/contract/ContractPage'),
};

export async function getTenantPage(tenantId: string, key: PageKey): Promise<ComponentType<unknown>> {
  const config = await loadTenantConfig(tenantId);
  // 하위호환: 과거에는 pages 대신 components에 라우트 페이지 오버라이드가 들어있었음
  const deprecatedPageLoaders = (config as unknown as { components?: Partial<Record<PageKey, PageLoader>> }).components;
  const loader = config.pages?.[key] || deprecatedPageLoaders?.[key] || StandardPages[key];
  const moduleData = await loader();
  return moduleData.default;
}

// === 3. UI 컴포넌트 로더 (부분 교체용) ===
const StandardComponents: Record<ComponentKey, ComponentLoader> = {
  TopNavbar: () => import('@/standard/shared/components/TopNavbar'),
  WorkspaceBanner: () => import('@/standard/shared/components/WorkspaceBanner'),
  ContractSidebar: () => import('@/standard/contract/components/ContractSidebar'),
  ContractMain: () => import('@/standard/contract/components/ContractMain'),
  ContractList: () => import('@/standard/contract/components/ContractList'),
};

export async function getTenantComponent(tenantId: string, key: ComponentKey): Promise<ComponentType<unknown>> {
  const config = await loadTenantConfig(tenantId);
  const loader = config.components?.[key] || StandardComponents[key];
  const moduleData = await loader();
  return moduleData.default;
}

// === 4. 서비스 로더 ===
const StandardServices: Record<ServiceKey, ServiceLoader> = {
  ContractService: () => import('@/standard/contract/services/contract.service'),
};

export async function getTenantService<T>(tenantId: string, key: ServiceKey): Promise<T> {
  const config = await loadTenantConfig(tenantId);
  const loader = config.services?.[key] || StandardServices[key];
  const moduleData = await loader();
  return moduleData.default;
}
