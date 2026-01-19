// src/core/services/apiClient.ts
function getTenant() {
  if (typeof window === 'undefined') return 'demo';
  const host = window.location.hostname;
  return host === 'localhost' ? 'demo' : host.split('.')[0];
}

export async function apiGet<T>(path: string): Promise<T> {

  // public/mock-data/contracts/demo.json 이런 식으로 파일이 있어야 함
  const tenant = getTenant();
  const jsonPath = `${process.env.NEXT_PUBLIC_API_URL}/mock-data/${path}/${tenant}.json`;

  const res = await fetch(jsonPath);
  if (!res.ok) throw new Error(`JSON Load Failed: ${jsonPath}`);

  return res.json();
}
