import { ComponentType } from 'react';

export type TenantKey = 'demo' | 'apr' | 'handok' | 'iic';
export type FeatureKey = 'dashboard' | 'contract' | 'login';

type ComponentLoader = () => Promise<{ default: ComponentType<Record<string, never>> }>;

export type MenuConfig = {
    key: FeatureKey;
    label: string;
    path: string;
    enabled: boolean;
    component: ComponentLoader;
};

export type ClientMenuConfig = {
    key: FeatureKey;
    label: string;
    path: string;
    enabled: boolean;
};

export type TenantConfig = {
    key: TenantKey;
    displayName: string;
    menus: MenuConfig[];
    theme: {
        cssVars: Record<string, string>;
        inlineCss?: string;
    };
};

export type ClientTenantConfig = Omit<TenantConfig, 'menus'> & {
    menus: ClientMenuConfig[];
};

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object
        ? T[P] extends ComponentLoader
            ? T[P]
            : DeepPartial<T[P]>
        : T[P];
};

type TenantOverride = DeepPartial<Omit<TenantConfig, 'key'>> & { key: TenantKey };

function isObject(item: unknown): item is Record<string, unknown> {
    return !!item && typeof item === 'object' && !Array.isArray(item);
}

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

const DEMO_BASE_CONFIG: TenantConfig = {
    key: 'demo',
    displayName: 'Demo Workspace',
    menus: [
        {
            key: 'dashboard',
            label: 'Dashboard',
            path: '/dashboard',
            enabled: true,
            component: () => import('@/standard/dashboard/DashboardPage'),
        },
        {
            key: 'contract',
            label: 'Contract',
            path: '/contract',
            enabled: true,
            component: () => import('@/standard/contract/ContractPage'),
        },
        {
            key: 'login',
            label: 'Login',
            path: '/login',
            enabled: true,
            component: () => import('@/standard/login/LoginPage'),
        },
    ],
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
};

const TENANT_OVERRIDES: Record<TenantKey, TenantOverride> = {
    demo: {
        key: 'demo',
    },

    apr: {
        key: 'apr',
        displayName: 'APR BuptleBiz',
        menus: [
            {
                key: 'dashboard',
                label: 'APR Dashboard',
                path: '/dashboard',
                enabled: true,
                component: () => import('@/tenants/apr/dashboard/AprDashboardPage'),
            },
            {
                key: 'contract',
                label: 'Contract Management',
                path: '/contract',
                enabled: true,
                component: () => import('@/tenants/apr/contract/AprContractPage'),
            },
            {
                key: 'login',
                label: 'APR Login',
                path: '/login',
                enabled: true,
                component: () => import('@/tenants/apr/login/AprLoginPage'),
            },
        ],
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
    },

    handok: {
        key: 'handok',
        displayName: 'Handok BuptleBiz',
        menus: [
            {
                key: 'dashboard',
                label: 'Handok Dashboard',
                component: () => import('@/tenants/handok/dashboard/HandokDashboardPage'),
            },
            {
                key: 'contract',
                enabled: false,
            },
        ],
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
        },
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

export function getMenuComponent(
    tenantKey: TenantKey,
    menuKey: FeatureKey
): ComponentLoader {
    const config = getTenantByKey(tenantKey);
    const menu = config.menus.find(m => m.key === menuKey);

    if (!menu) {
        throw new Error(`Menu not found: ${menuKey} for tenant ${tenantKey}`);
    }

    return menu.component;
}

export function getTenantComponentLoader(
    tenantKey: TenantKey,
    feature: FeatureKey
): ComponentLoader {
    return getMenuComponent(tenantKey, feature);
}

export function getClientConfig(tenantKey: string): ClientTenantConfig {
    const config = getTenantByKey(tenantKey);

    const clientMenus: ClientMenuConfig[] = config.menus.map(menu => ({
        key: menu.key,
        label: menu.label,
        path: menu.path,
        enabled: menu.enabled,
    }));

    return {
        key: config.key,
        displayName: config.displayName,
        menus: clientMenus,
        theme: config.theme,
    };
}
