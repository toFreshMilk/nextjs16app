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
  const WorkspaceBanner = await getTenantComponent(tenant, 'WorkspaceBanner');
  const TopNavbar = await getTenantComponent(tenant, 'TopNavbar');

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 shadow-sm bg-white/80 backdrop-blur-md">
        <WorkspaceBanner />
        <TopNavbar />
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        {children}
      </main>
      
      {/* Simple Footer */}
      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-200 mt-auto">
        &copy; 2026 Buptle Inc. All rights reserved.
      </footer>
    </div>
  );
}

