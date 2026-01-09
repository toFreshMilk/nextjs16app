'use client';

import { useAppConfig } from "@/core/contexts/AppConfigContext";
import { authService } from "@/services/auth/auth.service";
import { useRouter } from "next/navigation";
import Logo from "@/uikit/branding/Logo";
import { useEffect, useState } from "react";

export default function LoginPage() {
    // 초기 렌더링 시 config가 없을 수 있으므로 안전하게 처리
    const config = useAppConfig();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        // 로그인 시뮬레이션
        const success = await authService.login('admin@test.com');
        if (success) {
            router.push('/dashboard');
        } else {
            setLoading(false);
        }
    };

    return (
        <main className="flex h-screen items-center justify-center bg-slate-50">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg text-center border border-slate-100">
                <div className="flex justify-center mb-6">
                    <Logo tenantName={config?.name || 'Loading...'} />
                </div>
                <h1 className="text-2xl font-bold text-slate-800 mb-2">환영합니다</h1>
                <p className="text-slate-500 mb-8">서비스 이용을 위해 로그인해주세요.</p>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full py-3.5 text-white rounded-lg font-bold shadow transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: config?.theme?.primaryColor || '#2563eb' }}
                >
                    {loading ? '로그인 중...' : '로그인'}
                </button>
            </div>
        </main>
    );
}
