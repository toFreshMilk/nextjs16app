// src/core/i18n/createClientI18n.ts
'use client';

import { createInstance, type i18n as I18nInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import KoreanPostpositionProcessor from 'i18next-korean-postposition-processor';

import { DEFAULT_NS } from '@/core/config/tenant.config';
import type { I18nResourceStore } from './types';

export function createClientI18n(lang: string, resources: I18nResourceStore): I18nInstance {
  const i18n = createInstance();

  // ✅ 변경: 서버에서 "요청 lang 1개"만 내려주므로, 클라이언트에서도 그 범위만 등록
  const namespaces = Array.from(new Set([DEFAULT_NS, ...Object.keys(resources?.[lang] ?? {})]));

  void i18n
    .use(initReactI18next)
    .use(KoreanPostpositionProcessor as any)
    .init({
      lng: lang,

      // ✅ 변경: payload 줄이려면 fallback도 서버에서 내려주는 언어로만 두는 게 일관됨
      //    (ko/en 둘 다 내려주지 않으므로, fallback을 DEFAULT_LANG(ko)로 두면 미번역 키가 그대로 노출될 수 있음)
      fallbackLng: lang,

      // ✅ 서버가 내려준 언어 1개만 지원(경로 전환으로만 언어 변경)
      supportedLngs: [lang],

      ns: namespaces as unknown as string[],
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
