import { ReactNode } from 'react';
import { TopNavbar } from '@/standard/shared/components/TopNavbar';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 shadow-sm bg-white/80 backdrop-blur-md">
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

