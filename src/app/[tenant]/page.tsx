import { redirect } from 'next/navigation';

interface PageProps {
    params: Promise<{ tenant: string }>;
}

export default async function TenantRootPage({ params }: PageProps) {
    const { tenant } = await params;

    // 테넌트 루트(/)로 접속 시 대시보드로 리다이렉트
    // 필요에 따라 로그인 상태를 체크하거나 login 페이지로 보낼 수도 있음
    redirect(`/${tenant}/dashboard`);
}
