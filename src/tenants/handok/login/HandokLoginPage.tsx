'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { globalStore } from '@/core/store/global.store';

export default function HandokLoginPage() {
    const { tenant } = useAppConfig();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));

        const userName = email.split('@')[0] || 'APR User';
        globalStore.login(email, userName);

        setIsLoading(false);
        router.push(`/${tenant.key}/dashboard`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* APR 브랜드 배경 패턴 */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-96 h-96 bg-brand-primary rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-primary rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-brand-surface rounded-2xl border-2 border-brand-primary/30 shadow-2xl p-8 fade-in">
                    <div className="mb-8 text-center">
                        <div className="inline-block px-4 py-2 rounded-full bg-brand-primary/20 border border-brand-primary mb-4">
                            <span className="text-brand-primary font-bold text-sm">APR EXCLUSIVE</span>
                        </div>
                        <h1 className="text-3xl font-bold text-brand-primary mb-2">
                            {tenant.displayName}
                        </h1>
                        <p className="text-sm text-brand-muted">
                            APR 전용 로그인 시스템
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-brand-text mb-2">
                                이메일
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-brand-bg border-2 border-brand-primary/30 text-brand-text focus:border-brand-primary focus:outline-none transition"
                                placeholder="user@apr.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-brand-text mb-2">
                                비밀번호
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-brand-bg border-2 border-brand-primary/30 text-brand-text focus:border-brand-primary focus:outline-none transition"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-primary/30"
                        >
                            {isLoading ? '인증 중...' : 'APR 로그인'}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-white/10 text-center">
                        <p className="text-xs text-brand-muted">
                            🔒 APR 보안 시스템으로 보호됩니다
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
