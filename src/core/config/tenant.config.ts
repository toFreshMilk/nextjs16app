import { ComponentType } from 'react';
import { deepMerge } from '@/core/utils/object.util';
import {aprConfig} from "@/core/config/tenants/apr.config";
import {handokConfig} from "@/core/config/tenants/handok.config";
import {iicConfig} from "@/core/config/tenants/iic.config";


export type TenantKey = 'demo' | 'apr' | 'handok' | 'iic';
export type PageKey = 'dashboard' | 'contract' | 'login';

export type FeatureKey =
    | 'email'
    | 'ai'
    | 'i18n'
    | 'notification'
    | 'search'
    | 'chat'
    | 'analytics';

type ComponentLoader = () => Promise<{ default: ComponentType<Record<string, never>> }>;

export type TopMenuConfig = {
    key: PageKey;
    label: string;
    path: string;
    order: number;
};

export type PageConfig = {
    key: PageKey;
    path: string;
    component: ComponentLoader;
};

export type FeatureFlags = Record<FeatureKey, boolean>;

export type TenantConfig = {
    key: TenantKey;
    displayName: string;
    topMenus: TopMenuConfig[];
    pages: PageConfig[];
    features: FeatureFlags;
    theme: {
        cssVars: Record<string, string>;
        inlineCss?: string;
    };
};

export type ClientTenantConfig = Omit<TenantConfig, 'pages'> & {
    pages: Array<Omit<PageConfig, 'component'>>;
};

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object
        ? T[P] extends ComponentLoader
            ? T[P]
            : DeepPartial<T[P]>
        : T[P];
};

export type TenantOverride = DeepPartial<Omit<TenantConfig, 'key'>> & { key: TenantKey };

const DEMO_BASE_CONFIG: TenantConfig = {
    key: 'demo',
    displayName: 'Demo Workspace',

    topMenus: [
        { key: 'dashboard', label: 'Dashboard', path: '/dashboard', order: 1 },
        { key: 'contract', label: 'Contract', path: '/contract', order: 2 },
    ],

    pages: [
        {
            key: 'dashboard',
            path: '/dashboard',
            component: () => import('@/standard/dashboard/DashboardPage'),
        },
        {
            key: 'contract',
            path: '/contract',
            component: () => import('@/standard/contract/ContractPage'),
        },
        {
            key: 'login',
            path: '/login',
            component: () => import('@/standard/login/LoginPage'),
        },
    ],

    features: {
        email: true,
        ai: false,
        i18n: true,
        notification: true,
        search: true,
        chat: false,
        analytics: true,
    },

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
    apr: aprConfig,
    handok: handokConfig,
    iic: iicConfig,
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

export function getPageComponent(
    tenantKey: TenantKey,
    pageKey: PageKey
): ComponentLoader {
    const config = getTenantByKey(tenantKey);
    const page = config.pages.find(p => p.key === pageKey);

    if (!page) {
        throw new Error(`Page not found: ${pageKey} for tenant ${tenantKey}`);
    }

    return page.component;
}

export function getTenantComponentLoader(
    tenantKey: TenantKey,
    pageKey: PageKey
): ComponentLoader {
    return getPageComponent(tenantKey, pageKey);
}

export function getClientConfig(tenantKey: string): ClientTenantConfig {
    const config = getTenantByKey(tenantKey);

    const clientPages = config.pages.map(page => ({
        key: page.key,
        path: page.path,
    }));

    return {
        key: config.key,
        displayName: config.displayName,
        topMenus: config.topMenus,
        pages: clientPages,
        features: config.features,
        theme: config.theme,
    };
}
