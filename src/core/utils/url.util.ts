// src/core/utils/url.util.ts
export function isBypassPath(pathname: string) {
  return (
    pathname.includes('.') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico')
  );
}

export function getUrlLang<TLang extends string>(pathname: string, isLang: (v: string) => v is TLang): TLang | null {
  const lang = pathname.split('/')[1] ?? '';
  return isLang(lang) ? lang : null;
}

export function forceLocaleToDefault(pathname: string, defaultLocale: string, isLang: (v: string) => boolean) {
  const parts = pathname.split('/');
  if (parts.length >= 2 && isLang(parts[1])) {
    parts[1] = defaultLocale;
    return parts.join('/');
  }
  return `/${defaultLocale}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
}
