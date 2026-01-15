// src/standard/login/LoginPage.tsx
'use client';
import Link from 'next/link';
import { ComponentType, useEffect, useState } from 'react';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { useTenant } from '@/core/hooks/useTenant';
import { getTenantComponent } from '@/core/config/tenant.config';
import { Button } from '@/uikit/form/Button';
import { Input } from '@/uikit/form/Input';

export default function LoginPage() {
  const { config } = useAppConfig();
  const { tenantId } = useTenant();
  const [email, setEmail] = useState('common@buptle.com');
  const [password, setPassword] = useState('password');
  const [BannerComp, setBannerComp] = useState<ComponentType<any> | null>(null);
  const [SsoComp, setSsoComp] = useState<ComponentType<any> | null>(null);
  
  const handleLogin = () => {
    // 데모: 페이지 이동만 처리
    window.location.href = `/${config.id}/dashboard`;
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const Banner = await getTenantComponent(tenantId, 'WorkspaceBanner');
      if (!cancelled) setBannerComp(() => Banner);

      if (config.features.sso) {
        const Comp = await getTenantComponent(tenantId, 'LoginSsoButton');
        if (!cancelled) setSsoComp(() => Comp);
      } else if (!cancelled) {
        setSsoComp(null);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [tenantId, config.features.sso]);

  return (
    <div className="min-h-[calc(100vh-0px)] bg-slate-100">
      {BannerComp ? <BannerComp /> : null}
      <div className="flex items-center justify-center px-4 py-10">
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

          {config.features.sso && (SsoComp ? <SsoComp /> : null)}
        </div>
      </div>
    </div>
    </div>
  );
}

