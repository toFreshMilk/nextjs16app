'use client';
import { Button } from '@/uikit/form/Button';

export default function DemoLoginPage() {
  return (
    <div className="min-h-screen bg-purple-600 flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-4xl font-black mb-4">DEMO WORKSPACE</h1>
        <p className="mb-8 opacity-80">체험판 환경입니다.</p>
        <Button onClick={() => window.location.href='/demo/dashboard'} className="bg-white text-purple-600 hover:bg-gray-100">
          체험 시작
        </Button>
      </div>
    </div>
  );
}

