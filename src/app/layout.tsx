import type { Metadata } from 'next';
import './globals.css';
import '@/standard/standard.css';

// 테넌트 커스텀 CSS
import '@/tenants/apr/apr.css';
import '@/tenants/handok/handok.css';
import '@/tenants/iic/iic.css';

export const metadata: Metadata = {
    title: 'BuptleBiz Legal Solution',
    description: 'Enterprise Legal Management System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
        {/* ✅ body는 최소한의 스타일만, 테마는 Tenant Layout에서 주입 */}
        <body className="antialiased">
        {children}
        </body>
        </html>
    );
}
