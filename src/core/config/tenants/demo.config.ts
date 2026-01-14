import { TenantConfig } from '../tenant.config';

const config: TenantConfig = {
  id: 'demo',
  name: 'Demo Workspace',
  features: { i18n: true, ai: true }, // 데모는 모든 기능 활성화
  theme: { primaryColor: '#8b5cf6' }, // Violet
};

export default config;

