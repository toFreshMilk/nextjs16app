// 📁 src/standard/services/ContractList.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppConfig } from '@/core/contexts/AppConfigContext';

export default function TopNavbar() {
    const { tenant } = useAppConfig();
    const pathname = usePathname();

    // ✅ topMenus를 order 순서대로 정렬
    const sortedMenus = [...tenant.topMenus].sort((a, b) => a.order - b.order);

    const linkClass = (path: string) => {
        const isActive = pathname === path || pathname.endsWith(path);
        return isActive
            ? 'text-[var(--brand-primary)] font-semibold'
            : 'text-[var(--brand-text)] hover:text-[var(--brand-primary)]';
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[var(--brand-surface)] bg-[var(--brand-bg)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--brand-bg)]/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                    <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
                        <span className="font-bold text-[var(--brand-primary)]">
                            {tenant.displayName}
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        {sortedMenus.map(menu => (
                            <Link
                                key={menu.key}
                                href={menu.path}
                                className={linkClass(menu.path)}
                            >
                                {menu.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* ✅ 기능 플래그에 따른 UI 표시 예시 */}
                <div className="ml-auto flex items-center gap-2">
                    {tenant.features.search && (
                        <button className="p-2 hover:bg-[var(--brand-surface)] rounded">
                            🔍 Search
                        </button>
                    )}
                    {tenant.features.notification && (
                        <button className="p-2 hover:bg-[var(--brand-surface)] rounded">
                            🔔 Notifications
                        </button>
                    )}
                    {tenant.features.chat && (
                        <button className="p-2 hover:bg-[var(--brand-surface)] rounded">
                            💬 Chat
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
