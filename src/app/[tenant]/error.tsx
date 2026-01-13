'use client';

import { useEffect } from 'react';
import { Button } from '@/uikit/form/Button'; // UI Kit 재사용

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function TenantError({ error, reset }: ErrorProps) {
    useEffect(() => {
        // 에러 로깅 서비스(Sentry 등)로 전송 가능
        console.error('Tenant Runtime Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-red-100 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">⚠️</span>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    오류가 발생했습니다
                </h2>

                <p className="text-gray-500 mb-8 break-keep">
                    서비스 이용에 불편을 드려 죄송합니다.<br />
                    잠시 후 다시 시도해주세요.
                </p>

                <div className="space-y-3">
                    <Button onClick={() => reset()} fullWidth className="bg-red-600 hover:bg-red-700">
                        다시 시도하기
                    </Button>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="text-sm text-gray-400 hover:text-gray-600 underline"
                    >
                        메인으로 돌아가기
                    </button>
                </div>

                {/* 개발 모드에서만 상세 에러 노출 */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 p-4 bg-gray-100 rounded text-left overflow-auto text-xs font-mono text-red-600 max-h-40">
                        {error.message}
                    </div>
                )}
            </div>
        </div>
    );
}
