// src/app/[tenant]/layout.tsx
import { ComponentType, ReactNode } from 'react';
import { Metadata } from 'next';
import { loadTenantConfig } from '@/core/config/tenant.config';
import { AppConfigProvider } from '@/core/contexts/AppConfigContext';
import dynamic from 'next/dynamic';

const LOADERS: Record<string, ComponentType> = {
  apr: dynamic(() => import('@/tenants/apr/shared/APRStyleLoader'), { ssr: true }),
  demo: dynamic(() => import('@/tenants/demo/shared/DemoStyleLoader'), { ssr: true }),
};

export function TenantStyleGateway({ tenant }: { tenant: string }) {
  // [로직] O(1) 속도로 즉시 컴포넌트를 찾습니다. if/else 분기보다 빠르고 깔끔합니다.
  const Loader = LOADERS[tenant];

  // 등록되지 않은 테넌트라면 아무것도 로드하지 않습니다.
  if (!Loader) {
    return null;
  }

  return <Loader />;
}

export async function generateMetadata({ params }: { params: Promise<{ tenant: string }> }): Promise<Metadata> {
  const { tenant } = await params;
  return {
    icons: {
      icon: `/favicons/${tenant}.svg`,
    },
  };
}

export default async function TenantLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  let config;

  try {
    config = await loadTenantConfig(tenant);
  } catch {
    // 테넌트 설정 로딩 실패 시 error.tsx로 유도
    throw new Error(`Tenant config load failed: ${tenant}`);
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
      <TenantStyleGateway tenant={tenant} />
      {children}
    </AppConfigProvider>
  );
}
