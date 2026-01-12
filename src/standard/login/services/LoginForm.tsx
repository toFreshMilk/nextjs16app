'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { globalStore } from '@/core/store/global.store';

export default function LoginForm() {
    const { tenant } = useAppConfig();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock Login (실제로는 API 호출)
        await new Promise((resolve) => setTimeout(resolve, 800));

        const userName = email.split('@')[0] || '사용자';
        globalStore.login(email, userName);

        setIsLoading(false);
        router.push(`/${tenant.key}/dashboard`);
    };

    return (
        <div className="w-full max-w-md">
            <div className="bg-brand-surface rounded-2xl border border-white/10 shadow-2xl p-8 fade-in">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-brand-primary mb-2">
                        {tenant.displayName}
                    </h1>
                    <p className="text-sm text-brand-muted">
                        법무 관리 시스템에 로그인하세요
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-brand-text mb-2"
                        >
                            이메일
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-brand-bg border border-white/10 text-brand-text placeholder:text-brand-muted focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition"
                            placeholder="user@example.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-brand-text mb-2"
                        >
                            비밀번호
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-brand-bg border border-white/10 text-brand-text placeholder:text-brand-muted focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? '로그인 중...' : '로그인'}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                    <p className="text-xs text-brand-muted">
                        Demo: 아무 이메일/비밀번호나 입력하세요
                    </p>
                </div>
            </div>
        </div>
    );
}
