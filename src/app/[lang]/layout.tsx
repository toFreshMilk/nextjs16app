// src/app/[lang]/layout.tsx
import type { ComponentType, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { headers } from 'next/headers';

import { DEFAULT_LANG, getTenantId, loadTenantConfig } from '@/core/config/tenant.config';
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
}: {
  children: ReactNode;
}) {
  // ✅ URL([lang])는 진실의 원천이지만, 정책/정규화 결과는 proxy.ts가 결정합니다.
  // - i18n off 테넌트는 proxy.ts가 x-lang=ko로 고정
  // - i18n on 테넌트는 URL과 일치하는 x-lang을 주입
  // 따라서 레이아웃은 params.lang을 다루지 않고, x-lang 헤더만 신뢰합니다.

  // [변경] 프록시(Proxy)가 심어준 헤더에서 tenant 추출
  const tenant = await getTenantId();

  const headersList = await headers();
  const lang = headersList.get('x-lang') || DEFAULT_LANG;

  // ✅ 설정값은 그냥 가져다 쓴다. (feature/테마/테넌트명 등)
  // ✅ config load 실패/테넌트 검증은 proxy.ts가 이미 처리하므로, 여기서는 단순 로드만 한다.
  const config = await loadTenantConfig(tenant);
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
