'use client';

import AprSsoButton from './components/AprSsoButton';

export default function AprLoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* 좌측 브랜딩 영역 */}
      <div className="w-1/2 bg-rose-600 flex flex-col items-center justify-center text-white p-10">
        <h1 className="text-6xl font-black mb-4">APR</h1>
        <p className="text-xl opacity-80">Global Beauty Tech Enterprise</p>
      </div>
      
      {/* 우측 로그인 영역 */}
      <div className="w-1/2 bg-white flex items-center justify-center p-10">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">임직원 로그인</h2>
          <p className="text-gray-500 mb-8">사내 포털 계정으로 접속하세요.</p>
          
          <AprSsoButton />
          
          <div className="mt-8 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
            보안 이슈 발생 시 IT 지원팀(02-1234-5678)으로 문의바랍니다.
          </div>
        </div>
      </div>
    </div>
  );
}

