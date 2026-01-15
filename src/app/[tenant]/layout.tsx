import { ReactNode } from 'react';
import { loadTenantConfig } from '@/core/config/tenant.config';
import { AppConfigProvider } from '@/core/contexts/AppConfigContext';
import { notFound } from 'next/navigation';

export default async function TenantLayout({ 
  children, 
  params 
}: { 
  children: ReactNode;
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  let config;

  try {
    config = await loadTenantConfig(tenant);
  } catch {
    notFound();
  }

  // 함수 제외한 순수 데이터만 클라이언트로 전달
  const configData = {
    id: config.id,
    name: config.name,
    features: config.features,
    theme: config.theme,
  };

  return (
    <AppConfigProvider tenantConfig={configData}>
      {children}
    </AppConfigProvider>
  );
}

