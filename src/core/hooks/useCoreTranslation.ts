// src/core/hooks/useCoreTranslation.ts
'use client';

import { useEffect } from 'react';
import { useTranslation, type UseTranslationOptions } from 'react-i18next';

type Overrides = Record<string, any>;

// ✅ 동일 overrides 객체에 대해 (lang|ns) 조합은 1회만 주입 (부하 최소화)
const injectedCache = new WeakMap<Overrides, Set<string>>();

function getActiveLang(i18n: any) {
  return i18n?.resolvedLanguage || i18n?.language || 'ko';
}

function isInjected(overrides: Overrides, lang: string, ns: string) {
  return injectedCache.get(overrides)?.has(`${lang}__${ns}`) ?? false;
}

function markInjected(overrides: Overrides, lang: string, ns: string) {
  const key = `${lang}__${ns}`;
  const set = injectedCache.get(overrides) ?? new Set<string>();
  set.add(key);
  injectedCache.set(overrides, set);
}

/**
 * Core 다국어 훅 (동적 주입 지원)
 * @param ns - 사용할 네임스페이스 (예: 'contract')
 * @param overrides - (선택) 커스텀 모듈에서 덮어쓸 JSON 데이터
 * @param options
 */
export function useCoreTranslation(ns: string, overrides?: Overrides, options?: UseTranslationOptions<any>) {
  const { t, i18n, ready } = useTranslation(ns, { ...options, useSuspense: false });

  useEffect(() => {
    if (!overrides) return;

    const inject = () => {
      const lang = getActiveLang(i18n);

      // ✅ 동일 overrides + 동일 (lang,ns)는 최초 1회만 실행
      if (isInjected(overrides, lang, ns)) return;

      i18n.addResourceBundle(
        lang,
        ns,
        overrides,
        true, // deep merge
        true, // overwrite
      );

      markInjected(overrides, lang, ns);
    };

    // ✅ base(ns) 준비 이후 마지막으로 override 주입
    const run = async () => {
      try {
        await i18n.loadNamespaces(ns);
      } finally {
        inject();
      }
    };

    void run();

    const onLanguageChanged = () => {
      void run();
    };

    i18n.on('languageChanged', onLanguageChanged);

    return () => {
      i18n.off('languageChanged', onLanguageChanged);
    };
  }, [i18n, ns, overrides]);

  return { t, ready, i18n };
}
