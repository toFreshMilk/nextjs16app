'use client';

import React, { createContext, useContext, useMemo } from 'react';
import type { ClientTenantConfig } from '@/core/config/tenant.config';

type AppConfigContextValue = {
    tenant: ClientTenantConfig;
};

const AppConfigContext = createContext<AppConfigContextValue | null>(null);

export function AppConfigProvider({
                                      tenant,
                                      children,
                                  }: {
    tenant: ClientTenantConfig;
    children: React.ReactNode;
}) {
    const value = useMemo<AppConfigContextValue>(
        () => ({ tenant }),
        [tenant]
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
