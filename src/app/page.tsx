import { getTenantConfig } from "@/config/tenant.config";
import Link from "next/link";

export default function Home() {
    const config = getTenantConfig();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100">

                {/* 로고 영역 */}
                <div className="text-center mb-8">
                    <div className={`text-4xl font-extrabold mb-2 ${config.theme.primaryColor}`}>
                        Buptle<span className="text-black">Biz</span>
                    </div>
                    <p className="text-gray-500 text-sm">
                        {config.name} Enterprise Login
                    </p>
                </div>

                {/* 로그인 폼 (목업) */}
                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            이메일
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="admin@buptle.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            비밀번호
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="button" // 실제론 submit
                        className={`w-full py-3 px-4 text-white font-bold rounded-lg shadow transition hover:opacity-90 ${
                            // Tailwind 클래스로 색상 지정이 어려운 경우 style 사용
                            config.id === 'sk' ? 'bg-red-700' : 'bg-blue-600'
                        }`}
                    >
                        로그인
                    </button>
                </form>

                {/* 개발용 네비게이션 (검증용) */}
                <div className="mt-8 pt-6 border-t text-center">
                    <p className="text-xs text-gray-400 mb-2">DEV MODE SHORTCUTS</p>
                    <Link
                        href="/dashboard"
                        className="text-sm text-blue-500 hover:underline font-medium"
                    >
                        대시보드로 바로가기 →
                    </Link>
                </div>
            </div>

            <div className="mt-8 text-center text-xs text-gray-400">
                © 2026 Buptle Corp. All rights reserved.<br/>
                Tenant ID: <span className="font-mono text-gray-600">{config.id}</span>
            </div>
        </main>
    );
}
