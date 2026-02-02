// src/core/contexts/QueryProvider.tsx
'use client';
import { createContext, useContext, ReactNode } from 'react';
import type { TenantConfig } from '@/core/config/tenant.types';

// === App Config Types ===
export type TenantConfigData = Pick<TenantConfig, 'id' | 'name' | 'features' | 'theme'>;

export interface AppConfigContextValue {
  config: TenantConfigData;
}

const AppConfigContext = createContext<AppConfigContextValue | null>(null);

export function AppConfigProvider({ tenantConfig, children }: { tenantConfig: TenantConfigData; children: ReactNode }) {
  return <AppConfigContext.Provider value={{ config: tenantConfig }}>{children}</AppConfigContext.Provider>;
}

export function useAppConfig() {
  const ctx = useContext(AppConfigContext);
  if (!ctx) throw new Error('useAppConfig Error');
  return ctx;
}
