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
  const res = await fetch(`${path}${buildQuery(params)}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API GET ${path} failed: ${res.status} ${res.statusText}${text ? ` - ${text}` : ''}`);
  }
  return (await res.json()) as T;
}

