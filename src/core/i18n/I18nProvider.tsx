// src/core/i18n/I18nProvider.tsx
'use client';

import { useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';

import type { I18nResourceStore } from './types';
import { createClientI18n } from './createClientI18n';

type Props = {
  lang: string;
  resources: I18nResourceStore;
  cacheKey: string;
  children: React.ReactNode;
};

export default function I18nProvider({ lang, resources, cacheKey, children }: Props) {
  const i18n = useMemo(() => createClientI18n(lang, resources), [cacheKey, lang, resources]);
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
