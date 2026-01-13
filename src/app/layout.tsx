import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
    title: 'Buptle Biz',
    description: 'Enterprise Legal Management Solution',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ko">
            <body>{children}</body>
        </html>
    );
}
