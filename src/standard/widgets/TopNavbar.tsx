'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { globalStore } from '@/core/store/global.store';
import { useObservable } from '@/core/hooks/useObservable';

export default function TopNavbar() {
    const { tenant } = useAppConfig();
    const pathname = usePathname();
    const auth = useObservable(globalStore.auth$, {
        isAuthenticated: false,
        userName: null,
        userEmail: null,
    });

    const basePath = `/${tenant.key}`;

    // ✅ 디버깅 로그
    console.log('🔗 TopNavbar:', {
        tenantKey: tenant.key,
        basePath,
        pathname,
    });

    const isActive = (segment: string) => pathname.includes(segment);

    const linkClass = (segment: string) =>
        isActive(segment)
            ? 'text-brand-primary font-bold border-b-2 border-brand-primary pb-1'
            : 'text-brand-muted hover:text-brand-text transition-colors';

    const handleLogout = () => {
        globalStore.logout();
        window.location.href = `${basePath}/login`;
    };

    return (
        <header className="sticky top-0 z-50 h-16 border-b border-white/10 bg-brand-surface/95 backdrop-blur-sm">
            <div className="h-full max-w-[1920px] mx-auto px-4 md:px-8 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link
                        href={`${basePath}/dashboard`}
                        className="text-xl font-bold tracking-tight text-brand-primary hover:opacity-80 transition"
                    >
                        {tenant.displayName}
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        {tenant.features.dashboard && (
                            <Link href={`${basePath}/dashboard`} className={linkClass('/dashboard')}>
                                대시보드
                            </Link>
                        )}
                        {tenant.features.contract && (
                            <Link href={`${basePath}/contract`} className={linkClass('/contract')}>
                                계약관리
                            </Link>
                        )}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {/* ✅ 현재 테넌트 키 표시 (디버깅용) */}
                    <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            Tenant: {tenant.key}
          </span>

                    <span className="custom-badge hidden sm:inline-block px-3 py-1 rounded-full text-xs font-bold text-white">
            {tenant.key.toUpperCase()}
          </span>

                    {auth.isAuthenticated && auth.userName && (
                        <div className="hidden md:flex items-center gap-2 text-sm">
                            <span className="text-brand-muted">{auth.userName}</span>
                            <button
                                onClick={handleLogout}
                                className="text-brand-primary hover:underline text-xs"
                            >
                                로그아웃
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
