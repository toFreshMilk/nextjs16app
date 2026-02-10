// src/app/[lang]/(main)/contract/layout.tsx
import type { ReactNode } from 'react';

import { getTenantId } from '@/core/config/tenant.config';
import { getI18nResources } from '@/core/i18n/server';
import I18nProvider from '@/core/providers/I18nProvider';

export default async function ContractLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const tenant = await getTenantId();
  const lang = (await params).lang;

  // ✅ /contract subtree에서만 common + contract 제공
  const resources = await getI18nResources(lang, tenant, ['contract'], {
    contract: 'contract',
  });

  return (
    <I18nProvider lang={lang} resources={resources}>
      {children}
    </I18nProvider>
  );
}
