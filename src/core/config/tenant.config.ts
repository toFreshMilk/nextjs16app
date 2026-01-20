// src/core/config/tenant.config.ts
import { ComponentType } from 'react';

// === Contract Types ===
export type ContractStatus = 'Active' | 'Draft' | 'Review' | 'APPROVED' | 'REJECTED' | (string & {});

export interface ContractRow {
  id: number | string;
  title: string;
  status: ContractStatus;
  partner?: string;
  date?: string;
  amount?: string;
  category?: string;
  templateName?: string;
  requester?: string;
  reviewer?: string;
  documentCode?: string;
}

export interface ContractService {
  getContracts(tenant: string): Promise<ContractRow[]>;
  getContractsDetail(tenant: string): Promise<ContractRow[]>;
  getContractsDetail2(tenant: string): Promise<ContractRow[]>;
  // [NEW] approve 메서드 추가
  approve(tenant: string, contractId: string): Promise<void>;
}

type ModuleWithDefault<T> = { default: T };

// 컴포넌트별 props 타입 매핑
type ComponentPropsMap = {
  TopNavbar: Record<string, never>;
  WorkspaceBanner: Record<string, never>;
  ContractSidebar: Record<string, never>;
  ContractMain: { contracts: ContractRow[]; ListComponent: ComponentType<{ contracts?: ContractRow[] }> };
  ContractList: { contracts?: ContractRow[] };
  // [변경] ContractDetailTop에 props 추가
  ContractDetailTop: {
    data: ContractRow;
    tenantId?: string;
    approveAction?: (prevState: any, formData: FormData) => Promise<any>;
  };
  ContractDetailLeft: { data: ContractRow[] };
  ContractDetailRight: { data: ContractRow[] };
};

// 키 정의 분리
export type ComponentKey = keyof ComponentPropsMap;
export type ServiceKey = 'ContractService';

// 제네릭 컴포넌트 모듈/로더 타입
type ComponentModule<K extends ComponentKey> = ModuleWithDefault<ComponentType<any>>;
type ComponentLoader<K extends ComponentKey> = () => Promise<ComponentModule<K>>;

// 서비스별 타입 매핑
type ServiceTypeMap = {
  ContractService: ContractService;
};

type ServiceModule<T> = ModuleWithDefault<T>;
type ServiceLoader<K extends ServiceKey> = () => Promise<ServiceModule<ServiceTypeMap[K]>>;

// === 1. 설정 데이터 ===
export interface TenantConfig {
  id: string;
  name: string;
  features: { i18n: boolean; ai: boolean; sso: boolean };
  theme: { primaryColor: string; };
  // Overrides Map
  components?: Partial<{ [K in ComponentKey]: ComponentLoader<K> }>;
  services?: Partial<{ [K in ServiceKey]: ServiceLoader<K> }>;
}

export async function loadTenantConfig(tenantId: string): Promise<TenantConfig> {
  const loaders: Record<string, () => Promise<ModuleWithDefault<TenantConfig>>> = {
    demo: () => import('./tenants/demo.config'), // 경로 수정됨 (호출 위치에 따라 조정 필요)
    apr: () => import('./tenants/apr.config'),   // 경로 수정됨
  };

  const loader = loaders[tenantId];
  if (!loader) {
    throw new Error(`Unknown tenant: ${tenantId}`);
  }

  const moduleData = await loader();
  return { ...moduleData.default, id: tenantId };
}

// === 3. UI 컴포넌트 로더 (부분 교체용) ===
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

// === 4. 서비스 로더 ===
const StandardServices: { [K in ServiceKey]: ServiceLoader<K> } = {
  ContractService: () => import('@/standard/contract/services/contract.service'),
};

export async function getTenantService<K extends ServiceKey>(
    tenantId: string,
    key: K
): Promise<ServiceTypeMap[K]> {
  const config = await loadTenantConfig(tenantId);
  const loader = (config.services?.[key] || StandardServices[key]) as ServiceLoader<K>;
  const moduleData = await loader();
  return moduleData.default;
}
