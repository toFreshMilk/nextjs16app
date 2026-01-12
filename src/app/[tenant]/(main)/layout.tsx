import React from 'react';
import TopNavbar from '@/standard/widgets/TopNavbar';

type Props = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
    return (
        <>
            <TopNavbar />
            <main className="flex-1 w-full max-w-[1920px] mx-auto p-4 md:p-8">
                {children}
            </main>
        </>
    );
}
