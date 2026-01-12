// 📁 src/core/config/tenant.config.ts

import { ComponentType } from 'react';

export type TenantKey = 'demo' | 'apr' | 'handok' | 'iic';
export type FeatureKey = 'dashboard' | 'contract' | 'login';

type ComponentLoader = () => Promise<{ default: ComponentType<Record<string, never>> }>;

export type TenantConfig = {
    key: TenantKey;
    displayName: string;
    features: Record<FeatureKey, boolean>;
    theme: {
        cssVars: Record<string, string>;
        inlineCss?: string;
    };
    customComponents: Record<FeatureKey, ComponentLoader>;
};

// ✅ DeepPartial 타입 정의
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object
        ? T[P] extends ComponentLoader
            ? T[P]
            : DeepPartial<T[P]>
        : T[P];
};

type TenantOverride = DeepPartial<Omit<TenantConfig, 'key'>> & { key: TenantKey };

// ✅ Type guard: 객체인지 확인
function isObject(item: unknown): item is Record<string, unknown> {
    return !!item && typeof item === 'object' && !Array.isArray(item);
}

// ✅ Deep merge 유틸리티 함수 (any 제거, unknown 사용)
function deepMerge<T extends Record<string, unknown>>(
    target: T,
    source: Partial<T>
): T {
    const output = { ...target };

    for (const key in source) {
        const sourceValue = source[key];
        const targetValue = output[key];

        // ✅ Type guard로 안전하게 체크
        if (isObject(sourceValue)) {
            if (isObject(targetValue)) {
                output[key] = deepMerge(
                    targetValue as Record<string, unknown>,
                    sourceValue as Record<string, unknown>
                ) as T[Extract<keyof T, string>];
            } else {
                output[key] = sourceValue as T[Extract<keyof T, string>];
            }
        } else if (sourceValue !== undefined) {
            output[key] = sourceValue as T[Extract<keyof T, string>];
        }
    }

    return output;
}

// ... 나머지 코드는 동일
const DEMO_BASE_CONFIG: TenantConfig = {
    key: 'demo',
    displayName: 'Demo Workspace',
    features: { dashboard: true, contract: true, login: true },
    theme: {
        cssVars: {
            '--brand-primary': '#2563EB',
            '--brand-primary-weak': '#DBEAFE',
            '--brand-bg': '#0F172A',
            '--brand-surface': '#1E293B',
            '--brand-text': '#F1F5F9',
            '--brand-muted': '#94A3B8',
        },
    },
    customComponents: {
        login: () => import('@/standard/login/LoginPage'),
        dashboard: () => import('@/standard/dashboard/DashboardPage'),
        contract: () => import('@/standard/contract/ContractPage'),
    },
};

const TENANT_OVERRIDES: Record<TenantKey, TenantOverride> = {
    demo: {
        key: 'demo',
    },

    apr: {
        key: 'apr',
        displayName: 'APR BuptleBiz',
        theme: {
            cssVars: {
                '--brand-primary': '#EA002C',
                '--brand-primary-weak': '#FFE5EA',
                '--brand-bg': '#0B0B0F',
                '--brand-surface': '#1A1A24',
                '--brand-text': '#F5F7FF',
                '--brand-muted': '#A8B0C2',
            },
            inlineCss: `
        [data-tenant="apr"] .page-title {
          border-left: 4px solid #EA002C;
          padding-left: 16px;
        }
      `,
        },
        customComponents: {
            login: () => import('@/tenants/apr/login/AprLoginPage'),
            dashboard: () => import('@/tenants/apr/dashboard/AprDashboardPage'),
            contract: () => import('@/tenants/apr/contract/AprContractPage'),
        },
    },

    handok: {
        key: 'handok',
        displayName: 'Handok BuptleBiz',
        theme: {
            cssVars: {
                '--brand-primary': '#00A651',
                '--brand-primary-weak': '#E0F7EA',
                '--brand-bg': '#0A0F0A',
                '--brand-surface': '#141A14',
                '--brand-text': '#F0F5F0',
                '--brand-muted': '#A0B5A0',
            },
            inlineCss: `
        [data-tenant="handok"] .page-title {
          border-left: 4px solid #00A651;
          padding-left: 16px;
        }
      `,
        },
        customComponents: {
            dashboard: () => import('@/tenants/handok/dashboard/HandokDashboardPage'),
        },
    },

    iic: {
        key: 'iic',
        displayName: 'IIC BuptleBiz',
        theme: {
            cssVars: {
                '--brand-primary': '#FF6B00',
                '--brand-primary-weak': '#FFEADB',
                '--brand-bg': '#0F0A06',
                '--brand-surface': '#1A1410',
                '--brand-text': '#FFF5F0',
                '--brand-muted': '#B59080',
            },
            inlineCss: `
        [data-tenant="iic"] .page-title {
          border-left: 4px solid #FF6B00;
          padding-left: 16px;
        }
      `,
        },
        customComponents: {
            login: () => import('@/tenants/iic/login/IicLoginPage'),
            dashboard: () => import('@/tenants/iic/dashboard/IicDashboardPage'),
        },
    },
};

const configCache = new Map<TenantKey, TenantConfig>();

export function isKnownTenantKey(value: string): value is TenantKey {
    return value in TENANT_OVERRIDES;
}

export function getTenantByKey(key: string): TenantConfig {
    const tenantKey = isKnownTenantKey(key) ? key : 'demo';

    const cached = configCache.get(tenantKey);
    if (cached) return cached;

    const override = TENANT_OVERRIDES[tenantKey];
    const merged = deepMerge(
        DEMO_BASE_CONFIG as Record<string, unknown>,
        override as Partial<Record<string, unknown>>
    ) as TenantConfig;
    merged.key = tenantKey;

    configCache.set(tenantKey, merged);

    return merged;
}

export function getTenantComponentLoader(
    tenantKey: TenantKey,
    feature: FeatureKey
): ComponentLoader {
    const config = getTenantByKey(tenantKey);
    return config.customComponents[feature];
}
