import { ComponentType } from 'react';

// ==========================================
// 1. 순수 설정 데이터 (Config Data)
// ==========================================
export interface TenantConfig {
    id: string;
    name: string;
    features: {
        i18n: boolean;
        ai: boolean;
    };
    theme: {
        primaryColor: string;
    };
}

export async function loadTenantConfig(tenantId: string): Promise<TenantConfig> {
    switch (tenantId) {
        case 'demo':
            return (await import('./tenants/demo.config')).default;
        case 'apr':
            return (await import('./tenants/apr.config')).default;
        default:
            return {
                id: tenantId,
                name: 'Unknown Workspace',
                features: { i18n: false, ai: false },
                theme: { primaryColor: '#64748b' },
            };
    }
}

// ==========================================
// 2. 컴포넌트 로더 로직 (Component Loader)
// ==========================================

export type PageName = 'LoginPage' | 'DashboardPage' | 'ContractPage';
type PageComponent = ComponentType<unknown>;

// Standard Loaders
const StandardComponents: Record<PageName, () => Promise<{ default: PageComponent }>> = {
    LoginPage: () => import('@/standard/login/LoginPage'),
    DashboardPage: () => import('@/standard/dashboard/DashboardPage'),
    ContractPage: () => import('@/standard/contract/ContractPage'),
};

// Tenant Overrides Registry
const TenantOverrides: Record<string, Partial<Record<PageName, () => Promise<{ default: PageComponent }>>>> = {
    demo: {
        LoginPage: () => import('@/tenants/demo/login/DemoLoginPage'),
        DashboardPage: () => import('@/tenants/demo/dashboard/DemoDashboardPage'),
    },
    apr: {
        LoginPage: () => import('@/tenants/apr/login/AprLoginPage'),
        DashboardPage: () => import('@/tenants/apr/dashboard/AprDashboardPage'),
    },
};

/**
 * 테넌트별 컴포넌트를 로드합니다. (Config와 같은 파일에 위치하여 응집도 향상)
 */
export async function getTenantComponent(tenantId: string, pageName: PageName): Promise<PageComponent> {
    const overrides = TenantOverrides[tenantId];
    const loader = overrides?.[pageName] || StandardComponents[pageName];

    if (!loader) {
        throw new Error(`Component loader not found for page: ${pageName}`);
    }

    try {
        const loadedModule = await loader();
        return loadedModule.default;
    } catch (error) {
        console.error(`Failed to load component ${pageName} for tenant ${tenantId}`, error);
        throw error;
    }
}
