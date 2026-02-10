// src/app/[lang]/(main)/contract/layout.tsx
import type { ReactNode } from 'react';

import { getTenantId } from '@/core/config/tenant.config';
import { getI18nResources } from '@/core/i18n/server';
import I18nProvider from '@/core/i18n/I18nProvider';

export default async function ContractLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const tenant = await getTenantId();
  const lang = (await params).lang;

  // ✅ /contract subtree에서만 common + contract를 함께 제공
  //    (SSR 시점부터 contract 번역이 존재 -> hydration mismatch 제거)
  const resources = await getI18nResources(lang, tenant, ['common', 'contract']);
  const cacheKey = `${tenant}__${lang}__common_contract`;

  return (
    <I18nProvider lang={lang} resources={resources} cacheKey={cacheKey}>
      {children}
    </I18nProvider>
  );
}
