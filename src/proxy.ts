// src/proxy.ts
import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import {
  DEFAULT_LANG,
  SUPPORTED_LANGS,
  isSupportedLang,
  isTenantId,
  loadTenantConfig,
} from '@/core/config/tenant.config';

const VALID_ROOT_DOMAINS = ['buptle.com', 'buptlestg.com', 'localhost.com', 'localhost'] as const;

const LANG_COOKIE = 'lang'; // 원하는 이름으로 변경 가능

function findRootDomain(host: string) {
  return VALID_ROOT_DOMAINS.find((d) => host === d || host.endsWith(`.${d}`)) ?? null;
}

function detectTenant(hostname: string): string | null {
  const host = hostname.split(':')[0];

  const rootDomain = findRootDomain(host);
  if (!rootDomain) return null;

  // rootDomain 자체면 subdomain(tenant)이 없다.
  if (host === rootDomain) return null;

  // demo.buptle.com -> subdomain = "demo"
  const suffix = `.${rootDomain}`;
  if (!host.endsWith(suffix)) return null;

  const subdomain = host.slice(0, host.length - suffix.length);

  // "www" 제외 + tenant id 유효성 체크
  if (!subdomain || subdomain === 'www' || !isTenantId(subdomain)) return null;
  return subdomain;
}

function getLocaleFromAcceptLanguage(request: NextRequest) {
  const headers = { 'accept-language': request.headers.get('accept-language') || '' };
  const languages = new Negotiator({ headers }).languages();
  try {
    return match(languages, Array.from(SUPPORTED_LANGS), DEFAULT_LANG);
  } catch {
    return DEFAULT_LANG;
  }
}

function getPreferredLocale(req: NextRequest) {
  // 1) 쿠키 우선
  const cookieLang = req.cookies.get(LANG_COOKIE)?.value;
  if (cookieLang && isSupportedLang(cookieLang)) return cookieLang;

  // 2) (선택) referer에 /en/ 또는 /ko/가 있으면 그걸 우선
  const ref = req.headers.get('referer') ?? '';
  const refLangRegex = new RegExp(`\\/(${SUPPORTED_LANGS.join('|')})(\\/|$)`);
  const m = ref.match(refLangRegex);
  if (m?.[1] && isSupportedLang(m[1])) return m[1];

  // 3) 없으면 Accept-Language
  return getLocaleFromAcceptLanguage(req);
}

function forceLocaleToDefault(pathname: string) {
  const parts = pathname.split('/');
  // ['', 'en', ...]
  if (parts.length >= 2 && parts[1] && isSupportedLang(parts[1])) {
    parts[1] = DEFAULT_LANG;
    return parts.join('/');
  }
  return `/${DEFAULT_LANG}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
}

function isStaticLikePath(pathname: string) {
  // "파일 확장자" 형태만 정적 자산으로 간주 (예: /a/b.png)
  return /\.[^/]+$/.test(pathname);
}

export async function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Pass static/API
  if (
    isStaticLikePath(url.pathname) ||
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
  let i18nEnabled: boolean;
  try {
    const tenantConfig = await loadTenantConfig(tenant);
    i18nEnabled = tenantConfig.features?.i18n !== false;
  } catch {
    i18nEnabled = true;
  }

  const pathname = url.pathname;

  // 현재 URL이 /ko/... or /en/... 인지 확인
  const urlLang = pathname.split('/')[1] ?? '';
  const hasLocalePrefix = isSupportedLang(urlLang);

  // ✅ i18nEnabled=false인 테넌트는 /en/... 같은 접근을 /ko/...로 강제
  if (!i18nEnabled && hasLocalePrefix && urlLang !== DEFAULT_LANG) {
    const newUrl = new URL(forceLocaleToDefault(pathname) + url.search, req.url);
    const res = NextResponse.redirect(newUrl);

    res.cookies.set(LANG_COOKIE, DEFAULT_LANG, {
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 365, // 1년
    });

    return res;
  }

  // 2) locale 없는 경우 -> 쿠키(or ref/accept-language)로 리다이렉트
  const pathnameIsMissingLocale = SUPPORTED_LANGS.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const locale = i18nEnabled ? getPreferredLocale(req) : DEFAULT_LANG;
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
  const lang = !i18nEnabled ? DEFAULT_LANG : hasLocalePrefix ? urlLang : DEFAULT_LANG;

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
