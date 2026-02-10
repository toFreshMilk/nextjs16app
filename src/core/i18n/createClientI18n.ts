// src/core/i18n/createClientI18n.ts
'use client';

import { createInstance, type i18n as I18nInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import KoreanPostpositionProcessor from 'i18next-korean-postposition-processor';

import { ALL_NAMESPACES, DEFAULT_LANG, DEFAULT_NS, SUPPORTED_LANGS } from './settings';
import type { I18nResourceStore } from './types';

export function createClientI18n(lang: string, resources: I18nResourceStore): I18nInstance {
  const i18n = createInstance();

  void i18n
    .use(initReactI18next)
    .use(KoreanPostpositionProcessor as any)
    .init({
      lng: lang,
      fallbackLng: DEFAULT_LANG,
      supportedLngs: SUPPORTED_LANGS as unknown as string[],

      // ✅ 변경: 전체 namespace를 등록해두고, 실제 리소스는 필요한 라우트에서만 주입
      ns: ALL_NAMESPACES as unknown as string[],
      defaultNS: DEFAULT_NS,
      resources,
      interpolation: { escapeValue: false },
      react: {
        useSuspense: false,
        bindI18n: 'languageChanged loaded',
        bindI18nStore: 'added removed',
      },
    });

  return i18n;
}
