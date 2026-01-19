// src/core/services/apiClient.ts
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

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getBackendBaseUrl() {
  // 실제 백엔드가 준비되면 이 값만 세팅해서 real fetch로 전환
  // - 예: NEXT_PUBLIC_API_URL=https://api.example.com
  return process.env.NEXT_PUBLIC_API_URL;
}

async function mockGet<T>(path: string): Promise<T> {
  // 요구사항: 외부 URL 호출 없이 내부 JSON로 응답하되, 호출한 것처럼 랜덤 지연 부여
  await sleep(randomInt(120, 900));

  // mock-data에는 JSON만 존재
  const standard = (await import('@/mock-data/contracts/standard.json')).default;
  const demo = (await import('@/mock-data/contracts/demo.json')).default;
  const apr = (await import('@/mock-data/contracts/apr.json')).default;

  // 현재 mock에서는 "테넌트는 백엔드에서 판단" 전제로 통일된 데이터 반환
  // 필요해지면 여기에서 path 또는 다른 기준으로 분기 가능
  if (path.startsWith('/contracts')) {
    return standard as T;
  }
  if (path.startsWith('/api/contracts')) {
    // 과거 경로 호환: app/api 제거 이후에도 기존 호출이 남아있을 수 있어 대응
    return standard as T;
  }

  throw new Error(`MOCK apiGet: unsupported path: ${path}`);
}

export async function apiGet<T>(path: string, params?: Record<string, QueryValue>): Promise<T> {
  void params; // tenant 등은 URL에 싣지 않음(백엔드가 req로 판단)

  const baseUrl = getBackendBaseUrl();
  if (!baseUrl) {
    return await mockGet<T>(path);
  }

  const res = await fetch(`${baseUrl}${path}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API GET ${path} failed: ${res.status} ${res.statusText}${text ? ` - ${text}` : ''}`);
  }
  return (await res.json()) as T;
}

export async function apiPost<T>(path: string, body: any): Promise<T> {
  const baseUrl = getBackendBaseUrl();
  if (!baseUrl) {
    // mock 모드에서는 POST는 아직 비활성(추후 BFF/백엔드 연동 시 확장)
    await sleep(randomInt(120, 900));
    return ({ ok: true } as unknown) as T;
  }

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
