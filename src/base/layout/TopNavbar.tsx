'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/uikit/branding/Logo';
import { useAppConfig } from '@/core/contexts/AppConfigContext';

export default function TopNavbar() {
    const pathname = usePathname();
    const config = useAppConfig();

    // 요구사항에 정의된 메뉴 목록
    const menus = [
        { name: '대시보드', href: '/dashboard' },
        { name: '계약 관리', href: '/contract' },
        { name: '법률 자문', href: '/advisory' },
        { name: '소송 관리', href: '/litigation' },
        { name: '통계', href: '/statistics' },
        { name: '관리자', href: '/admin' },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* 로고 영역 */}
                    <div className="flex items-center">
                        <Link href="/dashboard" className="flex-shrink-0 flex items-center">
                            <Logo tenantName={config.name} />
                        </Link>
                    </div>

                    {/* 메뉴 영역 */}
                    <div className="hidden sm:flex sm:space-x-8">
                        {menus.map((menu) => {
                            const isActive = pathname.startsWith(menu.href);
                            return (
                                <Link
                                    key={menu.href}
                                    href={menu.href}
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full transition-colors ${
                                        isActive
                                            ? 'border-[var(--primary-color)] text-gray-900'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {menu.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* 우측 유저 영역 */}
                    <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-100 border flex items-center justify-center text-xs font-bold text-gray-500">
                            U
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
