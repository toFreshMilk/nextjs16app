'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { GlobalStore } from '../store/global.store';
import { TenantConfig } from '../config/tenant.config';

export type TenantConfigData = Omit<TenantConfig, 'components'>;

interface ContextValue {
    config: TenantConfigData;
    store: GlobalStore;
}

const AppConfigContext = createContext<ContextValue | null>(null);

export function AppConfigProvider({
                                      tenantConfig,
                                      children
                                  }: {
    tenantConfig: TenantConfigData;
    children: React.ReactNode;
}) {
    const store = useMemo(() => new GlobalStore({ tenantId: tenantConfig.id }), [tenantConfig.id]);

    return (
        <AppConfigContext.Provider value={{ config: tenantConfig, store }}>
            {children}
        </AppConfigContext.Provider>
    );
}

export function useAppConfig() {
    const ctx = useContext(AppConfigContext);
    if (!ctx) throw new Error('useAppConfig must be used within AppConfigProvider');
    return ctx;
}
