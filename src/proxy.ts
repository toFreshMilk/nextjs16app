// src/proxy.ts
import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import {
  loadTenantConfig,
  SUPPORTED_LANGS,
  DEFAULT_LANG,
  isSupportedLang,
  isTenantId,
  type TenantId,
} from '@/core/config/tenant.config';

const VALID_ROOT_DOMAINS = ['buptle.com', 'buptlestg.com', 'localhost.com', 'localhost'];

// ✅ locale 단일 소스화
const LOCALES = SUPPORTED_LANGS;
const DEFAULT_LOCALE = DEFAULT_LANG;

const LANG_COOKIE = 'lang'; // 원하는 이름으로 변경 가능

// ✅ referer locale 추출도 단일 소스화 (ko|en 하드코딩 제거)
const REF_LOCALE_RE = new RegExp(`/(${LOCALES.join('|')})(/|$)`);

function detectTenant(hostname: string): TenantId | null {
  const host = hostname.split(':')[0];
  const rootDomain = VALID_ROOT_DOMAINS.find((d) => host.endsWith(d));
  if (!rootDomain) return null;

  const subdomain = host.slice(0, host.length - rootDomain.length);
  const sanitized = subdomain.endsWith('.') ? subdomain.slice(0, -1) : subdomain;

  // ✅ 테넌트 목록은 core/config/tenant.config.ts(TENANT_LOADERS)만이 "단일 소스"
  if (!sanitized || sanitized === 'www' || !isTenantId(sanitized)) return null;
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
  if (cookieLang && isSupportedLang(cookieLang)) return cookieLang;

  // 2) (선택) referer에 /en/ 또는 /ko/가 있으면 그걸 우선
  const ref = req.headers.get('referer') ?? '';
  const m = ref.match(REF_LOCALE_RE);
  if (m?.[1] && isSupportedLang(m[1])) return m[1];

  // 3) 없으면 Accept-Language
  return getLocaleFromAcceptLanguage(req);
}

function forceLocaleToDefault(pathname: string) {
  const parts = pathname.split('/');
  // ['', 'en', ...]
  if (parts.length >= 2 && isSupportedLang(parts[1])) {
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

  // ✅ Tenant/언어 정책 판단의 단일 소스: proxy.ts
  // - 테넌트 설정 로드는 여기서만 책임지고, 다른 레이어에서는 에러 처리를 하지 않는다.
  let tenantConfig;
  try {
    tenantConfig = await loadTenantConfig(tenant);
  } catch (e) {
    console.error(`[Proxy Error] Tenant config load failed: ${tenant}`, e);
    const errorUrl = req.nextUrl.clone();
    errorUrl.pathname = '/not-found';
    return NextResponse.rewrite(errorUrl);
  }

  const i18nEnabled = tenantConfig.features?.i18n !== false;
  const aiEnabled = tenantConfig.features?.ai !== false;
  const ssoEnabled = tenantConfig.features?.sso !== false;

  const pathname = url.pathname;

  // 현재 URL이 /ko/... or /en/... 인지 확인
  const urlLang = pathname.split('/')[1] ?? '';
  const hasLocalePrefix = isSupportedLang(urlLang);

  // 2) locale 없는 경우 -> 쿠키(or ref/accept-language)로 리다이렉트
  const pathnameIsMissingLocale = LOCALES.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // ✅ i18nEnabled=false인 테넌트는 /en/... 같은 접근을 /ko/...로 강제
  if (!i18nEnabled && hasLocalePrefix && urlLang !== DEFAULT_LOCALE) {
    const redirectedPath = forceLocaleToDefault(pathname);
    const newUrl = new URL(`${redirectedPath}${url.search}`, req.url);
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

  if (pathnameIsMissingLocale) {
    // ✅ i18n off인 경우: locale 협상/추론 자체를 하지 않고 기본 언어만 사용 (리소스/연산 최소화)
    const locale = i18nEnabled ? getPreferredLocale(req) : DEFAULT_LOCALE;
    const newUrl = new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, req.url);

    const res = NextResponse.redirect(newUrl);

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
  // ✅ feature 플래그는 request header로만 전달(서브도메인간 침범 방지, 서버컴포넌트에서 동적 로딩 최소화)
  requestHeaders.set('x-i18n-enabled', i18nEnabled ? '1' : '0');
  requestHeaders.set('x-ai-enabled', aiEnabled ? '1' : '0');
  requestHeaders.set('x-sso-enabled', ssoEnabled ? '1' : '0');
  requestHeaders.set('x-tenant-name', tenantConfig.name);
  requestHeaders.set('x-theme-primary-color', tenantConfig.theme?.primaryColor ?? '');

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
