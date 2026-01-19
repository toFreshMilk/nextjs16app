// src/core/services/apiClient.ts
export async function apiGet<T>(path: string, tenantId: string): Promise<T> {
  // 1. 서버(SSR)인가? -> http://localhost:3000 붙여서 절대경로 (CORS 상관없음)
  if (typeof window === 'undefined') {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/mock-data/${path.replace(/^\/+/, '')}/${tenantId}.json`);
    return res.json();
  }

  // 2. 브라우저(Client)인가? -> 도메인 떼고 상대경로 (CORS 원천 차단)
  // http://apr.localhost:3000/mock-data/... 로 요청하게 됨 -> Same Origin -> 성공
  const res = await fetch(`/mock-data/${path.replace(/^\/+/, '')}/${tenantId}.json`);
  return res.json();
}