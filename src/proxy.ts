// src/proxy.ts
import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { loadTenantConfig } from '@/core/config/tenant.config';

const VALID_TENANTS = new Set(['demo', 'apr']);
const VALID_ROOT_DOMAINS = ['buptle.com', 'buptlestg.com', 'localhost.com', 'localhost'];
const LOCALES = ['ko', 'en'] as const;
const DEFAULT_LOCALE = 'ko';

const LANG_COOKIE = 'lang'; // 원하는 이름으로 변경 가능

function detectTenant(hostname: string): string | null {
  const host = hostname.split(':')[0];
  const rootDomain = VALID_ROOT_DOMAINS.find((d) => host.endsWith(d));
  if (!rootDomain) return null;

  const subdomain = host.slice(0, host.length - rootDomain.length);
  const sanitized = subdomain.endsWith('.') ? subdomain.slice(0, -1) : subdomain;

  if (!sanitized || sanitized === 'www' || !VALID_TENANTS.has(sanitized)) return null;
  return sanitized;
}

function getLocaleFromAcceptLanguage(request: NextRequest) {
  const headers = { 'accept-language': request.headers.get('accept-language') || '' };
  const languages = new Negotiator({ headers }).languages();
  try {
    return match(languages, Array.from(LOCALES), DEFAULT_LOCALE);
  } catch {
    return DEFAULT_LOCALE;
  }
}

function getPreferredLocale(req: NextRequest) {
  // 1) 쿠키 우선
  const cookieLang = req.cookies.get(LANG_COOKIE)?.value;
  if (cookieLang && (LOCALES as readonly string[]).includes(cookieLang)) return cookieLang;

  // 2) (선택) referer에 /en/ 또는 /ko/가 있으면 그걸 우선
  const ref = req.headers.get('referer') ?? '';
  const m = ref.match(/\/(ko|en)(\/|$)/);
  if (m?.[1] && (LOCALES as readonly string[]).includes(m[1])) return m[1];

  // 3) 없으면 Accept-Language
  return getLocaleFromAcceptLanguage(req);
}

function forceLocaleToDefault(pathname: string) {
  const parts = pathname.split('/');
  // ['', 'en', ...]
  if (parts.length >= 2 && (LOCALES as readonly string[]).includes(parts[1])) {
    parts[1] = DEFAULT_LOCALE;
    return parts.join('/');
  }
  return `/${DEFAULT_LOCALE}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
}

export async function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Pass static/API
  if (
    url.pathname.includes('.') ||
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // 1) tenant
  const tenant = detectTenant(hostname);
  if (!tenant) {
    const errorUrl = req.nextUrl.clone();
    errorUrl.pathname = '/not-found';
    return NextResponse.rewrite(errorUrl);
  }

  // ✅ tenant config 기준으로 i18n 운영 여부 판단
  // features.i18n === false => "ko만 관리/운영"
  let i18nEnabled;
  try {
    const tenantConfig = await loadTenantConfig(tenant);
    i18nEnabled = tenantConfig.features?.i18n !== false;
  } catch {
    i18nEnabled = true;
  }

  const pathname = url.pathname;

  // 현재 URL이 /ko/... or /en/... 인지 확인
  const urlLang = pathname.split('/')[1];
  const hasLocalePrefix = (LOCALES as readonly string[]).includes(urlLang);

  // ✅ i18nEnabled=false인 테넌트는 /en/... 같은 접근을 /ko/...로 강제
  if (!i18nEnabled && hasLocalePrefix && urlLang !== DEFAULT_LOCALE) {
    const newUrl = new URL(forceLocaleToDefault(pathname) + url.search, req.url);
    const res = NextResponse.redirect(newUrl);

    res.cookies.set(LANG_COOKIE, DEFAULT_LOCALE, {
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 365, // 1년
    });

    return res;
  }

  // 2) locale 없는 경우 -> 쿠키(or ref/accept-language)로 리다이렉트
  const pathnameIsMissingLocale = LOCALES.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const locale = i18nEnabled ? getPreferredLocale(req) : DEFAULT_LOCALE;
    const newUrl = new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, req.url);

    const res = NextResponse.redirect(newUrl);

    // 쿠키가 비어있던 첫 진입(/contract) 케이스에서도 locale 저장해두면 다음부터 바로 유지됨
    res.cookies.set(LANG_COOKIE, locale, {
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 365, // 1년
    });

    return res;
  }

  // 3) locale이 있는 정상 경로 -> 헤더 심고 + 쿠키 갱신
  const lang = !i18nEnabled ? DEFAULT_LOCALE : hasLocalePrefix ? urlLang : DEFAULT_LOCALE;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-tenant-id', tenant);
  requestHeaders.set('x-lang', lang);

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // 사용자가 /en/... 또는 /ko/... 로 "명시적으로" 바꿨으면 그 선택을 저장
  if (hasLocalePrefix) {
    res.cookies.set(LANG_COOKIE, lang, {
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
