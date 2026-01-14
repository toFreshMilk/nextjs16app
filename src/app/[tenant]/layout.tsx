import { ReactNode } from 'react';
import { loadTenantConfig } from '@/core/config/tenant.config';
import { AppConfigProvider, TenantConfigData } from '@/core/contexts/AppConfigContext';
import { notFound } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ tenant: string }>;
}

export default async function TenantLayout({ children, params }: LayoutProps) {
  const { tenant } = await params;
  let fullConfig;

  try {
    fullConfig = await loadTenantConfig(tenant);
  } catch (e) {
    console.error(`Config load failed: ${tenant}`, e);
    notFound();
  }

  // Client Component로 넘길 데이터 (함수 제외 순수 데이터)
  const configData: TenantConfigData = {
    id: fullConfig.id,
    name: fullConfig.name,
    features: fullConfig.features,
    theme: fullConfig.theme,
  };

  return (
    <AppConfigProvider tenantConfig={configData}>
      {children}
    </AppConfigProvider>
  );
}

