import { ComponentType } from 'react';

// 가능한 페이지 이름 타입 정의
export type PageName = 'LoginPage' | 'DashboardPage' | 'ContractPage';

// [수정] any -> unknown (혹은 구체적인 Props 타입이 있다면 그것을 사용)
// Next.js 페이지 컴포넌트는 보통 동적 타입이므로 unknown이 적절합니다.
// 이 프로젝트에서는 서버 라우트에서 슬롯/데이터 props를 주입하므로 any로 둡니다.
type PageComponent = ComponentType<any>;

// Standard 컴포넌트 매핑
const StandardComponents: Record<PageName, () => Promise<{ default: PageComponent }>> = {
    LoginPage: () => import('@/standard/login/LoginPage'),
    DashboardPage: () => import('@/standard/dashboard/DashboardPage'),
    ContractPage: () => import('@/standard/contract/ContractPage'),
};

// Tenant Override 매핑
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
