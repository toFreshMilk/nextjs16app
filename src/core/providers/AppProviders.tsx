// src/core/providers/AppProviders.tsx
'use client';

import type { ReactNode } from 'react';

import QueryProvider from '@/core/providers/QueryProvider';
import { AppConfigProvider, type TenantConfigData } from '@/core/contexts/AppConfigContext';
import I18nProvider from '@/core/providers/I18nProvider';
import type { I18nResourceStore } from '@/core/i18n/types';

export function AppProviders({
  tenantConfig,
  lang,
  resources,
  children,
}: {
  tenantConfig: TenantConfigData;
  lang: string;
  resources: I18nResourceStore;
  cacheKey: string;
  children: ReactNode;
}) {
  return (
    <QueryProvider>
      <AppConfigProvider tenantConfig={tenantConfig}>
        <I18nProvider lang={lang} resources={resources}>
          {children}
        </I18nProvider>
      </AppConfigProvider>
    </QueryProvider>
  );
}
