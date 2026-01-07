import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getTenantConfig } from "@/config/tenant.config"; // 경로 확인 필요

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// 동적 메타데이터 생성 (고객사명 반영)
export async function generateMetadata(): Promise<Metadata> {
    const config = getTenantConfig();
    return {
        title: `${config.name} - Main`,
        description: "Enterprise Legal Management System",
    };
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const config = getTenantConfig();

    return (
        <html lang="ko">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            // 테마 색상을 CSS 변수로 주입하여 Tailwind 설정에서 사용 가능하게 함
            style={{ '--primary-color': config.theme.primaryColor } as React.CSSProperties}
        >
        {children}
        </body>
        </html>
    );
}
