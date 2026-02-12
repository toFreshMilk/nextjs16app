// src/core/hooks/useCoreTranslation.ts
'use client';

import { useEffect } from 'react';
import { useTranslation, type UseTranslationOptions } from 'react-i18next';

type Overrides = Record<string, any>;

// ✅ override 주입 캐시: i18n 인스턴스에 붙여서 중첩 Provider/리마운트에도 일관성 유지
const OVERRIDE_CACHE_SYMBOL = Symbol.for('buptlebiz.i18n.overrideCache');

// ✅ overrides -> signature 캐시(동일 객체면 stringify 비용 제거)
const overrideSignatureByIdentity = new WeakMap<Overrides, string>();

function getActiveLang(i18n: any) {
  return i18n?.resolvedLanguage || i18n?.language || 'ko';
}

function getOverrideCache(i18n: any) {
  const existing = i18n[OVERRIDE_CACHE_SYMBOL] as Set<string> | undefined;
  if (existing) return existing;

  const created = new Set<string>();
  i18n[OVERRIDE_CACHE_SYMBOL] = created;
  return created;
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
    return String(value);
  }
}

function getOverridesSignature(overrides: Overrides) {
  const cached = overrideSignatureByIdentity.get(overrides);
  if (cached) return cached;

  const sig = stableStringify(overrides);
  overrideSignatureByIdentity.set(overrides, sig);
  return sig;
}

/**
 * Core 다국어 훅 (동적 주입 지원)
 * @param ns - 사용할 네임스페이스 (예: 'contract')
 * @param overrides - (선택) 커스텀 모듈에서 덮어쓸 JSON 데이터 (정적 데이터 권장)
 * @param options
 */
export function useCoreTranslation(ns: string, overrides?: Overrides, options?: UseTranslationOptions<any>) {
  const { t, i18n, ready } = useTranslation(ns, { ...options, useSuspense: false });

  useEffect(() => {
    if (!overrides) return;

    let cancelled = false;

    const run = async () => {
      const lang = getActiveLang(i18n);
      const cache = getOverrideCache(i18n);

      // ✅ 데이터는 정적이므로 "내용 기반"으로 1회만 주입하면 됨
      const signature = getOverridesSignature(overrides);
      const cacheKey = `${lang}__${ns}__${signature}`;

      if (cache.has(cacheKey)) return;

      // ✅ base(ns)가 아직 없을 수도 있으니 필요 시만 load
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

        cache.add(cacheKey);
      }
    };

    void run();

    const onLanguageChanged = () => {
      void run();
    };

    i18n.on('languageChanged', onLanguageChanged);

    return () => {
      cancelled = true;
      i18n.off('languageChanged', onLanguageChanged);
    };
  }, [i18n, ns, overrides]);

  return { t, ready, i18n };
}
