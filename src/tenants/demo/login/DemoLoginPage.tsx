'use client';

import { Button } from '@/uikit/form/Button';

export default function DemoLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-sm text-center text-white">
        <h1 className="text-3xl font-bold mb-2">Buptle Demo</h1>
        <p className="mb-8 opacity-90">체험판 환경에 오신 것을 환영합니다.</p>
        
        <div className="bg-white/20 p-4 rounded-lg mb-6 text-sm text-left">
          <p>🧪 <strong>Test Account:</strong></p>
          <p>ID: admin / PW: admin</p>
        </div>

        <Button 
          fullWidth 
          className="bg-white text-violet-600 hover:bg-gray-100"
          onClick={() => window.location.href = '/demo/dashboard'}
        >
          체험 시작하기 🚀
        </Button>
      </div>
    </div>
  );
}

