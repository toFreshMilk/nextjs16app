'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppConfig } from '@/core/contexts/AppConfigContext';

export function TopNavbar() {
    const { config } = useAppConfig();
    const pathname = usePathname(); // 여기엔 실제 브라우저 경로(/dashboard)가 들어옴

    // [수정] 링크에는 테넌트 ID를 포함하지 않음 (Proxy가 처리함)
    const root = '';

    const isActive = (href: string) => pathname.startsWith(href);

    const linkClass = (href: string) =>
        isActive(href)
            ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
            : 'text-gray-500 hover:text-slate-700';

    return (
        <header className="bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Link href="/dashboard" className="text-xl font-bold">
                    Buptle<span style={{ color: config.theme.primaryColor }}>Biz</span>
                </Link>
                <nav className="flex gap-6 h-16">
                    <Link href="/dashboard" className={`flex items-center px-1 ${linkClass('/dashboard')}`}>
                        대시보드
                    </Link>
                    <Link href="/contract" className={`flex items-center px-1 ${linkClass('/contract')}`}>
                        계약 관리
                    </Link>
                </nav>
            </div>
            <div>
                <span className="text-sm text-gray-500">{config.name} Workspace</span>
            </div>
        </header>
    );
}
