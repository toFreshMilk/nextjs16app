// src/core/config/tenant.config.ts
import type { ComponentType } from 'react';
import type { TenantConfig, ComponentLoader, ServiceLoader, ModuleWithDefault } from '@/core/config/tenant.types';

// ===== i18n settings (moved from src/core/i18n/settings.ts) =====
export const SUPPORTED_LANGS = ['ko', 'en'] as const;
export type AppLang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: AppLang = 'ko';
export const DEFAULT_NS = 'common' as const;

export function isSupportedLang(v: string): v is AppLang {
  return (SUPPORTED_LANGS as readonly string[]).includes(v);
}

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

  // ✅ tenant config 모듈 로드는 런타임이 알아서 캐시하긴 하지만,
  //    동일 프로세스에서 반복 호출되는 케이스를 줄이기 위해 Promise 캐시를 둡니다.
  const cached = tenantConfigPromiseCache.get(tenantId);
  if (cached) return cached;

  const p = (async () => {
    const moduleData = await loader();
    return { ...moduleData.default, id: tenantId };
  })();

  tenantConfigPromiseCache.set(tenantId, p);
  return p;
}

// ✅ Promise cache (new file 생성 없이 이 파일 내부에서만 사용)
const tenantConfigPromiseCache = new Map<string, Promise<TenantConfig>>();

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

export async function getTenantId() {
  // ✅ proxy.ts(Edge)에서도 이 파일을 import할 수 있게,
  //    next/headers는 여기서만 동적 import 합니다.
  const { headers } = await import('next/headers');

  const headersList = await headers();
  const tenant = headersList.get('x-tenant-id');

  if (!tenant) {
    throw new Error('Tenant ID missing in headers');
  }

  return tenant;
}
