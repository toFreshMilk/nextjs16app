import { ReactNode } from 'react';
import { getClientConfig } from '@/core/config/tenant.config';
import { AppConfigProvider } from '@/core/contexts/AppConfigContext';

type Props = {
    children: ReactNode;
    params: Promise<{ tenant: string }>;
};

export default async function TenantLayout({ children, params }: Props) {
    const { tenant } = await params;
    const clientConfig = getClientConfig(tenant);

    return (
        <div data-tenant={clientConfig.key} style={clientConfig.theme.cssVars as React.CSSProperties}>
            {clientConfig.theme.inlineCss && (
                <style dangerouslySetInnerHTML={{ __html: clientConfig.theme.inlineCss }} />
            )}
            <AppConfigProvider tenant={clientConfig}>
                {children}
            </AppConfigProvider>
        </div>
    );
}
