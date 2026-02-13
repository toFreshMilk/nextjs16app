// src/app/[lang]/(main)/contract/layout.tsx
import type { ReactNode } from 'react';

import { headers } from 'next/headers';
import { getTenantId } from '@/core/config/tenant.config';
import { DEFAULT_LANG } from '@/core/config/tenant.config';
import { getI18nResources } from '@/core/i18n/server';
import I18nProvider from '@/core/providers/I18nProvider';
import { pickI18nOwnerMap } from '@/standard/registry';

export default async function ContractLayout({
  children,
}: {
  children: ReactNode;
}) {
  const tenant = await getTenantId();

  const headersList = await headers();
  const lang = headersList.get('x-lang') || DEFAULT_LANG;

  const resources = await getI18nResources(lang, tenant, ['contract'], pickI18nOwnerMap(['contract']));

  return (
    <I18nProvider lang={lang} resources={resources}>
      {children}
    </I18nProvider>
  );
}
