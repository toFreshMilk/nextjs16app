// src/app/[tenant]/(main)/contract/page.tsx
import { getTenantComponent } from '@/core/config/tenant.config';

export default async function ContractPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;

  // 2) 없으면 슬롯 단위( Sidebar / Main ) 조합
  const Sidebar = await getTenantComponent(tenant, 'ContractSidebar');
  const Main = await getTenantComponent(tenant, 'ContractMain');

  return (
    <div className="flex gap-6 -m-10 p-10 bg-slate-50 min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <Sidebar />
      {/* Main */}
      <Main />
    </div>
  );
}

