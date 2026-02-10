// src/core/i18n/settings.ts
export const SUPPORTED_LANGS = ['ko', 'en'] as const;
export type AppLang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: AppLang = 'ko';
export const DEFAULT_NS = 'common' as const;

export type Namespace = 'common' | 'contract';

export function isSupportedLang(v: string): v is AppLang {
  return (SUPPORTED_LANGS as readonly string[]).includes(v);
}
