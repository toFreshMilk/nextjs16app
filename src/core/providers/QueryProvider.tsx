// src/core/providers/QueryProvider.tsx
'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // [중요] useState를 사용하여 queryClient가 컴포넌트 생명주기 동안 한 번만 생성되도록 보장합니다.
  // 단순히 const queryClient = new QueryClient()로 쓰면 리렌더링 될 때마다 초기화되어 캐시가 날아갑니다.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // SSR 환경에서는 클라이언트에서 즉시 재요청하는 것을 방지하기 위해
            // staleTime을 0보다 크게 잡는 것이 좋습니다. (예: 1분)
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
