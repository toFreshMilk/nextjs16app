'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppConfig } from '@/core/contexts/AppConfigContext';

export function TopNavbar() {
  const { config } = useAppConfig();
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);
  const primaryColor = config.theme.primaryColor;

  return (
    <nav className="h-16 px-4 sm:px-8 flex items-center justify-between border-b border-slate-200 bg-white">
      {/* Logo & Brand */}
      <div className="flex items-center gap-10">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md transition-transform group-hover:scale-105"
            style={{ backgroundColor: primaryColor }}
          >
            B
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Buptle<span style={{ color: primaryColor }}>Biz</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-1 h-10 bg-slate-100 p-1 rounded-lg">
          {[
            { name: '대시보드', href: '/dashboard' },
            { name: '계약 관리', href: '/contract' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 flex items-center text-sm font-medium rounded-md transition-all ${
                isActive(item.href)
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* User Profile & Tenant Info */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-slate-900">{config.name}</p>
          <p className="text-xs text-slate-500">Administrator</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 border-2 border-white shadow-sm" />
      </div>
    </nav>
  );
}

