'use client';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { Button } from '@/uikit/form/Button';
import { Input } from '@/uikit/form/Input';

export default function LoginPage({ sso }: { sso?: ReactNode }) {
  const { config } = useAppConfig();
  const [email, setEmail] = useState('common@buptle.com');
  const [password, setPassword] = useState('password');
  
  const handleLogin = () => {
    // 데모: 페이지 이동만 처리
    window.location.href = `/${config.id}/dashboard`;
  };

  return (
    <div className="min-h-[calc(100vh-0px)] flex items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-slate-200 p-10">
        <div className="text-center">
          <div className="text-xs tracking-[0.25em] font-black text-slate-700">GENTLE MONSTER</div>
          <div className="mt-6 text-4xl font-black text-slate-900">{config.name}</div>
        </div>

        <div className="mt-10 space-y-5">
          <Input label="Account" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <div className="flex items-center justify-between text-sm">
            <Link href="#" className="text-blue-600 hover:underline">Sign up</Link>
            <Link href="#" className="text-blue-600 hover:underline">Forgot password?</Link>
          </div>

          <Button
            fullWidth
            onClick={handleLogin}
            style={{ backgroundColor: config.theme.primaryColor }}
            className="py-3 shadow-sm"
          >
            로그인
          </Button>

          {config.features.sso && (sso ?? (
            <button
              className="w-full py-3 rounded-lg border border-slate-200 font-bold text-slate-800 hover:bg-slate-50 transition"
              onClick={() => alert('SSO/외부 사용자 로그인 (데모)')}
            >
              협력사/법무법인/외부변호사이신가요?
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

