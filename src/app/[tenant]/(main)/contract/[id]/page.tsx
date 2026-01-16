// src/app/[tenant]/(main)/contract/[id]/page.tsx
import { getTenantComponent } from '@/core/config/tenant.config';

export default async function ContractDetailPage({
  params,
}: {
  params: Promise<{ tenant: string; id: string }>;
}) {
  const { tenant } = await params;

  const Top = await getTenantComponent(tenant, 'ContractDetailTop');
  const Left = await getTenantComponent(tenant, 'ContractDetailLeft');
  const Right = await getTenantComponent(tenant, 'ContractDetailRight');

  return (
    <div className="-m-10 p-10 bg-slate-50 min-h-[calc(100vh-64px)] space-y-6">
      <Top />
      <div className="flex gap-6">
        <div className="flex-1 min-w-0">
          <Left />
        </div>
        <div className="w-[420px] shrink-0">
          <Right />
        </div>
      </div>
    </div>
  );
}

