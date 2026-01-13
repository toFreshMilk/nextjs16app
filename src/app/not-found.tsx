'use client'; // [수정] 이 한 줄이 반드시 필요합니다!

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
            <div className="space-y-6 max-w-lg">
                {/* 로고 영역 */}
                <h1 className="text-3xl font-bold text-slate-900">
                    Buptle<span className="text-blue-600">Biz</span>
                </h1>

                <div className="py-8">
                    <h2 className="text-8xl font-black text-gray-200 mb-4">404</h2>
                    <h3 className="text-2xl font-bold text-slate-800">
                        페이지를 찾을 수 없습니다
                    </h3>
                    <p className="text-gray-500 mt-2">
                        요청하신 주소가 정확한지 확인해 주세요.<br />
                        존재하지 않는 고객사(Tenant)이거나 삭제된 페이지입니다.
                    </p>
                </div>

                <div className="flex gap-3 justify-center">
                    {/* 이제 클라이언트 컴포넌트이므로 onClick 사용 가능 */}
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-2.5 border border-gray-300 rounded-lg text-slate-700 hover:bg-gray-50 font-medium transition"
                    >
                        이전 페이지
                    </button>

                    <Link
                        href="/demo/dashboard"
                        className="px-6 py-2.5 bg-blue-600 rounded-lg text-white hover:bg-blue-700 font-medium transition"
                    >
                        데모 체험하기
                    </Link>
                </div>
            </div>

            <div className="mt-12 text-xs text-gray-400">
                &copy; Buptle Inc. All rights reserved.
            </div>
        </div>
    );
}
