// src/tenants/apr/login/components/AprSsoButton.tsx
'use client';

export default function AprSsoButton() {
  const handleSsoLogin = () => {
    alert('APR 그룹웨어 SSO 연동 페이지로 이동합니다.');
    window.location.href = '/apr/dashboard';
  };

  return (
    <button 
      onClick={handleSsoLogin}
      className="w-full py-3 bg-slate-800 text-white font-bold rounded hover:bg-slate-900 transition flex items-center justify-center gap-2"
    >
      <span>🔐</span> APR 임직원 SSO 로그인
    </button>
  );
}

