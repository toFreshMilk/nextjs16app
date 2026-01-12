import { getTenantComponentLoader } from '@/core/config/tenant.config';
import type { TenantKey } from '@/core/config/tenant.config';

type Props = {
    params: Promise<{ tenant: string }>;  // ✅ Promise 타입
};

export default async function DashboardPage({ params }: Props) {
    const { tenant } = await params;  // ✅ await로 풀기

    const ComponentLoader = getTenantComponentLoader(
        tenant as TenantKey,
        'dashboard'
    );

    const { default: DashboardComponent } = await ComponentLoader();

    return <DashboardComponent />;
}
