// src/standard/shared/components/TopNavbar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { Button } from '@/uikit/form/Button';

export function TopNavbar() {
  const { config } = useAppConfig();
  const pathname = usePathname();
  const isActive = (p: string) => pathname.startsWith(p);

  return (
    <nav className="h-16 px-6 bg-white border-b border-slate-200 flex items-center justify-between">
      <div className="flex items-center gap-10">
        <Link href={`/contract`} className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black"
            style={{ backgroundColor: config.theme.primaryColor }}
          >
            B
          </div>
          <div className="leading-tight">
            <div className="text-xs font-black tracking-[0.25em] text-slate-500">GENTLE MONSTER</div>
            <div className="text-lg font-black text-slate-900">
              Buptle
              <span style={{ color: config.theme.primaryColor }}>Biz</span>
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600">
          <Link href={`/contract`} className={isActive(`/contract`) ? 'text-slate-900' : 'hover:text-slate-900'}>
            계약
          </Link>
          <Link href={`/contract`} className="hover:text-slate-900">
            자문
          </Link>
          <Link href={`/contract`} className="hover:text-slate-900">
            소송
          </Link>
          <Link href={`/contract`} className="hover:text-slate-900">
            통계
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-3 text-sm font-bold text-slate-600">
          <Link href={`/contract`} className="hover:text-slate-900">
            공지사항
          </Link>
          <Link href={`/contract`} className="hover:text-slate-900">
            관리자
          </Link>
        </div>

        <div className="relative">
          <Button variant="ghost" tone="slate" size="icon" uniqueClassName="ui-top-navbar-noti">
            <span className="absolute inset-0 flex items-center justify-center">🔔</span>
          </Button>
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[11px] font-black text-white flex items-center justify-center"
            style={{ backgroundColor: config.theme.primaryColor }}
          >
            3
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <div className="text-sm font-black text-slate-900">{config.name}</div>
            <div className="text-xs text-slate-400">관리자</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center">
            👤
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopNavbar;
