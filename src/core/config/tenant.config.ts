import { ComponentType } from 'react';

export type TenantKey = 'demo' | 'apr' | 'handok' | 'iic';

export type FeatureKey = 'dashboard' | 'contract' | 'login';

type ComponentLoader = () => Promise<{ default: ComponentType<any> }>;

export type TenantConfig = {
    key: TenantKey;
    displayName: string;
    features: Record<FeatureKey, boolean>;
    theme: {
        cssVars: Record<string, string>;
        inlineCss?: string;
    };
    customComponents?: {
        login?: ComponentLoader;
        dashboard?: ComponentLoader;
        contract?: ComponentLoader;
    };
};

export const TENANTS: Record<TenantKey, TenantConfig> = {
    // Demo: 표준 구현만 사용
    demo: {
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
    },

    // APR: 대시보드, 계약, 로그인 커스텀
    apr: {
        key: 'apr',
        displayName: 'APR BuptleBiz',
        features: { dashboard: true, contract: true, login: true },
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
        [data-tenant="apr"] .custom-badge {
          background: linear-gradient(135deg, #EA002C 0%, #C40023 100%);
          box-shadow: 0 4px 12px rgba(234, 0, 44, 0.3);
        }
      `,
        },
        customComponents: {
            login: () => import('@/tenants/apr/login/AprLoginPage'),
            dashboard: () => import('@/tenants/apr/dashboard/AprDashboardPage'),
            contract: () => import('@/tenants/apr/contract/AprContractPage'),
        },
    },

    // Handok: 대시보드만 커스텀
    handok: {
        key: 'handok',
        displayName: 'Handok BuptleBiz',
        features: { dashboard: true, contract: true, login: true },
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

    // IIC: 로그인 + 대시보드 커스텀
    iic: {
        key: 'iic',
        displayName: 'IIC BuptleBiz',
        features: { dashboard: true, contract: true, login: true },
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

export function isKnownTenantKey(value: string): value is TenantKey {
    return value in TENANTS;
}

export function getTenantByKey(key: string): TenantConfig {
    if (!isKnownTenantKey(key)) {
        console.warn(`Unknown tenant: ${key}, fallback to demo`);
        return TENANTS.demo;
    }
    return TENANTS[key];
}
