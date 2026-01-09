import React, { ReactNode } from 'react';
import TopNavbar from './TopNavbar';
import PageContainer from '@/uikit/layout/PageContainer';

export default function StandardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50">
            <TopNavbar />
            <main>
                <PageContainer>
                    {children}
                </PageContainer>
            </main>
        </div>
    );
}
