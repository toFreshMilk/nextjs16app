// src/core/services/apiClient.ts
export async function apiGet<T>(path: string, tenantId: string): Promise<T> {
  // public/mock-data/contracts/demo.json 이런 식으로 파일이 있어야 함
  const jsonPath = `${process.env.NEXT_PUBLIC_API_URL}/mock-data/${path}/${tenantId}.json`;

  const res = await fetch(jsonPath);
  if (!res.ok) throw new Error(`JSON Load Failed: ${jsonPath}`);

  return res.json();
}
