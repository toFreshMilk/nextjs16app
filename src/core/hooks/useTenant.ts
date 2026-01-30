// src/core/hooks/useTenant.ts
import { useAppConfig } from '@/core/contexts/AppConfigContext';

//이건 삭제해도 되겠는데
export function useTenant() {
  const { config } = useAppConfig();
  return {
    tenantId: config.id,
    tenantName: config.name,
    features: config.features,
    theme: config.theme,
  };
}
