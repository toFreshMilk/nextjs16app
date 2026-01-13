import { ComponentType } from 'react';

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
    components: {
        LoginPage: ComponentType;
        DashboardPage: ComponentType;
        ContractPage: ComponentType;
    };
}

export async function loadTenantConfig(tenantId: string): Promise<TenantConfig> {
    switch (tenantId) {
        case 'demo': return (await import('./tenants/demo.config')).default;
        case 'apr': return (await import('./tenants/apr.config')).default;
        default: throw new Error(`Unknown tenant: ${tenantId}`);
    }
}
