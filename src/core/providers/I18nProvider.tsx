// src/core/providers/I18nProvider.tsx
'use client';

import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { I18nextProvider, I18nContext } from 'react-i18next';

import type { I18nResourceStore } from '@/core/i18n/types';
import { createClientI18n } from '@/core/i18n/createClientI18n';

type Props = {
  lang: string;
  resources: I18nResourceStore;
  children: React.ReactNode;
};

export default function I18nProvider({ lang, resources, children }: Props) {
  // ✅ 부모 Provider가 있으면 그 i18n을 재사용 (중첩 Provider라도 같은 i18n 인스턴스 사용 가능)
  const parent = useContext(I18nContext);
  const parentI18n = parent?.i18n;

  // ✅ 루트(부모가 없을 때)만 i18n 인스턴스 생성
  const [ownI18n] = useState(() => createClientI18n(lang, resources));
  const i18n = parentI18n ?? ownI18n;

  // (선택) 같은 번들을 반복 add 하는 걸 줄이기 위한 가드
  const addedRef = useRef(new Set<string>());

  useEffect(() => {
    // lang이 다르면 맞춰줌 (보통 [lang] 세그먼트 이동 시 리마운트되지만, 안전장치)
    if (i18n.language !== lang) {
      void i18n.changeLanguage(lang);
    }

    // ✅ resources를 i18n에 병합
    const store = resources ?? {};
    for (const lng of Object.keys(store)) {
      const namespaces = store[lng] ?? {};
      for (const ns of Object.keys(namespaces)) {
        const bundle = namespaces[ns];
        if (!bundle) continue;

        const key = `${lng}:${ns}`;
        if (addedRef.current.has(key)) continue;

        // deep=true, overwrite=true (원하면 overwrite=false로 바꿔도 됨)
        i18n.addResourceBundle(lng, ns, bundle, true, true);
        addedRef.current.add(key);
      }
    }
  }, [i18n, lang, resources]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
