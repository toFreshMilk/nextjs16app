// src/app/[tenant]/(main)/contract/page.tsx
import { ComponentType } from 'react';
import { getTenantComponent, getTenantPage, loadTenantConfig } from '@/core/config/tenant.config';

export default async function ContractPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;

  // 1) 페이지 단위 override가 있으면 그걸 최우선으로 사용
  const config = await loadTenantConfig(tenant);
  const hasPageOverride =
    Boolean(config.pages?.ContractPage) ||
    Boolean((config as unknown as { components?: Record<string, unknown> }).components?.ContractPage);

  if (hasPageOverride) {
    const Page = await getTenantPage(tenant, 'ContractPage');
    return <Page />;
  }

  // 2) 없으면 슬롯 단위( Sidebar / Main ) 조합
  const Sidebar = (await getTenantComponent(tenant, 'ContractSidebar')) as ComponentType<Record<string, never>>;
  const Main = (await getTenantComponent(tenant, 'ContractMain')) as ComponentType<Record<string, never>>;

  return (
    <div className="flex gap-6 -m-10 p-10 bg-slate-50 min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <Sidebar />
      {/* Main */}
      <Main />
    </div>
  );
}

