// src/core/providers/I18nProvider.tsx
'use client';

import React, { useState } from 'react';
import { I18nextProvider } from 'react-i18next';

import type { I18nResourceStore } from '@/core/i18n/types';
import { createClientI18n } from '@/core/i18n/createClientI18n';

type Props = {
  lang: string;
  resources: I18nResourceStore;
  children: React.ReactNode;
};

export default function I18nProvider({ lang, resources, children }: Props) {
  // ✅ RSC 환경에서 props(resources)는 매번 새 객체로 올 수 있으니
  //    "인스턴스는 mount 단위로 1회 생성"이 가장 안전합니다.
  const [i18n] = useState(() => createClientI18n(lang, resources));
  // 캐시키는 provider 생명주기 내에서 리마운트 없이 네임스페이스 조합이 바뀔때 도입.

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
