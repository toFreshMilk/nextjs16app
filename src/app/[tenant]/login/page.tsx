// src/app/[tenant]/login/page.tsx
import { getTenantPage } from '@/core/config/tenant.config';

export default async function LoginPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  const Page = await getTenantPage(tenant, 'LoginPage');
  return <Page />;
}

