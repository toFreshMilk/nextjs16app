import './globals.css';
import { headers } from 'next/headers';
import { AppConfigProvider } from '@/core/contexts/AppConfigContext';

export const metadata = {
    title: 'LawTle Biz',
    description: 'Enterprise Legal Management Solution',
};

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    // Server Component에서 헤더를 통해 테넌트 ID 감지
    const headersList = await headers();
    const tenantId = headersList.get('x-tenant-id') || 'default';

    return (
        <html lang="ko">
        <body>
        {/* 클라이언트 컴포넌트에 테넌트 정보 주입 */}
        <AppConfigProvider detectedTenantId={tenantId}>
            {children}
        </AppConfigProvider>
        </body>
        </html>
    );
}
