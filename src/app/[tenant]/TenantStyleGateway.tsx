// src/app/[tenant]/TenantStyleGateway.tsx
'use client';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// [설정] 테넌트 ID와 로더를 매핑하는 '레지스트리' 객체입니다.
// 새로운 테넌트가 추가되면 이곳에 한 줄만 추가하면 됩니다.
const LOADERS: Record<string, ComponentType> = {
  apr: dynamic(() => import('@/tenants/apr/shared/APRStyleLoader'), { ssr: true }),
  demo: dynamic(() => import('@/tenants/demo/shared/DemoStyleLoader'), { ssr: true }),
};

export default function TenantStyleGateway({ tenant }: { tenant: string }) {
  // [로직] O(1) 속도로 즉시 컴포넌트를 찾습니다. if/else 분기보다 빠르고 깔끔합니다.
  const Loader = LOADERS[tenant];

  // 등록되지 않은 테넌트라면 아무것도 로드하지 않습니다.
  if (!Loader) {
    return null;
  }

  return <Loader />;
}
