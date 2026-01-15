import { getTenantComponent, getTenantPage } from '@/core/config/tenant.config';

export default async function LoginPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  const WorkspaceBanner = await getTenantComponent(tenant, 'WorkspaceBanner');
  const Page = await getTenantPage(tenant, 'LoginPage');
  return (
    <>
      <WorkspaceBanner />
      <Page />
    </>
  );
}

