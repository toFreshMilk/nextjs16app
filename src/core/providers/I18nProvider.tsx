// src/core/providers/I18nProvider.tsx
'use client';

import React, { useContext, useEffect, useState } from 'react';
import { I18nextProvider, I18nContext } from 'react-i18next';

import type { I18nResourceStore } from '@/core/i18n/types';
import { createClientI18n } from '@/core/i18n/createClientI18n';

type Props = {
  lang: string;
  resources: I18nResourceStore;
  children: React.ReactNode;
};

// ✅ i18n 인스턴스에 번들 주입 캐시를 붙이기 위한 심볼 키
const BUNDLE_CACHE_SYMBOL = Symbol.for('buptlebiz.i18n.bundleCache');

function getBundleCache(i18n: any) {
  const existing = i18n[BUNDLE_CACHE_SYMBOL] as Map<string, unknown> | undefined;
  if (existing) return existing;

  const created = new Map<string, unknown>();
  i18n[BUNDLE_CACHE_SYMBOL] = created;
  return created;
}

export default function I18nProvider({ lang, resources, children }: Props) {
  // ✅ 부모 Provider가 있으면 그 i18n을 재사용 (중첩 Provider라도 같은 i18n 인스턴스 사용 가능)
  const parent = useContext(I18nContext);
  const parentI18n = parent?.i18n;

  // ✅ 핵심: 부모 i18n이 있으면 새 인스턴스 생성 자체를 하지 않음
  const [i18n] = useState(() => (parentI18n ? parentI18n : createClientI18n(lang, resources)));

  useEffect(() => {
    // lang이 다르면 맞춰줌 (보통 [lang] 세그먼트 이동 시 리마운트되지만, 안전장치)
    if (i18n.language !== lang) {
      void i18n.changeLanguage(lang);
    }

    // ✅ resources를 i18n에 병합
    const store = resources ?? {};
    const bundleCache = getBundleCache(i18n);

    for (const lng of Object.keys(store)) {
      const namespaces = store[lng] ?? {};
      for (const ns of Object.keys(namespaces)) {
        const bundle = namespaces[ns];
        if (!bundle) continue;

        const key = `${lng}:${ns}`;

        // ✅ 같은 lng:ns라도 bundle 객체가 바뀌면 다시 주입(갱신/핫리로드/테넌트 전환 대비)
        if (bundleCache.get(key) === bundle) continue;

        // deep=true, overwrite=true (원하면 overwrite=false로 바꿔도 됨)
        i18n.addResourceBundle(lng, ns, bundle, true, true);
        bundleCache.set(key, bundle);
      }
    }
  }, [i18n, lang, resources]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
