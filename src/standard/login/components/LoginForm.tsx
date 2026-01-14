'use client';

import { useState } from 'react';
import { Button } from '@/uikit/form/Button';
import { Input } from '@/uikit/form/Input';
import { useAppConfig } from '@/core/contexts/AppConfigContext';

export function LoginForm() {
  const { config } = useAppConfig();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = `/${config.id}/dashboard`;
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input label="이메일" placeholder="user@company.com" required />
      <Input label="비밀번호" type="password" required />
      <Button 
        type="submit" 
        fullWidth 
        disabled={loading}
        style={{ backgroundColor: config.theme.primaryColor }}
      >
        {loading ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  );
}

