// src/app/[lang]/layout.tsx
import { ComponentType, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { loadTenantConfig, getTenantId } from '@/core/config/tenant.config';
import { AppConfigProvider } from '@/core/contexts/AppConfigContext';

// 스타일 로더 설정
const LOADERS: Record<string, ComponentType> = {
  apr: dynamic(() => import('@/tenants/apr/shared/APRStyleLoader'), { ssr: true }),
  demo: dynamic(() => import('@/tenants/demo/shared/DemoStyleLoader'), { ssr: true }),
};

export function TenantStyleGateway({ tenant }: { tenant: string }) {
  const Loader = LOADERS[tenant];
  if (!Loader) return null;
  return <Loader />;
}

export default async function LangLayout({ children }: { children: ReactNode }) {
  // [변경] 미들웨어가 심어준 헤더에서 tenant 추출
  const tenant = await getTenantId();

  let config;
  try {
    config = await loadTenantConfig(tenant);
  } catch {
    throw new Error(`Tenant config load failed: ${tenant}`);
  }

  const configData = {
    id: config.id,
    name: config.name,
    features: config.features,
    theme: config.theme,
  };

  return (
    <AppConfigProvider tenantConfig={configData}>
      {/* 테넌트별 스타일 로드 */}
      <TenantStyleGateway tenant={tenant} />

      {/* 하위 페이지 렌더링 */}
      {children}
    </AppConfigProvider>
  );
}
