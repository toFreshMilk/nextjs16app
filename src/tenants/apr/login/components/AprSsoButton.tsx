'use client';

export default function AprSsoButton() {
  return (
    <button 
      onClick={() => window.location.href = '/apr/dashboard'}
      className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg flex items-center justify-center gap-3 hover:bg-slate-800 transition"
    >
      <span>🔐</span> APR 그룹웨어로 로그인
    </button>
  );
}

