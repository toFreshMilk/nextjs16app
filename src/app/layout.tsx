// src/app/layout.tsx
import './globals.css';
import type { ComponentType, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next'; // [1] Metadata 타입 import 필수
import QueryProvider from '@/core/providers/QueryProvider'; // 방금 만든 파일
import { headers } from 'next/headers';
import { isTenantId } from '@/core/config/tenant.config';

const inter = Inter({ subsets: ['latin'] });

const STYLE_LOADERS: Record<string, ComponentType> = {
  apr: dynamic(() => import('@/tenants/apr/shared/APRStyleLoader'), { ssr: true }),
  demo: dynamic(() => import('@/tenants/demo/shared/DemoStyleLoader'), { ssr: true }),
};

function TenantStyleGateway({ tenantId }: { tenantId: string | null }) {
  if (!tenantId || !isTenantId(tenantId)) return null;
  const Loader = STYLE_LOADERS[tenantId];
  if (!Loader) return null;
  return <Loader />;
}

// [2] export const metadata에 Metadata 타입 명시
export const metadata: Metadata = {
  title: {
    template: '%s | Buptle Biz', // [3] 하위 페이지에서 타이틀을 조합할 수 있도록 템플릿 설정 권장
    default: 'Buptle Biz', // 기본 타이틀
  },
  description: 'Enterprise Legal Solution',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headersList = await headers();
  const lang = headersList.get('x-lang') || 'ko';
  const tenantId = headersList.get('x-tenant-id');

  return (
    <html lang={lang} className={inter.className}>
      <body className="antialiased">
        <TenantStyleGateway tenantId={tenantId} />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
