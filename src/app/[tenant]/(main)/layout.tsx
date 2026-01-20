// src/app/[tenant]/(main)/layout.tsx
import { ReactNode } from 'react';
import { getTenantComponent } from '@/core/config/tenant.config';

export default async function MainLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;

  // [핵심] Navbar도 테넌트별로 갈아끼움!
  // Demo면 DemoTopNavbar가 오고, 일반이면 Standard TopNavbar가 옴
  const Navbar = await getTenantComponent(tenant, 'TopNavbar');
  const WorkspaceBanner = await getTenantComponent(tenant, 'WorkspaceBanner');

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50">
        <WorkspaceBanner />
        <Navbar />
      </div>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">{children}</main>
    </div>
  );
}
