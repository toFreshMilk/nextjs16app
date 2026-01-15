// src/tenants/demo/shared/components/TopNavbar.tsx
'use client';
import { TopNavbar as StandardNavbar } from '@/standard/shared/components/TopNavbar';

export default function DemoTopNavbar() {
  return (
    <div className="relative">
      {/* 1. 데모용 경고 배너 추가 */}
      <div className="bg-purple-600 text-white text-xs text-center py-1 font-bold">
        🧪 현재 체험판 모드입니다. 입력하신 데이터는 저장되지 않습니다.
      </div>
      
      {/* 2. 기존 Standard Navbar 재사용 (또는 커스텀 구현) */}
      <div className="opacity-90">
        <StandardNavbar />
      </div>
    </div>
  );
}
