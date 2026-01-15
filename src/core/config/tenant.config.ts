// src/core/config/tenant.config.ts
import { ComponentType } from 'react';

type ModuleWithDefault<T> = { default: T };
type PageModule = ModuleWithDefault<ComponentType<any>>;
type PageLoader = () => Promise<PageModule>;
type ComponentModule = ModuleWithDefault<ComponentType<any>>;
type ComponentLoader = () => Promise<ComponentModule>;
type ServiceModule<T = any> = ModuleWithDefault<T>;
type ServiceLoader<T = any> = () => Promise<ServiceModule<T>>;

// 키 정의 분리
export type PageKey = 'LoginPage' | 'DashboardPage' | 'ContractPage';
export type ComponentKey =
  | 'TopNavbar'
  | 'WorkspaceBanner'
  | 'DashboardChart'
  | 'ContractList'
  | 'LoginSsoButton';
export type ServiceKey = 'LoginService' | 'DashboardService' | 'ContractService';

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
  LoginPage: () => import('@/standard/login/LoginPage'),
  DashboardPage: () => import('@/standard/dashboard/DashboardPage'),
  ContractPage: () => import('@/standard/contract/ContractPage'),
};

export async function getTenantPage(tenantId: string, key: PageKey): Promise<ComponentType<any>> {
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
  DashboardChart: () => import('@/standard/dashboard/components/DashboardChart'),
  ContractList: () => import('@/standard/contract/components/ContractList'),
  LoginSsoButton: () => import('@/standard/login/components/LoginSsoButton'),
};

export async function getTenantComponent(tenantId: string, key: ComponentKey): Promise<ComponentType<any>> {
  const config = await loadTenantConfig(tenantId);
  const loader = config.components?.[key] || StandardComponents[key];
  const moduleData = await loader();
  return moduleData.default;
}

// === 3. 서비스 로더 ===
const StandardServices: Record<ServiceKey, () => Promise<{ default: any }>> = {
  LoginService: () => import('@/standard/login/services/login.service'),
  DashboardService: () => import('@/standard/dashboard/services/dashboard.service'),
  ContractService: () => import('@/standard/contract/services/contract.service'),
};

export async function getTenantService<T = any>(tenantId: string, key: ServiceKey): Promise<T> {
  const config = await loadTenantConfig(tenantId);
  const loader = config.services?.[key] || StandardServices[key];
  const moduleData = await loader();
  return moduleData.default;
}
