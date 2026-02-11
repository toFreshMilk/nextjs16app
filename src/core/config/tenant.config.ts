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

// ===== Tenant Loaders (single source of truth) =====
const TENANT_LOADERS = {
  demo: () => import('@/core/config/tenants/demo.config'),
  apr: () => import('@/core/config/tenants/apr.config'),
} as const satisfies Record<string, () => Promise<ModuleWithDefault<TenantConfig>>>;

export type TenantId = keyof typeof TENANT_LOADERS;

export const TENANT_IDS = Object.keys(TENANT_LOADERS) as TenantId[];

const TENANT_ID_SET = new Set<string>(TENANT_IDS);

export function isTenantId(v: string): v is TenantId {
  return TENANT_ID_SET.has(v);
}

// ✅ Promise cache (new file 생성 없이 이 파일 내부에서만 사용)
const tenantConfigPromiseCache = new Map<TenantId, Promise<TenantConfig>>();

// === 1. Loaders ===
export async function loadTenantConfig(tenantId: string): Promise<TenantConfig> {
  if (!isTenantId(tenantId)) {
    throw new Error(`[Config Error] Unknown tenant: ${tenantId}`);
  }

  // ✅ tenant config 모듈 로드는 런타임이 알아서 캐시하긴 하지만,
  //    동일 프로세스에서 반복 호출되는 케이스를 줄이기 위해 Promise 캐시를 둡니다.
  const cached = tenantConfigPromiseCache.get(tenantId);
  if (cached) return cached;

  const loader = TENANT_LOADERS[tenantId];

  const p = (async () => {
    const moduleData = await loader();
    return { ...moduleData.default, id: tenantId };
  })();

  tenantConfigPromiseCache.set(tenantId, p);
  return p;
}

// === 2. Component Loader ===
// ✅ Standard 컴포넌트 키 목록은 standard/standard.registry.ts "1개 파일"이 소유한다.
// ✅ proxy.ts가 loadTenantConfig만 import해도 안전하도록, registry는 함수 내부에서 동적 import한다.
export async function getTenantComponent<T = ComponentType<any>>(tenantId: string, key: string): Promise<T> {
  const config = await loadTenantConfig(tenantId);

  const { STANDARD_COMPONENT_LOADERS } = await import('@/standard/registry');

  // 오버라이드 확인 -> 없으면 Standard 확인
  const loader: ComponentLoader | undefined = config.components?.[key] || STANDARD_COMPONENT_LOADERS[key];

  if (!loader) {
    // [중요] 런타임 에러 처리
    console.error(`[Component Error] Component '${key}' not found for tenant '${tenantId}'`);
    // 여기서는 명확히 개발자에게 알리기 위해 에러 throw
    throw new Error(`Component '${key}' not found`);
  }

  const moduleData = await loader();
  return moduleData.default as T;
}

// === 3. Service Loader ===
// ✅ Standard 서비스 키 목록은 standard/standard.registry.ts "1개 파일"이 소유한다.
// ✅ proxy.ts가 loadTenantConfig만 import해도 안전하도록, registry는 함수 내부에서 동적 import한다.
export async function getTenantService<T = any>(tenantId: string, key: string): Promise<T> {
  const config = await loadTenantConfig(tenantId);
  const tenantLoader = config.services?.[key];

  if (tenantLoader) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Service] Custom: ${tenantId}:${key}`);
    }
    const moduleData = await tenantLoader();
    return moduleData.default as T;
  }

  const { STANDARD_SERVICE_LOADERS } = await import('@/standard/registry');

  const standardLoader: ServiceLoader | undefined = STANDARD_SERVICE_LOADERS[key];
  if (!standardLoader) {
    throw new Error(`Service '${key}' not found`);
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Service] Standard: ${tenantId}:${key}`);
  }

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
