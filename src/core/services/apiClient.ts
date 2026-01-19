type QueryValue = string | number | boolean | null | undefined;

export function buildQuery(params?: Record<string, QueryValue>) {
  const sp = new URLSearchParams();
  if (!params) return '';
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    sp.set(k, String(v));
  }
  const qs = sp.toString();
  return qs ? `?${qs}` : '';
}

export async function apiGet<T>(path: string, params?: Record<string, QueryValue>): Promise<T> {
  // 실제 환경에서는 API 서버 Base URL을 환경변수로 처리
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}${path}${buildQuery(params)}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    cache: 'no-store', // 데이터 최신화 보장 (SSR)
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API GET ${path} failed: ${res.status} ${res.statusText}${text ? ` - ${text}` : ''}`);
  }
  return (await res.json()) as T;
}

export async function apiPost<T>(path: string, body: any): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API POST ${path} failed: ${res.status} ${res.statusText}${text ? ` - ${text}` : ''}`);
  }
  return (await res.json()) as T;
}
