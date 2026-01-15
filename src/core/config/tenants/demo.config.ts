import { TenantConfig } from '../tenant.config';

const config: TenantConfig = {
  id: 'demo',
  name: 'Buptle Demo',
  features: { i18n: true, ai: true },
  theme: { primaryColor: '#8b5cf6' },
  
  // Demo는 모든 페이지를 오버라이드하여 "체험판" 느낌을 냄
  components: {
    LoginPage: () => import('@/tenants/demo/login/DemoLoginPage'),
    DashboardPage: () => import('@/tenants/demo/dashboard/DemoDashboardPage'),
    ContractPage: () => import('@/tenants/demo/contract/DemoContractPage'),
  },
  
  // Demo는 데이터도 가짜 데이터를 보여주기 위해 서비스도 오버라이드
  services: {
    DashboardService: () => import('@/tenants/demo/dashboard/services/dashboard.service'),
  }
};
export default config;

