import { TenantConfig } from '../tenant.config';

const config: TenantConfig = {
  id: 'apr',
  name: 'APR Corp',
  features: { i18n: true, ai: false }, // AI 미사용
  theme: { primaryColor: '#e11d48' },
  
  pages: {
    // APR은 대시보드만 바꿈 (나머진 Standard 사용)
    DashboardPage: () => import('@/tenants/apr/dashboard/AprDashboardPage'),
  },
  
  // APR은 계약 서비스 로직만 바꿈 (나머진 Standard 사용)
  services: {
    ContractService: () => import('@/tenants/apr/contract/services/contract.service'),
  }
};
export default config;

