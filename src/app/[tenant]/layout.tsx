import React from 'react';
import { getTenantByKey } from '@/core/config/tenant.config';
import { AppConfigProvider } from '@/core/contexts/AppConfigContext';

type Props = {
    children: React.ReactNode;
    params: Promise<{ tenant: string }>;
};

export default async function TenantLayout({ children, params }: Props) {
    const { tenant } = await params;
    const config = getTenantByKey(tenant);

    // ✅ customComponents 제거 (함수는 Client Component로 전달 불가)
    const { customComponents, ...safeTenantConfig } = config;

    const themeStyles = config.theme.cssVars as React.CSSProperties;

    console.log('🏢 TenantLayout SSR:', {
        paramTenant: tenant,
        configKey: config.key,
        configName: config.displayName,
    });

    return (
        <AppConfigProvider tenant={safeTenantConfig}>
            <div
                data-tenant={config.key}
                style={themeStyles}
                className="min-h-screen bg-brand-bg text-brand-text transition-colors duration-500"
            >
                {children}

                {config.theme.inlineCss && (
                    <style dangerouslySetInnerHTML={{ __html: config.theme.inlineCss }} />
                )}
            </div>
        </AppConfigProvider>
    );
}
