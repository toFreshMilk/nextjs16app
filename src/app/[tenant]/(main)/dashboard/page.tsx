import { getTenantComponent, getTenantPage, getTenantService } from '@/core/config/tenant.config';

export default async function DashboardPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  const Page = await getTenantPage(tenant, 'DashboardPage');
  const dashboardService = await getTenantService<any>(tenant, 'DashboardService');
  const stats = await dashboardService.getStats();
  const DashboardChart = await getTenantComponent(tenant, 'DashboardChart');

  return <Page stats={stats} chart={<DashboardChart />} />;
}

