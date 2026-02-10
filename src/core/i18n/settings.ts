// src/core/i18n/settings.ts
export const SUPPORTED_LANGS = ['ko', 'en'] as const;
export type AppLang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: AppLang = 'ko';
export const DEFAULT_NS = 'common' as const;

export type Namespace = 'common' | 'contract';

// ✅ 추가: 앱 전체에서 사용 가능한 네임스페이스 목록 (payload와 무관)
export const ALL_NAMESPACES = ['common', 'contract'] as const;

export function isSupportedLang(v: string): v is AppLang {
  return (SUPPORTED_LANGS as readonly string[]).includes(v);
}
