'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppConfig } from '@/core/contexts/AppConfigContext';

export function TopNavbar() {
  const { config } = useAppConfig();
  const pathname = usePathname();
  const isActive = (p: string) => pathname.startsWith(p);

  return (
    <nav className="h-16 px-6 border-b border-gray-200 bg-white flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="text-xl font-bold">
          Buptle<span style={{ color: config.theme.primaryColor }}>Biz</span>
        </Link>
        <div className="flex gap-4 text-sm font-medium">
          <Link href="/dashboard" className={isActive('/dashboard') ? 'text-black' : 'text-gray-500'}>대시보드</Link>
          <Link href="/contract" className={isActive('/contract') ? 'text-black' : 'text-gray-500'}>계약관리</Link>
        </div>
      </div>
      <div className="text-sm font-bold">{config.name}</div>
    </nav>
  );
}

