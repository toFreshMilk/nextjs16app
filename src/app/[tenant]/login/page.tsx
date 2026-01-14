import { getTenantComponent } from '@/core/config/tenant.config';

interface PageProps { params: Promise<{ tenant: string }> }

export default async function LoginPage({ params }: PageProps) {
    const { tenant } = await params;

    // [수정] Config가 아니라 Loader에서 컴포넌트를 가져옴
    // 데모는 오버라이드된 파일이 오고, 나머지는 Standard가 옴
    const Component = await getTenantComponent(tenant, 'LoginPage');

    return <Component />;
}
