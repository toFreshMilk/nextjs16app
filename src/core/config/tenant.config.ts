import { ComponentType } from 'react';

// === 1. 설정 데이터 ===
export interface TenantConfig {
  id: string;
  name: string;
  features: { i18n: boolean; ai: boolean; };
  theme: { primaryColor: string; };
  // Overrides Map
  components?: Partial<Record<ComponentKey, () => Promise<{ default: ComponentType<any> }>>>;
  services?: Partial<Record<ServiceKey, () => Promise<{ default: any }>>>;
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

// === 2. 컴포넌트 로더 ===
export type ComponentKey = 'LoginPage' | 'DashboardPage' | 'ContractPage';

const StandardComponents: Record<ComponentKey, () => Promise<{ default: ComponentType<any> }>> = {
  LoginPage: () => import('@/standard/login/LoginPage'),
  DashboardPage: () => import('@/standard/dashboard/DashboardPage'),
  ContractPage: () => import('@/standard/contract/ContractPage'),
};

export async function getTenantComponent(tenantId: string, key: ComponentKey): Promise<ComponentType<any>> {
  const config = await loadTenantConfig(tenantId);
  const loader = config.components?.[key] || StandardComponents[key];
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
