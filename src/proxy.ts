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
import { detectTenantFromHostname } from '@/core/utils/host.util';
import { forceLocaleToDefault, getUrlLang, isBypassPath } from '@/core/utils/url.util';

const VALID_ROOT_DOMAINS = ['buptle.com', 'buptlestg.com', 'localhost.com', 'localhost'];

// ✅ locale 단일 소스화
const LOCALES = SUPPORTED_LANGS;
const DEFAULT_LOCALE = DEFAULT_LANG;

const LANG_COOKIE = 'lang'; // 원하는 이름으로 변경 가능

// ✅ referer locale 추출도 단일 소스화 (ko|en 하드코딩 제거)
const REF_LOCALE_RE = new RegExp(`/(${LOCALES.join('|')})(/|$)`);
const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function rewriteNotFound(req: NextRequest) {
  const errorUrl = req.nextUrl.clone();
  errorUrl.pathname = '/not-found';
  return NextResponse.rewrite(errorUrl);
}

function setLangCookie(res: NextResponse, lang: string) {
  res.cookies.set(LANG_COOKIE, lang, {
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: LANG_COOKIE_MAX_AGE,
  });
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

export async function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';
  const pathname = url.pathname;

  // Pass static/API
  if (isBypassPath(pathname)) {
    return NextResponse.next();
  }

  // 1) tenant
  const tenant = detectTenantFromHostname<TenantId>(hostname, VALID_ROOT_DOMAINS, isTenantId);
  if (!tenant) {
    return rewriteNotFound(req);
  }

  // 현재 URL이 /ko/... or /en/... 인지 확인
  const urlLang = getUrlLang(pathname, isSupportedLang);
  const hasLocalePrefix = urlLang !== null;

  // 2) locale 없는 경우 -> 쿠키(or ref/accept-language)로 리다이렉트
  const pathnameIsMissingLocale = !hasLocalePrefix;

  // ✅ 설정 로드가 "정말 필요한 케이스"만 로드한다.
  // - /ko/... 는 i18n on/off와 무관하게 허용(정책 불필요)
  // - missing locale이면 "어떤 locale을 붙일지" 결정해야 함(정책 필요)
  // - /en/... 같은 접근이면 "i18n off 테넌트면 /ko로 강제" 해야 함(정책 필요)
  const needsTenantPolicy = pathnameIsMissingLocale || (hasLocalePrefix && urlLang !== DEFAULT_LOCALE);

  let i18nEnabled = true;
  if (needsTenantPolicy) {
    try {
      const tenantConfig = await loadTenantConfig(tenant);
      i18nEnabled = tenantConfig.features?.i18n !== false;
    } catch (e) {
      console.error(`[Proxy Error] Tenant config load failed: ${tenant}`, e);
      return rewriteNotFound(req);
    }
  }

  // ✅ i18nEnabled=false인 테넌트는 /en/... 같은 접근을 /ko/...로 강제
  if (!i18nEnabled && hasLocalePrefix && urlLang !== DEFAULT_LOCALE) {
    const redirectedPath = forceLocaleToDefault(pathname, DEFAULT_LOCALE, isSupportedLang);
    const newUrl = new URL(`${redirectedPath}${url.search}`, req.url);
    const res = NextResponse.redirect(newUrl);
    setLangCookie(res, DEFAULT_LOCALE);
    return res;
  }

  if (pathnameIsMissingLocale) {
    // ✅ i18n off인 경우: locale 협상/추론 자체를 하지 않고 기본 언어만 사용 (리소스/연산 최소화)
    const locale = i18nEnabled ? getPreferredLocale(req) : DEFAULT_LOCALE;
    const newUrl = new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, req.url);

    const res = NextResponse.redirect(newUrl);
    setLangCookie(res, locale);
    return res;
  }

  // 3) locale이 있는 정상 경로 -> 헤더 심고 + 쿠키 갱신
  // - 정책이 필요 없던 케이스(/ko/...)는 urlLang을 그대로 신뢰
  // - 정책이 필요했던 케이스는 i18nEnabled 기준으로 정규화된 값을 사용
  const lang = i18nEnabled && urlLang ? urlLang : DEFAULT_LOCALE;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-tenant-id', tenant);
  requestHeaders.set('x-lang', lang);

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // 사용자가 /en/... 또는 /ko/... 로 "명시적으로" 바꿨으면 그 선택을 저장
  if (hasLocalePrefix) {
    setLangCookie(res, lang);
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
