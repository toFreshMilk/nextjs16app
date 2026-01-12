'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { globalStore } from '@/core/store/global.store';

export default function IicLoginPage() {
    const { tenant } = useAppConfig();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const userName = email.split('@')[0] || 'IIC User';
        globalStore.login(email, userName);

        setIsLoading(false);
        router.push(`/${tenant.key}/dashboard`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* IIC 브랜드 배경 */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="w-full max-w-lg relative z-10">
                {/* IIC 로고 영역 */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-2xl mb-4 animate-bounce">
                        <span className="text-4xl">🚀</span>
                    </div>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-2">
                        {tenant.displayName}
                    </h1>
                    <p className="text-brand-muted">Innovation & Integration Center</p>
                </div>

                <div className="bg-brand-surface/80 backdrop-blur-xl rounded-3xl border-2 border-orange-500/30 shadow-2xl p-10 fade-in">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-brand-text mb-3 uppercase tracking-wider">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-5 py-4 rounded-xl bg-brand-bg/50 border-2 border-orange-500/20 text-brand-text text-lg focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all"
                                placeholder="user@iic.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-brand-text mb-3 uppercase tracking-wider">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-4 rounded-xl bg-brand-bg/50 border-2 border-orange-500/20 text-brand-text text-lg focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-transform"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⚡</span>
                  Authenticating...
                </span>
                            ) : (
                                '🚀 Launch IIC Portal'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-orange-500/20 text-center">
                        <p className="text-xs text-brand-muted flex items-center justify-center gap-2">
                            <span>🔐</span>
                            Powered by IIC Security Framework
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
