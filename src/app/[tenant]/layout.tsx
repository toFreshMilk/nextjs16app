import { ReactNode } from 'react';
import { getClientConfig } from '@/core/config/tenant.config';
import { AppConfigProvider } from '@/core/contexts/AppConfigContext';

type Props = {
    children: ReactNode;
    params: Promise<{ tenant: string }>;  // ✅ Promise 타입
};

export default async function TenantLayout({ children, params }: Props) {
    const { tenant } = await params;  // ✅ await로 풀기
    const clientConfig = getClientConfig(tenant);

    const cssVarsStyle = Object.entries(clientConfig.theme.cssVars)
        .map(([key, value]) => `${key}: ${value};`)
        .join(' ');

    return (
        <div data-tenant={clientConfig.key} style={{ cssVarsStyle } as React.CSSProperties}>
            {clientConfig.theme.inlineCss && (
                <style dangerouslySetInnerHTML={{ __html: clientConfig.theme.inlineCss }} />
            )}
            <AppConfigProvider tenant={clientConfig}>
                {children}
            </AppConfigProvider>
        </div>
    );
}
