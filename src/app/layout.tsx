import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppConfigProvider } from "@/providers/AppConfigContext";
import { getTenantConfig } from "@/config/tenant.config"; // 메타데이터용 (선택사항)

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// 동적 메타데이터: 실제 SaaS에서는 여기서도 headers를 읽어 타이틀을 바꿀 수 있습니다.
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "LawTle Biz - Enterprise",
        description: "Enterprise Legal Management System",
        icons: {
            icon: "/favicon.ico",
        },
    };
}

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    // [서버 사이드] 미들웨어(middleware.ts)가 분석해서 넣어준 헤더 값 읽기
    const headersList = await headers();
    const detectedId = headersList.get("x-tenant-id") || "default";

    return (
        <html lang="ko">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* 클라이언트 컴포넌트인 Provider에게 감지된 ID 전달 */}
        <AppConfigProvider detectedTenantId={detectedId}>
            {children}
        </AppConfigProvider>
        </body>
        </html>
    );
}
