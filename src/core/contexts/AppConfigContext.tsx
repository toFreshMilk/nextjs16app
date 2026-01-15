'use client';
import { createContext, useContext, ReactNode } from 'react';

const AppConfigContext = createContext<any>(null);

export function AppConfigProvider({ tenantConfig, children }: { tenantConfig: any, children: ReactNode }) {
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
