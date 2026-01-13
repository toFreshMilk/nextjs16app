import { ReactNode } from 'react';
import { TopNavbar } from '@/standard/shared/components/TopNavbar';

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <TopNavbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
