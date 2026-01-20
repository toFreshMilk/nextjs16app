// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { Metadata } from 'next'; // [1] Metadata 타입 import 필수

const inter = Inter({ subsets: ['latin'] });

// [2] export const metadata에 Metadata 타입 명시
export const metadata: Metadata = {
  title: {
    template: '%s | Buptle Biz', // [3] 하위 페이지에서 타이틀을 조합할 수 있도록 템플릿 설정 권장
    default: 'Buptle Biz', // 기본 타이틀
  },
  description: 'Enterprise Legal Solution',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={inter.className}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
