'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppConfig } from '@/core/contexts/AppConfigContext';

export default function TopNavbar() {
    const { tenant } = useAppConfig();
    const pathname = usePathname();

    // ✅ features 대신 menus 사용
    const enabledMenus = tenant.menus.filter(menu => menu.enabled);

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
                        {enabledMenus.map(menu => (
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
            </div>
        </header>
    );
}
