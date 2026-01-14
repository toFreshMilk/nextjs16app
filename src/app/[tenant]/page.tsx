import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ tenant: string }>;
}

export default async function TenantRootPage({ params }: PageProps) {
  const { tenant } = await params;
  // 테넌트 루트 진입 시 대시보드로 이동
  redirect(`/${tenant}/dashboard`);
}

