'use client';

import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { LoginForm } from './components/LoginForm';
import { LoginHeader } from './components/LoginHeader';

export default function LoginPage() {
  const { config } = useAppConfig();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <LoginHeader title={`${config.name} 로그인`} />
        <LoginForm />
        <div className="mt-6 text-center text-sm text-gray-400">
          Standard Login Implementation
        </div>
      </div>
    </div>
  );
}

