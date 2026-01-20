// src/core/config/tenant.config.ts
import { ComponentType } from 'react';

// =================================================================================
// 1. 타입 정의 (Types)
// =================================================================================

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
  // [NEW] approve 메서드 추가 (필수)
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
  // [변경] approveAction, tenantId 추가
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

// =================================================================================
// 2. 로더 함수 구현 (Loaders)
// =================================================================================

export async function loadTenantConfig(tenantId: string): Promise<TenantConfig> {
  // [중요] Webpack/Turbopack이 경로를 정적으로 분석할 수 있도록 명시적 매핑 사용
  const loaders: Record<string, () => Promise<ModuleWithDefault<TenantConfig>>> = {
    demo: () => import('@/core/config/tenants/demo.config'),
    apr: () => import('@/core/config/tenants/apr.config'),
  };

  const loader = loaders[tenantId];

  if (!loader) {
    throw new Error(`[Config Error] Unknown tenant: ${tenantId}. Please add it to tenant.config.ts loaders.`);
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

// === 4. 서비스 로더 (디버깅 강화 버전) ===
const StandardServices: { [K in ServiceKey]: ServiceLoader<K> } = {
  ContractService: () => import('@/standard/contract/services/contract.service'),
};

export async function getTenantService<K extends ServiceKey>(
    tenantId: string,
    key: K
): Promise<ServiceTypeMap[K]> {
  // 1. 테넌트 설정 로드
  const config = await loadTenantConfig(tenantId);

  // 2. 테넌트 설정에 오버라이드된 서비스가 있는지 확인
  const tenantLoader = config.services?.[key];

  // A. 테넌트 전용 서비스가 있는 경우
  if (tenantLoader) {
    console.log(`[Service Loader] Loading CUSTOM service for ${tenantId}:${key}`);
    const moduleData = await tenantLoader();

    // [Validation] 로드된 서비스가 필수 메서드를 가지고 있는지 검사 (Runtime Check)
    // 타입 단언(as any)을 사용하여 런타임 검사 수행
    if (key === 'ContractService' && typeof (moduleData.default as any).approve !== 'function') {
      console.error(`[Critical] ${tenantId} ContractService is missing 'approve' method!`);
      // 여기서 에러를 안 던지면 나중에 'is not a function'으로 터짐
    }

    return moduleData.default;
  }

  // B. 없는 경우 Standard 서비스 로드 (Fallback)
  console.log(`[Service Loader] Fallback to STANDARD service for ${tenantId}:${key}`);

  const standardLoader = StandardServices[key];
  if (!standardLoader) {
    throw new Error(`[System Error] Standard service not found for key: ${key}`);
  }

  const moduleData = await standardLoader();
  return moduleData.default;
}
