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
    customMenus: Record<FeatureKey, ComponentLoader>;
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

// ✅ Type guard
function isObject(item: unknown): item is Record<string, unknown> {
    return !!item && typeof item === 'object' && !Array.isArray(item);
}

// ✅ Deep merge 유틸리티 함수
function deepMerge<T extends Record<string, unknown>>(
    target: T,
    source: Partial<T>
): T {
    const output = { ...target };

    for (const key in source) {
        const sourceValue = source[key];
        const targetValue = output[key];

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

// ✅ DEMO 기본 설정 (완전한 설정)
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
    customMenus: {
        login: () => import('@/standard/login/LoginPage'),
        dashboard: () => import('@/standard/dashboard/DashboardPage'),
        contract: () => import('@/standard/contract/ContractPage'),
    },
};

// ✅ 테넌트별 Override 설정 - 다양한 케이스
const TENANT_OVERRIDES: Record<TenantKey, TenantOverride> = {
    demo: {
        key: 'demo',
    },

    // ✅ Case 1: APR - Full Customization (모든 요소 커스터마이징)
    apr: {
        key: 'apr',
        displayName: 'APR BuptleBiz',
        // ✅ 모든 기능 활성화 (명시적으로 표현)
        features: {
            dashboard: true,
            contract: true,
            login: true
        },
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
          font-weight: 700;
        }
        [data-tenant="apr"] .nav-item:hover {
          background-color: #EA002C;
        }
      `,
        },
        // ✅ 모든 페이지를 커스텀 컴포넌트로 override
        customMenus: {
            login: () => import('@/tenants/apr/login/AprLoginPage'),
            dashboard: () => import('@/tenants/apr/dashboard/AprDashboardPage'),
            contract: () => import('@/tenants/apr/contract/AprContractPage'),
        },
    },

    // ✅ Case 2: Handok - Partial Customization (일부 기능 비활성화 + 일부만 커스터마이징)
    handok: {
        key: 'handok',
        displayName: 'Handok BuptleBiz',
        // ✅ contract 기능 비활성화 (차별화 포인트)
        features: {
            dashboard: true,
            contract: false,  // ⚠️ 비활성화
            login: true
        },
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
        // ✅ dashboard만 커스터마이징, login은 demo 기본값 사용
        customMenus: {
            dashboard: () => import('@/tenants/handok/dashboard/HandokDashboardPage'),
            // login: demo 기본값 (LoginPage) 사용
            // contract: demo 기본값 (ContractPage) 사용 (하지만 features에서 비활성화됨)
        },
    },

    // ✅ Case 3: IIC - Minimal Customization (테마만 변경, 나머지 전부 demo)
    iic: {
        key: 'iic',
        displayName: 'IIC BuptleBiz',
        // ✅ features 명시 안 함 → demo 기본값 상속 (모두 true)
        theme: {
            // ✅ CSS Variables만 부분 override (inlineCss는 demo 기본값 사용)
            cssVars: {
                '--brand-primary': '#FF6B00',
                '--brand-primary-weak': '#FFEADB',
                '--brand-bg': '#0F0A06',
                '--brand-surface': '#1A1410',
                '--brand-text': '#FFF5F0',
                '--brand-muted': '#B59080',
            },
            // ✅ inlineCss는 명시하지 않음 → demo 기본값(undefined) 사용
        },
        // ✅ customMenus 자체를 명시하지 않음 → 모든 페이지가 demo 기본값 사용
        // login: LoginPage (demo)
        // dashboard: DashboardPage (demo)
        // contract: ContractPage (demo)
    },
};

export function isKnownTenantKey(value: string): value is TenantKey {
    return value in TENANT_OVERRIDES;
}

export function getTenantByKey(key: string): TenantConfig {
    const tenantKey = isKnownTenantKey(key) ? key : 'demo';

    const override = TENANT_OVERRIDES[tenantKey];
    const merged = deepMerge(
        DEMO_BASE_CONFIG as Record<string, unknown>,
        override as Partial<Record<string, unknown>>
    ) as TenantConfig;
    merged.key = tenantKey;

    return merged;
}

export function getTenantComponentLoader(
    tenantKey: TenantKey,
    feature: FeatureKey
): ComponentLoader {
    const config = getTenantByKey(tenantKey);
    return config.customMenus[feature];
}
