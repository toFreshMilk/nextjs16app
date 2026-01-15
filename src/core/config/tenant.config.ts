import { ComponentType } from 'react';

type ModuleWithDefault<T> = { default: T };
type ComponentLoader<T = ComponentType<any>> = () => Promise<ModuleWithDefault<T>>;

// === 1. 설정 데이터 ===
export interface TenantConfig {
  id: string;
  name: string;
  features: { i18n: boolean; ai: boolean; };
  theme: { primaryColor: string; };
  // Overrides Map
  pages?: Partial<Record<PageKey, ComponentLoader>>;
  components?: Partial<Record<UiComponentKey, ComponentLoader>>;
  services?: Partial<Record<ServiceKey, () => Promise<ModuleWithDefault<any>>>>;
}

export async function loadTenantConfig(tenantId: string): Promise<TenantConfig> {
  switch (tenantId) {
    case 'demo': return (await import('./tenants/demo.config')).default;
    case 'apr': return (await import('./tenants/apr.config')).default;
    default: return {
      id: tenantId,
      name: 'Unknown',
      features: { i18n: false, ai: false },
      theme: { primaryColor: '#64748b' }
    };
  }
}

// === 2. 페이지 로더 ===
export type PageKey = 'LoginPage' | 'DashboardPage' | 'ContractPage';

const StandardPages: Record<PageKey, ComponentLoader> = {
  LoginPage: () => import('@/standard/login/LoginPage'),
  DashboardPage: () => import('@/standard/dashboard/DashboardPage'),
  ContractPage: () => import('@/standard/contract/ContractPage'),
};

export async function getTenantPage(tenantId: string, key: PageKey): Promise<ComponentType<any>> {
  const config = await loadTenantConfig(tenantId);
  // 하위호환: 과거에는 pages 대신 components에 라우트 페이지 오버라이드가 들어있었음
  const legacyPages = (config as unknown as { components?: Partial<Record<PageKey, ComponentLoader>> }).components;
  const loader = config.pages?.[key] || legacyPages?.[key] || StandardPages[key];
  const moduleData = await loader();
  return moduleData.default;
}

// === 3. UI 컴포넌트 로더 (부분 교체용) ===
export type UiComponentKey = 'TopNavbar' | 'WorkspaceBanner';

const StandardUiComponents: Record<UiComponentKey, ComponentLoader> = {
  TopNavbar: () => import('@/standard/shared/components/TopNavbar'),
  WorkspaceBanner: () => import('@/standard/shared/components/WorkspaceBanner'),
};

export async function getTenantComponent(tenantId: string, key: UiComponentKey): Promise<ComponentType<any>> {
  const config = await loadTenantConfig(tenantId);
  const loader = config.components?.[key] || StandardUiComponents[key];
  const moduleData = await loader();
  return moduleData.default;
}

// === 3. 서비스 로더 ===
export type ServiceKey = 'LoginService' | 'DashboardService' | 'ContractService';

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
