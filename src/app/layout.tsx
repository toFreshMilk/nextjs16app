import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Buptle Biz - Enterprise Legal Solution',
  description: '법무 관리의 새로운 기준, 법틀비즈',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}

