'use client';

import { createContext, useContext, ReactNode } from 'react';
import { TenantConfig, configs } from '@/core/config/tenant.config';

const Context = createContext<TenantConfig | null>(null);

interface Props {
    children: ReactNode;
    detectedTenantId?: string;
}

export function AppConfigProvider({ children, detectedTenantId }: Props) {
    const targetId = detectedTenantId || 'default';
    const config = configs[targetId] || configs.default;

    return (
        <Context.Provider value={config}>
            <div style={{ display: 'contents', '--primary-color': config.theme.primaryColor } as React.CSSProperties}>
                {children}
            </div>
        </Context.Provider>
    );
}

export const useAppConfig = () => {
    const context = useContext(Context);
    if (!context) throw new Error('useAppConfig must be used within AppConfigProvider');
    return context;
};
