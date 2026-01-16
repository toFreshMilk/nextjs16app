// src/core/contexts/AppConfigContext.tsx
'use client';
import { createContext, useContext, ReactNode } from 'react';
import type { AppConfigContextValue, TenantConfigData } from '@/core/types/app-config.types';

const AppConfigContext = createContext<AppConfigContextValue | null>(null);

export function AppConfigProvider({ tenantConfig, children }: { tenantConfig: TenantConfigData; children: ReactNode }) {
  return (
    <AppConfigContext.Provider value={{ config: tenantConfig }}>
      {children}
    </AppConfigContext.Provider>
  );
}

export function useAppConfig() {
  const ctx = useContext(AppConfigContext);
  if (!ctx) throw new Error('useAppConfig Error');
  return ctx;
}
