// src/core/hooks/useCoreTranslation.ts
'use client';

import { useEffect } from 'react';
import { useTranslation, type UseTranslationOptions } from 'react-i18next';

type Overrides = Record<string, any>;

// ✅ 1) 동일 overrides "객체 참조" 기준 캐시
const injectedByIdentity = new WeakMap<Overrides, Set<string>>();

// ✅ 2) overrides가 렌더마다 새 객체여도 동일 내용이면 1회만 주입되도록 "내용(signature)" 캐시
const injectedBySignature = new Map<string, true>();

function getActiveLang(i18n: any) {
  return i18n?.resolvedLanguage || i18n?.language || 'ko';
}

function stableStringify(value: any) {
  const seen = new WeakSet<object>();

  const walk = (v: any): any => {
    if (v === null || typeof v !== 'object') return v;

    if (seen.has(v)) return '[Circular]';
    seen.add(v);

    if (Array.isArray(v)) return v.map(walk);

    const out: Record<string, any> = {};
    for (const k of Object.keys(v).sort()) {
      out[k] = walk(v[k]);
    }
    return out;
  };

  try {
    return JSON.stringify(walk(value));
  } catch {
    // 번역 overrides는 보통 plain object라 여기로 올 일은 거의 없지만, 방어적으로 처리
    return String(value);
  }
}

function isInjectedIdentity(overrides: Overrides, lang: string, ns: string) {
  return injectedByIdentity.get(overrides)?.has(`${lang}__${ns}`) ?? false;
}

function markInjectedIdentity(overrides: Overrides, lang: string, ns: string) {
  const key = `${lang}__${ns}`;
  const set = injectedByIdentity.get(overrides) ?? new Set<string>();
  set.add(key);
  injectedByIdentity.set(overrides, set);
}

function isInjectedSignature(signatureKey: string) {
  return injectedBySignature.has(signatureKey);
}

function markInjectedSignature(signatureKey: string) {
  injectedBySignature.set(signatureKey, true);
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

    let cancelled = false;

    const inject = async () => {
      const lang = getActiveLang(i18n);

      // ✅ signature 기반 캐시 (객체 참조가 바뀌어도 동일 내용이면 1회)
      const signature = stableStringify(overrides);
      const signatureKey = `${lang}__${ns}__${signature}`;

      // ✅ 동일 overrides 객체 + 동일 (lang,ns)는 최초 1회만 실행
      if (isInjectedIdentity(overrides, lang, ns)) return;

      // ✅ 동일 내용(signature) + 동일 (lang,ns)도 최초 1회만 실행
      if (isInjectedSignature(signatureKey)) {
        markInjectedIdentity(overrides, lang, ns); // 객체 캐시도 같이 마킹 (불필요 연산 감소)
        return;
      }

      // ✅ base(ns)가 아직 없을 수도 있으니, 가능하면 존재 확인 후 필요 시만 load
      // (현재 구조상 I18nProvider가 먼저 addResourceBundle을 해주므로 대체로 즉시 true일 가능성이 큼)
      try {
        if (typeof i18n.hasResourceBundle === 'function') {
          if (!i18n.hasResourceBundle(lang, ns)) {
            await i18n.loadNamespaces(ns);
          }
        } else {
          await i18n.loadNamespaces(ns);
        }
      } finally {
        if (cancelled) return;

        i18n.addResourceBundle(
          lang,
          ns,
          overrides,
          true, // deep merge
          true, // overwrite
        );

        markInjectedIdentity(overrides, lang, ns);
        markInjectedSignature(signatureKey);
      }
    };

    void inject();

    const onLanguageChanged = () => {
      void inject();
    };

    i18n.on('languageChanged', onLanguageChanged);

    return () => {
      cancelled = true;
      i18n.off('languageChanged', onLanguageChanged);
    };
  }, [i18n, ns, overrides]);

  return { t, ready, i18n };
}
