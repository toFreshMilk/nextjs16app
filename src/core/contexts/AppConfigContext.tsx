'use client';

import React, { createContext, useContext, useMemo } from 'react';
import type { TenantConfig } from '@/core/config/tenant.config';

// ✅ 함수 제외한 안전한 타입
type SafeTenantConfig = Omit<TenantConfig, 'customComponents'>;

type AppConfigContextValue = {
    tenant: SafeTenantConfig;
};

const AppConfigContext = createContext<AppConfigContextValue | null>(null);

export function AppConfigProvider({
                                      tenant,
                                      children,
                                  }: {
    tenant: TenantConfig;
    children: React.ReactNode;
}) {
    // ✅ customComponents 제외하고 전달
    const safeTenant: SafeTenantConfig = useMemo(() => {
        const { customComponents, ...rest } = tenant;
        return rest;
    }, [tenant]);

    const value = useMemo<AppConfigContextValue>(
        () => ({ tenant: safeTenant }),
        [safeTenant]
    );

    return (
        <AppConfigContext.Provider value={value}>
            {children}
        </AppConfigContext.Provider>
    );
}

export function useAppConfig(): AppConfigContextValue {
    const context = useContext(AppConfigContext);
    if (!context) {
        throw new Error('useAppConfig must be used within AppConfigProvider');
    }
    return context;
}
