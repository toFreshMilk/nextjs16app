// src/core/contexts/AppConfigContext.tsx
'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { TenantConfig } from '@/core/config/tenant.types';

// === App Config Types ===
export type TenantConfigData = Pick<TenantConfig, 'id' | 'name' | 'features' | 'theme'>;

export interface AppConfigContextValue {
  config: TenantConfigData;
}

const AppConfigContext = createContext<AppConfigContextValue | null>(null);

export function AppConfigProvider({ tenantConfig, children }: { tenantConfig: TenantConfigData; children: ReactNode }) {
  return (
    <AppConfigContext.Provider value={{ config: tenantConfig }}>
      {/* E2E 테스트에서 고객사 설정(특히 다국어 지원 여부)을 직접 확인할 수 있도록 노출 */}
      <div 
        id="app-config-debug" 
        data-tenant-id={tenantConfig.id}
        data-feature-i18n={String(tenantConfig.features.i18n)}
        style={{ display: 'none' }}
        aria-hidden="true"
      />
      {children}
    </AppConfigContext.Provider>
  );
}

export function useAppConfig() {
  const ctx = useContext(AppConfigContext);
  if (!ctx) throw new Error('useAppConfig Error: AppConfigProvider가 상위에 존재하지 않습니다.');
  return ctx;
}
