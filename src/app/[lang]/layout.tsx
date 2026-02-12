// src/app/[lang]/layout.tsx
import type { ComponentType, ReactNode } from 'react';
import dynamic from 'next/dynamic';

import { loadTenantConfig, getTenantId } from '@/core/config/tenant.config';
import { AppConfigProvider } from '@/core/contexts/AppConfigContext';

import { getI18nResources } from '@/core/i18n/server';
import I18nProvider from '@/core/providers/I18nProvider';
import { pickI18nOwnerMap } from '@/standard/registry';

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

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang;

  // [변경] 프록시(Proxy)가 심어준 헤더에서 tenant 추출
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

  // ✅ 여기서는 common만 로딩
  // ✅ owner map 하드코딩 제거 -> registry 헬퍼로 필요한 ns만 전달
  const resources = await getI18nResources(lang, tenant, ['common'], pickI18nOwnerMap(['common']));

  return (
    <AppConfigProvider tenantConfig={configData}>
      {/* 테넌트별 스타일 로드 */}
      <TenantStyleGateway tenant={tenant} />

      {/* i18n Provider */}
      <I18nProvider lang={lang} resources={resources}>
        {children}
      </I18nProvider>
    </AppConfigProvider>
  );
}
