// src/proxy.ts
import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const VALID_TENANTS = new Set(['demo', 'apr']);
const VALID_ROOT_DOMAINS = ['buptle.com', 'buptlestg.com', 'localhost.com', 'localhost'];
const LOCALES = ['ko', 'en'];
const DEFAULT_LOCALE = 'ko';

function detectTenant(hostname: string): string | null {
  const host = hostname.split(':')[0];
  const rootDomain = VALID_ROOT_DOMAINS.find((d) => host.endsWith(d));
  if (!rootDomain) return null;

  const subdomain = host.slice(0, host.length - rootDomain.length);
  const sanitized = subdomain.endsWith('.') ? subdomain.slice(0, -1) : subdomain;

  if (!sanitized || sanitized === 'www' || !VALID_TENANTS.has(sanitized)) {
    return null;
  }
  return sanitized;
}

function getLocale(request: NextRequest) {
  const headers = { 'accept-language': request.headers.get('accept-language') || '' };
  const languages = new Negotiator({ headers }).languages();
  try {
    return match(languages, LOCALES, DEFAULT_LOCALE);
  } catch (e) {
    return DEFAULT_LOCALE;
  }
}

// [변경] 함수명을 proxy로 변경
export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // [Pass] 정적 파일, API, Next.js 내부 경로 통과
  if (
    url.pathname.includes('.') ||
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // 1. 테넌트 식별
  const tenant = detectTenant(hostname);
  if (!tenant) {
    const errorUrl = req.nextUrl.clone();
    errorUrl.pathname = '/not-found';
    return NextResponse.rewrite(errorUrl);
  }

  // 2. 언어 처리 (/ko, /en)
  const pathname = url.pathname;
  const pathnameIsMissingLocale = LOCALES.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(req);
    // 예: /contract -> /ko/contract
    const newUrl = new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, req.url);
    return NextResponse.redirect(newUrl);
  }

  // 3. 최종 Rewrite (헤더에 테넌트 심기)
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-tenant-id', tenant);

  const urlLang = pathname.split('/')[1];
  const lang = LOCALES.includes(urlLang) ? urlLang : DEFAULT_LOCALE;
  requestHeaders.set('x-lang', lang);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// [주의] config 설정은 유지될 수도 있고, proxy에서는 제거될 수도 있으나
// 현재 과도기 버전에서는 matcher가 여전히 유효할 수 있습니다.
// 만약 config export 에러가 나면 이 부분은 제거해야 합니다.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
