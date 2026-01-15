// src/standard/login/components/LoginSsoButton.tsx
'use client';

export default function LoginSsoButton() {
  return (
    <button
      className="w-full py-3 rounded-lg border border-slate-200 font-bold text-slate-800 hover:bg-slate-50 transition"
      onClick={() => alert('SSO/외부 사용자 로그인 (Standard)')}
    >
      협력사/법무법인/외부변호사이신가요?
    </button>
  );
}

