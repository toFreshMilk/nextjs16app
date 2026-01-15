// src/app/[tenant]/(main)/dashboard/page.tsx
import { getTenantPage } from '@/core/config/tenant.config';

export default async function DashboardPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  const Page = await getTenantPage(tenant, 'DashboardPage');
  return <Page />;
}

