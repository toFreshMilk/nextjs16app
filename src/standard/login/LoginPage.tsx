'use client';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { Button } from '@/uikit/form/Button';

export default function LoginPage() {
  const { config } = useAppConfig();
  
  const handleLogin = () => {
    // 실제로는 getTenantService를 Client Component에서 쓰려면 별도 처리가 필요하지만, 
    // 여기서는 간단히 페이지 이동만 구현
    window.location.href = `/${config.id}/dashboard`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-96 bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-6">Standard Login</h1>
        <p className="mb-4 text-gray-500">{config.name}</p>
        <Button onClick={handleLogin} style={{ backgroundColor: config.theme.primaryColor }} fullWidth>
          로그인
        </Button>
      </div>
    </div>
  );
}

