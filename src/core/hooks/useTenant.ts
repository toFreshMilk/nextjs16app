import { useAppConfig } from '@/core/contexts/AppConfigContext';

export function useTenant() {
  const { config } = useAppConfig();
  return {
    tenantId: config.id,
    tenantName: config.name,
    features: config.features,
    theme: config.theme,
  };
}
